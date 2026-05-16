import { describe, it, expect } from 'vitest';
import { autoDetectEntities, autoDetectMapEntities } from '../src/utils/entity-autodiscovery';

const CESAR_FIXTURE: Record<string, { entity_id?: string; attributes: Record<string, unknown> }> = {
  'sensor.haval_h3_battery_voltage': {
    attributes: {
      friendly_name: 'Battery Voltage',
      unit_of_measurement: 'V',
      device_class: 'voltage',
    },
  },
  'sensor.haval_h3_cabin_temperature': {
    attributes: {
      friendly_name: 'Cabin Temperature',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'binary_sensor.haval_h3_door_back_left': {
    attributes: {
      friendly_name: 'Door Back Left',
      device_class: 'door',
    },
  },
  'binary_sensor.haval_h3_door_back_right': {
    attributes: {
      friendly_name: 'Door Back Right',
      device_class: 'door',
    },
  },
  'binary_sensor.haval_h3_door_front_left': {
    attributes: {
      friendly_name: 'Door Front Left',
      device_class: 'door',
    },
  },
  'binary_sensor.haval_h3_door_front_right': {
    attributes: {
      friendly_name: 'Door Front Right',
      device_class: 'door',
    },
  },
  'binary_sensor.haval_h3_engine_running': {
    attributes: {
      friendly_name: 'Engine Running',
    },
  },
  'sensor.haval_h3_engine_state': {
    attributes: {
      friendly_name: 'Engine State',
    },
  },
  'sensor.haval_h3_engine_temperature': {
    attributes: {
      friendly_name: 'Engine Temperature',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.haval_h3_fuel_level': {
    attributes: {
      friendly_name: 'Fuel Level',
      unit_of_measurement: 'L',
    },
  },
  'device_tracker.haval_h3': {
    attributes: {
      friendly_name: 'Haval H3 Location',
    },
  },
  'binary_sensor.haval_h3_hood': {
    attributes: {
      friendly_name: 'Hood',
      device_class: 'opening',
    },
  },
  'binary_sensor.haval_h3_ignition': {
    attributes: {
      friendly_name: 'Ignition',
    },
  },
  'sensor.haval_h3_label': {
    attributes: {
      friendly_name: 'Label',
    },
  },
  'sensor.haval_h3_last_update': {
    attributes: {
      friendly_name: 'Last Update',
    },
  },
  'sensor.haval_h3_left_side_temperature': {
    attributes: {
      friendly_name: 'Left Side Temperature',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.haval_h3_location_course': {
    attributes: {
      friendly_name: 'Location Course',
    },
  },
  'sensor.haval_h3_location_speed': {
    attributes: {
      friendly_name: 'Location Speed',
      unit_of_measurement: 'km/h',
    },
  },
  'sensor.haval_h3_mileage': {
    attributes: {
      friendly_name: 'Mileage',
      unit_of_measurement: 'km',
    },
  },
  'sensor.haval_h3_outdoor_temperature': {
    attributes: {
      friendly_name: 'Outdoor Temperature',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.haval_h3_right_side_temperature': {
    attributes: {
      friendly_name: 'Right Side Temperature',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.haval_h3_security_mode': {
    attributes: {
      friendly_name: 'Security Mode',
    },
  },
};

describe('autoDetectEntities - Cesar Smart ReadOnly', () => {
  const results = autoDetectEntities(CESAR_FIXTURE);
  const resultMap = new Map(results.map((r) => [r.key, r]));

  it('detects battery_voltage', () => {
    const r = resultMap.get('battery_voltage');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_battery_voltage');
  });

  it('detects cabin_temp', () => {
    const r = resultMap.get('cabin_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_cabin_temperature');
  });

  it('detects door_back_left', () => {
    const r = resultMap.get('door_back_left');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_door_back_left');
  });

  it('detects door_back_right', () => {
    const r = resultMap.get('door_back_right');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_door_back_right');
  });

  it('detects door_front_left', () => {
    const r = resultMap.get('door_front_left');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_door_front_left');
  });

  it('detects door_front_right', () => {
    const r = resultMap.get('door_front_right');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_door_front_right');
  });

  it('detects engine_running', () => {
    const r = resultMap.get('engine_running');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_engine_running');
  });

  it('detects engine_state', () => {
    const r = resultMap.get('engine_state');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_engine_state');
  });

  it('detects engine_temperature', () => {
    const r = resultMap.get('engine_temperature');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_engine_temperature');
  });

  it('detects fuel', () => {
    const r = resultMap.get('fuel');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_fuel_level');
  });

  it('detects hood', () => {
    const r = resultMap.get('hood');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_hood');
  });

  it('detects ignition', () => {
    const r = resultMap.get('ignition');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.haval_h3_ignition');
  });

  it('detects label', () => {
    const r = resultMap.get('label');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_label');
  });

  it('detects last_update', () => {
    const r = resultMap.get('last_update');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_last_update');
  });

  it('detects left_side_temperature', () => {
    const r = resultMap.get('left_side_temperature');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_left_side_temperature');
  });

  it('detects right_side_temperature', () => {
    const r = resultMap.get('right_side_temperature');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_right_side_temperature');
  });

  it('detects location_course', () => {
    const r = resultMap.get('location_course');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_location_course');
  });

  it('detects location_speed', () => {
    const r = resultMap.get('location_speed');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_location_speed');
  });

  it('detects mileage', () => {
    const r = resultMap.get('mileage');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_mileage');
  });

  it('detects outdoor_temp', () => {
    const r = resultMap.get('outdoor_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_outdoor_temperature');
  });

  it('detects security_mode', () => {
    const r = resultMap.get('security_mode');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.haval_h3_security_mode');
  });
});

describe('autoDetectMapEntities - Cesar', () => {
  const mapResult = autoDetectMapEntities(CESAR_FIXTURE);

  it('detects device_tracker', () => {
    expect(mapResult.device_tracker).toBe('device_tracker.haval_h3');
  });

  it('detects speed_entity', () => {
    expect(mapResult.speed_entity).toBe('sensor.haval_h3_location_speed');
  });

  it('detects course_entity', () => {
    expect(mapResult.course_entity).toBe('sensor.haval_h3_location_course');
  });

  it('detects updated_entity', () => {
    expect(mapResult.updated_entity).toBe('sensor.haval_h3_last_update');
  });
});
