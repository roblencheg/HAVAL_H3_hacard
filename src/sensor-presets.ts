export interface SensorPreset {
  key: string;
  label: string;
  unit?: string;
  position: string;
  precision?: number;
  domains: string[];
  aliases: string[];
  category: string;
  render_area: 'vehicle' | 'summary' | 'map' | 'hidden';
  locked_render_area?: boolean;
  overlay_priority?: number;
  summary_order?: number;
}

export type SensorCategory = 'TPMS' | 'Doors / Openings' | 'Power / Engine' | 'Security / Service' | 'Climate' | 'Info' | 'Map';

export const POSITION_OPTIONS = [
  'front_left_wheel', 'front_right_wheel', 'rear_left_wheel', 'rear_right_wheel',
  'front_left_wheel_secondary', 'front_right_wheel_secondary', 'rear_left_wheel_secondary', 'rear_right_wheel_secondary',
  'hood', 'engine', 'trunk', 'roof', 'sunroof', 'windshield', 'rear_window',
  'door_front_left', 'door_front_right', 'door_back_left', 'door_back_right',
  'dashboard', 'center_console', 'cabin',
  'engine_temperature', 'outdoor_temperature',
  'fuel_area', 'battery_area', 'mileage', 'info_block',
  'ignition', 'engine_state', 'security_mode',
  'front_center', 'rear_center',
];

