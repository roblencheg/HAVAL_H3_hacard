import { CardConfig, EntityConfig, CustomBadgeConfig, BadgeArea, LayoutConfig, MapConfig, DisplayConfig, DEFAULT_DISPLAY, ImageLayout } from '../types';
import { DEFAULT_VEHICLE_IMAGE } from '../generated/default-image';

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

export function normalizeBadge(raw: Partial<CustomBadgeConfig>, index: number): CustomBadgeConfig {
  return {
    id: raw.id || `badge_${index}`,
    entity: raw.entity || '',
    name: raw.name,
    icon: raw.icon,
    unit: raw.unit,
    area: raw.area || 'below_vehicle' as BadgeArea,
    position: raw.position || (raw.area === 'on_vehicle' ? { top: 50, left: 50 } : undefined),
    precision: raw.precision,
    enabled: raw.enabled ?? true,
    hide_unavailable: raw.hide_unavailable,
    show_icon: raw.show_icon,
    show_name: raw.show_name,
    show_unit: raw.show_unit,
  };
}

export function normalizeBadges(rawBadges: unknown): CustomBadgeConfig[] {
  if (!Array.isArray(rawBadges)) return [];
  return rawBadges.map((b, i) => normalizeBadge(b || {}, i));
}

export function migrateLegacyEntitiesToBadges(raw: Partial<CardConfig>): CustomBadgeConfig[] {
  if (raw.badges?.length) return normalizeBadges(raw.badges);
  if (!raw.entities) return [];

  return Object.entries(raw.entities).map(([key, ent]) => ({
    id: `legacy_${key}`,
    entity: ent.entity || '',
    name: ent.label || key,
    icon: ent.icon,
    unit: ent.unit,
    area: (ent.render_area === 'vehicle' ? 'on_vehicle' : 'below_vehicle') as BadgeArea,
    position: ent.custom_position || (ent.render_area === 'vehicle' ? { top: 50, left: 50 } : undefined),
    precision: ent.precision,
    enabled: ent.enabled ?? true,
    hide_unavailable: ent.hide_unavailable,
  }));
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

  const badges = migrateLegacyEntitiesToBadges(raw);

  return {
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
    badges,
    display,
  };
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

export function updateBadgePosition(config: CardConfig, badgeId: string, position: { top: number; left: number }): CustomBadgeConfig[] {
  return (config.badges || []).map((badge) =>
    badge.id === badgeId ? { ...badge, position } : badge
  );
}

export function validateConfig(config: CardConfig): string[] {
  const warnings: string[] = [];

  if (!config.badges || config.badges.length === 0) {
    warnings.push('No badges configured - card will display as empty');
  }

  if (!config.map?.device_tracker && !config.map?.latitude_entity) {
    warnings.push('No device_tracker or lat/lon entities configured - map will not show location');
  }

  return warnings;
}
