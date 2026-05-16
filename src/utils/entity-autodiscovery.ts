import { SENSOR_PRESETS, SENSOR_PRESETS_BY_KEY, BROAD_ALIASES, CONTEXT_WORDS, SensorPreset } from '../sensor-presets';

export interface AutoDiscoveryResult {
  key: string;
  entityId: string;
  confidence: number;
  reason: string;
}

export interface AutoDiscoveryMapResult {
  device_tracker?: string;
  speed_entity?: string;
  course_entity?: string;
  updated_entity?: string;
}

interface HassEntity {
  entity_id?: string;
  attributes?: Record<string, unknown>;
}

interface ScoredEntry {
  entityId: string;
  preset: SensorPreset;
  score: number;
  reasons: string[];
}

function isBroadAlias(alias: string): boolean {
  return BROAD_ALIASES.has(alias);
}

function hasContextInEntityId(entityId: string): boolean {
  const lower = entityId.toLowerCase();
  return CONTEXT_WORDS.some((ctx) => lower.includes(ctx));
}

function aliasMatchesEntityExactly(alias: string, entityId: string): boolean {
  const parts = entityId.toLowerCase().split('.');
  if (parts.length < 2) return false;
  const entityPart = parts.slice(1).join('.');
  return entityPart === alias;
}

function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-яё0-9_ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '';
  return String(v);
}

export function autoDetectEntities(
  states: Record<string, HassEntity> | undefined
): AutoDiscoveryResult[] {
  if (!states) return [];

  const entries: ScoredEntry[] = [];

  for (const [entityId, stateObj] of Object.entries(states)) {
    const domain = entityId.split('.')[0].toLowerCase();

    if (domain === 'button') continue;

    const attributes = stateObj?.attributes || {};
    const friendlyName = formatValue(attributes.friendly_name);
    const deviceClass = formatValue(attributes.device_class);
    const unitOfMeasurement = formatValue(attributes.unit_of_measurement);
    const icon = formatValue(attributes.icon);

    const searchText = normalizeSearchText(
      `${entityId} ${friendlyName} ${deviceClass} ${unitOfMeasurement} ${icon}`
    );
    const entityIdLower = entityId.toLowerCase();
    const entityPart = entityIdLower.split('.').slice(1).join('.');
    const friendlyNameLower = friendlyName.toLowerCase();

    for (const preset of SENSOR_PRESETS) {
      if (!preset.domains.includes(domain)) continue;

      let score = 0;
      const reasons: string[] = [];

      for (const alias of preset.aliases) {
        const aliasLower = alias.toLowerCase();
        let aliasScore = 0;
        let aliasReason = '';

        if (isBroadAlias(aliasLower)) {
          if (!hasContextInEntityId(entityIdLower) && !aliasMatchesEntityExactly(aliasLower, entityIdLower)) {
            continue;
          }
        }

        if (entityIdLower === aliasLower) {
          aliasScore = 200;
          aliasReason = `exact entity_id match: ${alias}`;
        } else if (entityIdLower.includes(aliasLower) && aliasLower.length >= 3) {
          aliasScore = 120;
          aliasReason = `entity_id contains: ${alias}`;
        } else if (friendlyNameLower.includes(aliasLower) && aliasLower.length >= 3) {
          aliasScore = 80;
          aliasReason = `friendly_name contains: ${alias}`;
        } else if (searchText.includes(aliasLower) && aliasLower.length >= 3) {
          aliasScore = 60;
          aliasReason = `search text contains: ${alias}`;
        }

        if (aliasScore > 0) {
          score += aliasScore;
          if (!reasons.includes(aliasReason)) {
            reasons.push(aliasReason);
          }
        }
      }

      if (preset.key.includes('tire_pressure') || preset.key.includes('pressure')) {
        if (unitOfMeasurement === 'bar' || unitOfMeasurement === 'kpa' || unitOfMeasurement === 'psi') {
          score += 30;
          reasons.push(`unit match: ${unitOfMeasurement}`);
        }
        if (deviceClass === 'pressure') {
          score += 30;
          reasons.push('device_class: pressure');
        }
      }

      if (preset.key.includes('temp')) {
        if (unitOfMeasurement === '°c' || unitOfMeasurement === 'celsius') {
          score += 30;
          reasons.push(`unit match: ${unitOfMeasurement}`);
        }
        if (deviceClass === 'temperature') {
          score += 30;
          reasons.push('device_class: temperature');
        }
      }

      if (preset.key === 'battery_voltage' || preset.key === 'battery') {
        if (unitOfMeasurement === 'v') {
          score += 30;
          reasons.push(`unit match: ${unitOfMeasurement}`);
        }
        if (deviceClass === 'battery' || deviceClass === 'voltage') {
          score += 30;
          reasons.push(`device_class: ${deviceClass}`);
        }
      }

      if (preset.key === 'mileage' || preset.key === 'range') {
        if (unitOfMeasurement === 'km') {
          score += 30;
          reasons.push(`unit match: ${unitOfMeasurement}`);
        }
      }

      if (preset.key === 'fuel' || preset.key === 'oil_qty') {
        if (unitOfMeasurement === 'l') {
          score += 20;
          reasons.push(`unit match: ${unitOfMeasurement}`);
        }
      }

      if (preset.key.startsWith('door_') || preset.key === 'hood' || preset.key === 'trunk') {
        if (deviceClass === 'opening' || deviceClass === 'door') {
          score += 30;
          reasons.push(`device_class: ${deviceClass}`);
        }
      }

      if (score > 0) {
        entries.push({ entityId, preset, score, reasons });
      }
    }
  }

  entries.sort((a, b) => b.score - a.score);

  const usedEntities = new Set<string>();
  const usedPresets = new Set<string>();
  const results: AutoDiscoveryResult[] = [];
  const MIN_CONFIDENCE = 60;

  for (const entry of entries) {
    if (usedEntities.has(entry.entityId)) continue;
    if (usedPresets.has(entry.preset.key)) continue;
    if (entry.score < MIN_CONFIDENCE) continue;

    usedEntities.add(entry.entityId);
    usedPresets.add(entry.preset.key);
    results.push({
      key: entry.preset.key,
      entityId: entry.entityId,
      confidence: entry.score,
      reason: entry.reasons.slice(0, 3).join('; '),
    });
  }

  return results;
}