export const SENSOR_PRESETS: SensorPreset[] = [
  // === TPMS / Tires ===
  {
    key: 'front_left_tire_pressure',
    label: 'FL',
    unit: 'bar',
    position: 'front_left_wheel',
    precision: 1,
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'front_left_tire_pressure', 'tire_fl_pressure', 'tyre_fl_pressure', 'fl_pressure',
      'front_left_pressure', 'tire_pressure_fl', 'tpms_fl', 'pressure_fl',
      'davlenie_v_shine_perednei_levoi', 'davlenie_shiny_perednei_levoi', 'davlenie_perednei_levoi',
      'давление в шине передней левой', 'давление передней левой', 'передней левой',
    ],
  },
  {
    key: 'front_right_tire_pressure',
    label: 'FR',
    unit: 'bar',
    position: 'front_right_wheel',
    precision: 1,
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'front_right_tire_pressure', 'tire_fr_pressure', 'tyre_fr_pressure', 'fr_pressure',
      'front_right_pressure', 'tire_pressure_fr', 'tpms_fr', 'pressure_fr',
      'davlenie_v_shine_perednei_pravoi', 'davlenie_shiny_perednei_pravoi', 'davlenie_perednei_pravoi',
      'давление в шине передней правой', 'давление передней правой', 'передней правой',
    ],
  },
  {
    key: 'rear_left_tire_pressure',
    label: 'RL',
    unit: 'bar',
    position: 'rear_left_wheel',
    precision: 1,
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'rear_left_tire_pressure', 'tire_rl_pressure', 'tyre_rl_pressure', 'rl_pressure',
      'rear_left_pressure', 'tire_pressure_rl', 'tpms_rl', 'pressure_rl',
      'davlenie_v_shine_zadnei_levoi', 'davlenie_shiny_zadnei_levoi', 'davlenie_zadnei_levoi',
      'давление в шине задней левой', 'давление задней левой', 'задней левой',
    ],
  },
  {
    key: 'rear_right_tire_pressure',
    label: 'RR',
    unit: 'bar',
    position: 'rear_right_wheel',
    precision: 1,
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 5,
    aliases: [
      'rear_right_tire_pressure', 'tire_rr_pressure', 'tyre_rr_pressure', 'rr_pressure',
      'rear_right_pressure', 'tire_pressure_rr', 'tpms_rr', 'pressure_rr',
      'davlenie_v_shine_zadnei_pravoi', 'davlenie_shiny_zadnei_pravoi', 'davlenie_zadnei_pravoi',
      'давление в шине задней правой', 'давление задней правой', 'задней правой',
    ],
  },
  {
    key: 'front_left_tire_temp',
    label: 'FL',
    unit: '°C',
    position: 'front_left_wheel_secondary',
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 5,
    aliases: [
      'front_left_tire_temp', 'tire_fl_temp', 'front_left_tire_temperature',
      'temperatura_shiny_perednei_levoi', 'temperatura_perednei_levoi',
      'температура шины передней левой',
    ],
  },
  {
    key: 'front_right_tire_temp',
    label: 'FR',
    unit: '°C',
    position: 'front_right_wheel_secondary',
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 5,
    aliases: [
      'front_right_tire_temp', 'tire_fr_temp', 'front_right_tire_temperature',
      'temperatura_shiny_perednei_pravoi', 'temperatura_perednei_pravoi',
      'температура шины передней правой',
    ],
  },
  {
    key: 'rear_left_tire_temp',
    label: 'RL',
    unit: '°C',
    position: 'rear_left_wheel_secondary',
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 5,
    aliases: [
      'rear_left_tire_temp', 'tire_rl_temp', 'rear_left_tire_temperature',
      'temperatura_shiny_zadnei_levoi', 'temperatura_zadnei_levoi',
      'температура шины задней левой',
    ],
  },
  {
    key: 'rear_right_tire_temp',
    label: 'RR',
    unit: '°C',
    position: 'rear_right_wheel_secondary',
    domains: ['sensor'],
    category: 'TPMS',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 5,
    aliases: [
      'rear_right_tire_temp', 'tire_rr_temp', 'rear_right_tire_temperature',
      'temperatura_shiny_zadnei_pravoi', 'temperatura_zadnei_pravoi',
      'температура шины задней правой',
    ],
  },

  // === Doors / Openings ===
  {
    key: 'hood',
    label: 'Hood',
    position: 'hood',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'hood', 'haval_h3_hood',
    ],
  },
  {
    key: 'trunk',
    label: 'Trunk',
    position: 'trunk',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: ['trunk'],
  },
  {
    key: 'door_front_left',
    label: 'Front L',
    position: 'door_front_left',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'door_front_left', 'haval_h3_door_front_left',
    ],
  },
  {
    key: 'door_front_right',
    label: 'Front R',
    position: 'door_front_right',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'door_front_right', 'haval_h3_door_front_right',
    ],
  },
  {
    key: 'door_back_left',
    label: 'Rear L',
    position: 'door_back_left',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'door_back_left', 'haval_h3_door_back_left',
    ],
  },
  {
    key: 'door_back_right',
    label: 'Rear R',
    position: 'door_back_right',
    domains: ['binary_sensor', 'sensor'],
    category: 'Doors / Openings',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'door_back_right', 'haval_h3_door_back_right',
    ],
  },

  // === Power / Engine ===
  {
    key: 'ignition',
    label: 'Ignition',
    position: 'ignition',
    domains: ['binary_sensor', 'sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 50,
    aliases: [
      'ignition', 'haval_h3_ignition',
    ],
  },
  {
    key: 'engine_running',
    label: 'Engine',
    position: 'engine_state',
    domains: ['binary_sensor', 'sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 45,
    aliases: [
      'engine_running', 'haval_h3_engine_running',
    ],
  },
  {
    key: 'engine_state',
    label: 'Engine State',
    position: 'engine_state',
    domains: ['sensor', 'binary_sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 40,
    aliases: [
      'engine_state', 'haval_h3_engine_state',
    ],
  },
  {
    key: 'battery',
    label: 'Battery',
    unit: 'V',
    position: 'battery_area',
    precision: 1,
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 105,
    aliases: [
      'akkumuliator', 'аккумулятор', 'battery', 'vehicle_battery',
    ],
  },
  {
    key: 'battery_voltage',
    label: 'Battery Voltage',
    unit: 'V',
    position: 'battery_area',
    precision: 2,
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'voltazh_akkumuliatora', 'voltazh', 'battery_voltage', 'voltage', 'вольтаж аккумулятора',
      'haval_h3_battery_voltage',
    ],
  },
  {
    key: 'fuel',
    label: 'Fuel',
    unit: 'L',
    position: 'fuel_area',
    precision: 1,
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'toplivo', 'fuel', 'fuel_level', 'уровень топлива',
      'haval_h3_fuel_level',
    ],
  },
  {
    key: 'range',
    label: 'Range',
    unit: 'km',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 20,
    aliases: [
      'zapas_khoda', 'range', 'range_km', 'запас хода',
    ],
  },
  {
    key: 'mileage',
    label: 'Mileage',
    unit: 'km',
    position: 'mileage',
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 10,
    aliases: [
      'probeg', 'mileage', 'odometer', 'пробег',
      'haval_h3_mileage',
    ],
  },
  {
    key: 'oil_qty',
    label: 'Oil',
    unit: 'L',
    position: 'engine',
    precision: 1,
    domains: ['sensor'],
    category: 'Power / Engine',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 100,
    aliases: [
      'uroven_masla', 'oil_qty', 'oil_level', 'уровень масла',
    ],
  },

  // === Security / Service ===
  {
    key: 'security_mode',
    label: 'Security',
    position: 'security_mode',
    domains: ['sensor', 'binary_sensor'],
    category: 'Security / Service',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 60,
    aliases: [
      'security_mode', 'haval_h3_security_mode',
    ],
  },
  {
    key: 'tbox_status',
    label: 'TBOX Status',
    position: 'info_block',
    domains: ['sensor', 'binary_sensor'],
    category: 'Security / Service',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 80,
    aliases: [
      'status_tbox', 'tbox_status', 'статус tbox',
    ],
  },
  {
    key: 'tbox_online',
    label: 'TBOX Online',
    position: 'info_block',
    domains: ['binary_sensor', 'sensor'],
    category: 'Security / Service',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 70,
    aliases: [
      'tbox_onlain', 'tbox_online', 'online', 'онлайн',
    ],
  },
  {
    key: 'service_status',
    label: 'Service',
    position: 'info_block',
    domains: ['sensor', 'binary_sensor'],
    category: 'Security / Service',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 90,
    aliases: [
      'status_obsluzhivaniia', 'service_status', 'service', 'статус обслуживания',
    ],
  },

  // === Climate ===
  {
    key: 'cabin_temp',
    label: 'Cabin',
    unit: '°C',
    position: 'cabin',
    domains: ['sensor'],
    category: 'Climate',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'cabin_temp', 'haval_h3_cabin_temperature', 'cabin_temperature',
    ],
  },
  {
    key: 'outdoor_temp',
    label: 'Outdoor',
    unit: '°C',
    position: 'outdoor_temperature',
    domains: ['sensor'],
    category: 'Climate',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'temperatura_vozdukha', 'outdoor_temperature', 'ambient_temperature', 'температура воздуха',
      'haval_h3_outdoor_temperature',
    ],
  },
  {
    key: 'engine_temperature',
    label: 'Engine Temp',
    unit: '°C',
    position: 'engine_temperature',
    domains: ['sensor'],
    category: 'Climate',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'temperatura_dvigatelia', 'engine_temperature', 'coolant_temperature', 'температура двигателя',
      'haval_h3_engine_temperature',
    ],
  },
  {
    key: 'left_side_temperature',
    label: 'Left Side',
    unit: '°C',
    position: 'cabin',
    domains: ['sensor'],
    category: 'Climate',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'left_side_temperature', 'haval_h3_left_side_temperature',
    ],
  },
  {
    key: 'right_side_temperature',
    label: 'Right Side',
    unit: '°C',
    position: 'cabin',
    domains: ['sensor'],
    category: 'Climate',
    render_area: 'vehicle',
    locked_render_area: true,
    overlay_priority: 10,
    aliases: [
      'right_side_temperature', 'haval_h3_right_side_temperature',
    ],
  },

  // === Info ===
  {
    key: 'label',
    label: 'Label',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 130,
    aliases: [
      'label', 'haval_h3_label',
    ],
  },
  {
    key: 'make',
    label: 'Make',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 115,
    aliases: [
      'marka', 'make', 'brand', 'марка',
    ],
  },
  {
    key: 'model',
    label: 'Model',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 110,
    aliases: [
      'model', 'модель',
    ],
  },
  {
    key: 'color',
    label: 'Color',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 120,
    aliases: [
      'tsvet', 'color', 'цвет',
    ],
  },
  {
    key: 'sim_balance',
    label: 'SIM',
    unit: '₽',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'summary',
    locked_render_area: true,
    summary_order: 30,
    aliases: [
      'sim_balance', 'haval_h3_sim_balance', 'cesar_sim_balance',
      'balance', 'balans', 'баланс', 'баланс sim', 'баланс сим',
    ],
  },
  {
    key: 'location_speed',
    label: 'Speed',
    unit: 'km/h',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'map',
    locked_render_area: true,
    aliases: [
      'location_speed', 'haval_h3_location_speed', 'speed',
    ],
  },
  {
    key: 'location_course',
    label: 'Course',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'map',
    locked_render_area: true,
    aliases: [
      'location_course', 'haval_h3_location_course', 'course',
    ],
  },
  {
    key: 'last_update',
    label: 'Updated',
    position: 'info_block',
    domains: ['sensor'],
    category: 'Info',
    render_area: 'map',
    locked_render_area: true,
    aliases: [
      'last_update', 'haval_h3_last_update', 'last_updated', 'updated',
    ],
  },

  // === Map / Device Tracker ===
  {
    key: 'device_tracker',
    label: 'Tracker',
    position: 'info_block',
    domains: ['device_tracker'],
    category: 'Map',
    render_area: 'map',
    locked_render_area: true,
    aliases: [
      'lavash_mestopolozhenie', 'device_tracker.haval_h3',
      'mestopolozhenie', 'location', 'haval_h3', 'местоположение',
    ],
  },
];

