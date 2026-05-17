import { CardConfig, EntityConfig, LayoutConfig, MapConfig, DisplayConfig, DEFAULT_DISPLAY, ImageLayout, RenderArea } from '../types';
import { SENSOR_PRESETS_BY_KEY } from '../sensor-presets';
import { DEFAULT_VEHICLE_IMAGE } from '../generated/default-image';

const BOOLEAN_KEYS = ['enabled', 'show_icons', 'show_labels', 'show_units', 'hide_unavailable', 'hide_disabled', 'status_color_rules', 'show_entity_name_on_hover', 'edit_positions'];

const LEGACY_DEFAULT_IMAGE_PATHS = [
  '/local/haval_h3_white_sunroof.png',
  '/local/haval_h3_white_side.png',
];

function normalizeVehicleImage(rawImage?: string): string {
  const value = typeof rawImage === 'string' ? rawImage.trim() : '';
  if (!value) return DEFAULT_VEHICLE_IMAGE;
  if (LEGACY_DEFAULT_IMAGE_PATHS.includes(value)) return DEFAULT_VEHICLE_IMAGE;
  return value;
}

export function normalizeEntityAreas(config: CardConfig): CardConfig {
  const entities = config.entities;
  if (!entities) return config;

  const normalized: Record<string, EntityConfig> = {};
  for (const [key, ent] of Object.entries(entities)) {
    if (!ent) continue;
    const preset = SENSOR_PRESETS_BY_KEY.get(key);
    if (!preset) {
      normalized[key] = ent;
      continue;
    }
    const updated: EntityConfig = { ...ent };
    if (!updated.render_area) {
      updated.render_area = preset.render_area as RenderArea;
    } else if (preset.locked_render_area && updated.render_area !== preset.render_area) {
      updated.render_area = preset.render_area as RenderArea;
    }
    if (!updated.position) {
      updated.position = preset.position;
    }
    if (!updated.label) {
      updated.label = preset.label;
    }
    if (!updated.unit && preset.unit) {
      updated.unit = preset.unit;
    }
    if (updated.precision === undefined && preset.precision !== undefined) {
      updated.precision = preset.precision;
    }
    normalized[key] = updated;
  }

  return {
    ...config,
    entities: normalized,
  };
}

export function mergeConfig(raw: Partial<CardConfig>): CardConfig {
  const display: DisplayConfig = {
    ...DEFAULT_DISPLAY,
    ...(raw.display || {}),
  };

  const entities: Record<string, EntityConfig> = {};
  if (raw.entities) {
    for (const [key, ent] of Object.entries(raw.entities)) {
      if (!ent) continue;
      entities[key] = normalizeEntityConfig(ent);
    }
  }

  const merged: CardConfig = {
    type: raw.type || 'custom:haval-h3-dashboard-card',
    title: raw.title || 'Haval H3',
    vehicle_image: normalizeVehicleImage(raw.vehicle_image),
    vehicle: {
      name: raw.vehicle?.name || 'Haval H3',
      show_default_image: raw.vehicle?.show_default_image ?? true,
      image_layout: (raw.vehicle?.image_layout as ImageLayout) || 'front',
    },
    layout: normalizeLayout(raw.layout),
    map: normalizeMap(raw.map),
    entities,
    display,
  };

  return normalizeEntityAreas(merged);
}

function normalizeEntityConfig(ent: Partial<EntityConfig>): EntityConfig {
  return {
    entity: ent.entity,
    enabled: ent.enabled ?? true,
    label: ent.label,
    icon: ent.icon,
    unit: ent.unit,
    position: ent.position,
    custom_position: ent.custom_position,
    precision: ent.precision,
    hide_unavailable: ent.hide_unavailable,
    color_rules: ent.color_rules,
    render_area: ent.render_area,
  };
}

function normalizeLayout(layout?: Partial<LayoutConfig>): LayoutConfig {
  return {
    left_width: layout?.left_width ?? 50,
    right_width: layout?.right_width ?? 50,
  };
}

function normalizeMap(map?: Partial<MapConfig>): MapConfig {
  return {
    device_tracker: map?.device_tracker,
    latitude_entity: map?.latitude_entity,
    longitude_entity: map?.longitude_entity,
    speed_entity: map?.speed_entity,
    course_entity: map?.course_entity,
    updated_entity: map?.updated_entity,
    zoom: map?.zoom ?? 15,
    show_accuracy: map?.show_accuracy ?? false,
    dark_mode: map?.dark_mode,
  };
}

export function validateConfig(config: CardConfig): string[] {
  const warnings: string[] = [];

  if (!config.entities || Object.keys(config.entities).length === 0) {
    warnings.push('No entities configured — card will display as empty');
  }

  if (!config.map?.device_tracker && !config.map?.latitude_entity) {
    warnings.push('No device_tracker or lat/lon entities configured — map will not show location');
  }

  return warnings;
}