export function autoDetectMapEntities(
  states: Record<string, HassEntity> | undefined
): AutoDiscoveryMapResult {
  const result: AutoDiscoveryMapResult = {};
  if (!states) return result;

  const trackerPriority = ['device_tracker.haval_h3', 'device_tracker.lavash_mestopolozhenie', 'device_tracker.gwm_ru_location', 'device_tracker.cesar_smart_vehicle'];

  for (const entityId of Object.keys(states)) {
    const domain = entityId.split('.')[0].toLowerCase();

    if (domain === 'device_tracker') {
      if (!result.device_tracker) {
        result.device_tracker = entityId;
      } else {
        const idx = trackerPriority.indexOf(entityId);
        const currentIdx = trackerPriority.indexOf(result.device_tracker);
        if (idx !== -1 && (currentIdx === -1 || idx < currentIdx)) {
          result.device_tracker = entityId;
        }
      }
    }

    if (domain === 'sensor') {
      const lower = entityId.toLowerCase();
      const attr = states[entityId]?.attributes || {};
      const friendlyName = formatValue(attr.friendly_name).toLowerCase();
      const searchText = normalizeSearchText(`${entityId} ${friendlyName} ${formatValue(attr.device_class)} ${formatValue(attr.unit_of_measurement)}`);

      if (!result.speed_entity) {
        if (lower.includes('location_speed') || lower.includes('speed') || lower.endsWith('_speed') || searchText.includes('speed') || searchText.includes('скорость')) {
          result.speed_entity = entityId;
        }
      }

      if (!result.course_entity) {
        if (lower.includes('location_course') || lower.includes('course') || searchText.includes('course') || searchText.includes('курс')) {
          result.course_entity = entityId;
        }
      }

      if (!result.updated_entity) {
        if (lower.includes('last_update') || lower.includes('last_updated') || lower.includes('updated') || searchText.includes('обновлено')) {
          result.updated_entity = entityId;
        }
      }
    }
  }

  return result;
}