export const SENSOR_PRESETS_BY_KEY = new Map<string, SensorPreset>(
  SENSOR_PRESETS.map((p) => [p.key, p])
);

export const SENSOR_SECTIONS: { title: string; category: SensorCategory }[] = [
  { title: 'TPMS / Tires', category: 'TPMS' },
  { title: 'Doors & Openings', category: 'Doors / Openings' },
  { title: 'Power & Engine', category: 'Power / Engine' },
  { title: 'Security / Service', category: 'Security / Service' },
  { title: 'Climate', category: 'Climate' },
  { title: 'Info / Telemetry', category: 'Info' },
  { title: 'Map / Device Tracker', category: 'Map' },
];

export function getPresetsByCategory(category: SensorCategory): SensorPreset[] {
  return SENSOR_PRESETS.filter((p) => p.category === category);
}

export function getDefaultEntities(): Record<string, import('./types').EntityConfig> {
  const entities: Record<string, import('./types').EntityConfig> = {};
  for (const preset of SENSOR_PRESETS) {
    if (preset.render_area === 'map' || preset.render_area === 'hidden') continue;
    entities[preset.key] = {
      enabled: true,
      label: preset.label,
      unit: preset.unit || undefined,
      position: preset.position,
      precision: preset.precision,
      render_area: preset.render_area,
    };
  }
  return entities;
}

export const BROAD_ALIASES = new Set([
  'battery', 'fuel', 'speed', 'model', 'color', 'status',
  'online', 'service', 'location', 'balance',
]);

export const CONTEXT_WORDS = [
  'lavash', 'haval', 'h3', 'gwm', 'cesar', 'vehicle', 'car',
];
