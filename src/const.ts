export const CARD_NAME = 'haval-h3-dashboard-card';
export const EDITOR_NAME = 'haval-h3-dashboard-editor';
export const CARD_TITLE = 'Haval H3 Dashboard';
export const CARD_VERSION = '1.5.5';

export const CESAR_ENTITY_MAP = {
  sensors: {
    engine_state: 'sensor.engine_state',
    security_mode: 'sensor.security_mode',
    fuel_level: 'sensor.fuel_level',
    mileage: 'sensor.mileage',
    battery_voltage: 'sensor.battery_voltage',
    engine_temperature: 'sensor.engine_temperature',
    cabin_temperature: 'sensor.cabin_temperature',
    outdoor_temperature: 'sensor.outdoor_temperature',
    left_side_temperature: 'sensor.left_side_temperature',
    right_side_temperature: 'sensor.right_side_temperature',
    location_speed: 'sensor.location_speed',
    location_course: 'sensor.location_course',
    last_update: 'sensor.last_update',
  },
  binary_sensors: {
    ignition: 'binary_sensor.ignition',
    hood: 'binary_sensor.hood',
    door_front_left: 'binary_sensor.door_front_left',
    door_front_right: 'binary_sensor.door_front_right',
    door_back_left: 'binary_sensor.door_back_left',
    door_back_right: 'binary_sensor.door_back_right',
    trunk: 'binary_sensor.trunk',
    engine_running: 'binary_sensor.engine_running',
  },
  device_tracker: 'device_tracker.cesar_smart_vehicle',
};

export const HAVAL_H3_ENTITY_MAP = {
  sensors: {
    range_km: 'sensor.gwm_ru_range_km',
    fuel_liters: 'sensor.gwm_ru_fuel_liters',
    mileage_total: 'sensor.gwm_ru_mileage_total',
    tire_fl_pressure: 'sensor.gwm_ru_tire_fl_pressure',
    tire_fl_temp: 'sensor.gwm_ru_tire_fl_temp',
    tire_fr_pressure: 'sensor.gwm_ru_tire_fr_pressure',
    tire_fr_temp: 'sensor.gwm_ru_tire_fr_temp',
    tire_rl_pressure: 'sensor.gwm_ru_tire_rl_pressure',
    tire_rl_temp: 'sensor.gwm_ru_tire_rl_temp',
    tire_rr_pressure: 'sensor.gwm_ru_tire_rr_pressure',
    tire_rr_temp: 'sensor.gwm_ru_tire_rr_temp',
    engine_coolant_temp: 'sensor.gwm_ru_engine_coolant_temp',
    ambient_temperature: 'sensor.gwm_ru_ambient_temperature',
    battery_voltage: 'sensor.gwm_ru_battery_voltage',
    vehicle_battery: 'sensor.gwm_ru_vehicle_battery',
    brand: 'sensor.gwm_ru_brand',
    model: 'sensor.gwm_ru_model',
    color: 'sensor.gwm_ru_color',
    oil_qty: 'sensor.gwm_ru_oil_qty',
    service_status: 'sensor.gwm_ru_service_status',
    tbox_status: 'sensor.gwm_ru_tbox_status',
  },
  binary_sensors: {
    tbox_online: 'binary_sensor.gwm_ru_tbox_online',
  },
  device_tracker: 'device_tracker.gwm_ru_location',
};
