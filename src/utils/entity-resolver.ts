import { HassEntity } from 'home-assistant-js-websocket';
import { EntityConfig, ResolvedEntity, DisplayConfig, ColorRule } from '../types';

export function resolveEntity(
  hass: { states: Record<string, HassEntity> } | undefined,
  config: EntityConfig,
  display: DisplayConfig
): ResolvedEntity {
  const result: ResolvedEntity = {
    config,
    state: null,
    value: null,
    isUnavailable: true,
  };

  if (!config.entity || !config.enabled) {
    return result;
  }

  if (!hass || !hass.states) {
    return result;
  }

  const stateObj = hass.states[config.entity];
  if (!stateObj) {
    return result;
  }

  result.state = stateObj;

  const s = stateObj.state;
  const isUnavailable = s === 'unavailable' || s === 'unknown' || s === null || s === undefined;
  result.isUnavailable = isUnavailable;

  if (isUnavailable) {
    return result;
  }

  result.value = s;

  return result;
}

export function formatEntityValue(
  entity: ResolvedEntity,
  config: EntityConfig,
  display: DisplayConfig
): string {
  if (entity.isUnavailable) {
    return display.unavailable_text || '\u2014';
  }

  if (entity.value === null || entity.value === undefined) {
    return display.unavailable_text || '\u2014';
  }

  const val = entity.value;

  if (entity.state?.attributes?.device_class === 'temperature' || typeof val === 'number' || !isNaN(Number(val))) {
    const num = Number(val);
    if (config.precision !== undefined) {
      return num.toFixed(config.precision);
    }
    return String(num);
  }

  return String(val);
}

export function getEntityIcon(entity: ResolvedEntity, config: EntityConfig): string {
  if (config.icon) return config.icon;
  if (!entity.state) return 'mdi:help-circle';

  const stateObj = entity.state;
  const domain = config.entity?.split('.')[0];

  if (domain === 'binary_sensor') {
    const isOn = stateObj.state === 'on' || stateObj.state === 'open';
    switch (stateObj.attributes?.device_class) {
      case 'door':
        return isOn ? 'mdi:door-open' : 'mdi:door-closed';
      case 'opening':
        return isOn ? 'mdi:car-door' : 'mdi:car-door-lock';
      case 'power':
        return isOn ? 'mdi:power-on' : 'mdi:power-off';
      case 'connectivity':
        return isOn ? 'mdi:wifi' : 'mdi:wifi-off';
      default:
        return isOn ? 'mdi:check-circle' : 'mdi:close-circle';
    }
  }

  return stateObj.attributes?.icon || 'mdi:eye';
}

export function getEntityColor(
  entity: ResolvedEntity,
  config: EntityConfig,
  display: DisplayConfig
): string {
  if (entity.isUnavailable) return 'var(--state-unavailable-color, #a0a0a0)';

  if (display.status_color_rules && config.color_rules) {
    for (const rule of config.color_rules) {
      if (matchesRule(entity.value, rule)) {
        return rule.color;
      }
    }
  }

  if (!entity.state) return 'var(--primary-text-color, #000)';

  const stateObj = entity.state;
  const domain = config.entity?.split('.')[0];

  if (domain === 'binary_sensor') {
    const isAlert = stateObj.state === 'on' || stateObj.state === 'open';
    return isAlert
      ? 'var(--error-color, #f44336)'
      : 'var(--success-color, #4caf50)';
  }

  return 'var(--primary-text-color, #000)';
}

function matchesRule(value: string | number | null, rule: ColorRule): boolean {
  if (value === null) return false;

  const ruleState = typeof rule.state === 'number' ? rule.state : rule.state;
  const operator = rule.operator || 'eq';

  if (typeof ruleState === 'string' && typeof value === 'string') {
    switch (operator) {
      case 'eq': return value === ruleState;
      case 'neq': return value !== ruleState;
      default: return false;
    }
  }

  const valNum = Number(value);
  const ruleNum = Number(ruleState);

  if (isNaN(valNum) || isNaN(ruleNum)) return false;

  switch (operator) {
    case 'eq': return valNum === ruleNum;
    case 'neq': return valNum !== ruleNum;
    case 'gt': return valNum > ruleNum;
    case 'gte': return valNum >= ruleNum;
    case 'lt': return valNum < ruleNum;
    case 'lte': return valNum <= ruleNum;
    default: return false;
  }
}

export function showEntity(
  entity: ResolvedEntity,
  display: DisplayConfig
): boolean {
  if (!entity.config.enabled) return false;
  if (!entity.config.entity) return false;
  if (entity.isUnavailable && display.hide_unavailable) return false;
  return true;
}
