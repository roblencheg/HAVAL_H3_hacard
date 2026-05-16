import { HassEntity } from 'home-assistant-js-websocket';

export interface PositionConfig {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface EntityConfig {
  entity?: string;
  enabled?: boolean;
  label?: string;
  icon?: string;
  unit?: string;
  position?: string;
  custom_position?: PositionConfig;
  precision?: number;
  hide_unavailable?: boolean;
  color_rules?: ColorRule[];
}

export interface ColorRule {
  state: string | number;
  operator?: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';
  color: string;
  icon?: string;
}

export interface MapConfig {
  device_tracker?: string;
  latitude_entity?: string;
  longitude_entity?: string;
  speed_entity?: string;
  course_entity?: string;
  updated_entity?: string;
  zoom?: number;
  show_accuracy?: boolean;
  dark_mode?: boolean;
}

export interface LayoutConfig {
  left_width?: number;
  right_width?: number;
}

export interface DisplayConfig {
  show_icons?: boolean;
  show_labels?: boolean;
  show_units?: boolean;
  hide_unavailable?: boolean;
  hide_disabled?: boolean;
  status_color_rules?: boolean;
  theme_mode?: 'auto' | 'light' | 'dark';
  unavailable_text?: string;
  show_entity_name_on_hover?: boolean;
}

export interface CardConfig {
  type: string;
  title?: string;
  vehicle_image?: string;
  vehicle?: {
    name?: string;
    show_default_image?: boolean;
  };
  layout: LayoutConfig;
  map?: MapConfig;
  entities?: Record<string, EntityConfig>;
  display: DisplayConfig;
}

export interface ResolvedEntity {
  config: EntityConfig;
  state: HassEntity | null;
  value: string | number | null;
  isUnavailable: boolean;
}

export const PRESET_POSITIONS: Record<string, PositionConfig> = {
  front_left_wheel: { top: 68, left: 8 },
  front_right_wheel: { top: 68, left: 52 },
  rear_left_wheel: { top: 72, left: 3 },
  rear_right_wheel: { top: 72, left: 57 },
  front_left_wheel_secondary: { top: 74, left: 8 },
  front_right_wheel_secondary: { top: 74, left: 52 },
  rear_left_wheel_secondary: { top: 78, left: 3 },
  rear_right_wheel_secondary: { top: 78, left: 57 },
  hood: { top: 20, left: 28 },
  engine: { top: 28, left: 22 },
  roof: { top: 2, left: 30 },
  windshield: { top: 8, left: 28 },
  dashboard: { top: 35, left: 18 },
  center_console: { top: 42, left: 42 },
  fuel_area: { top: 65, left: 35 },
  battery_area: { top: 55, left: 80 },
  trunk: { top: 80, left: 42 },
  front_center: { top: 15, left: 40 },
  rear_center: { top: 70, left: 42 },
  info_block: { top: 50, left: 78 },
  door_front_left: { top: 48, left: 5 },
  door_front_right: { top: 48, left: 55 },
  door_back_left: { top: 65, left: 5 },
  door_back_right: { top: 65, left: 55 },
};

export const DEFAULT_DISPLAY: DisplayConfig = {
  show_icons: true,
  show_labels: true,
  show_units: true,
  hide_unavailable: true,
  hide_disabled: true,
  status_color_rules: true,
  theme_mode: 'auto',
  unavailable_text: '\u2014',
  show_entity_name_on_hover: false,
};

export const DEFAULT_IMAGE = '/local/haval_h3_white_sunroof.png';
