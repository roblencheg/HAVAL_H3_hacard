import { describe, it, expect } from 'vitest';
import { autoDetectEntities } from '../src/utils/entity-autodiscovery';
import { SENSOR_PRESETS_BY_KEY } from '../src/sensor-presets';

const FIXTURE: Record<string, { entity_id?: string; attributes: Record<string, unknown> }> = {
  'sensor.lavash_davlenie_v_shine_perednei_levoi': {
    attributes: {
      friendly_name: 'Давление в шине передней левой',
      unit_of_measurement: 'bar',
      device_class: 'pressure',
    },
  },
  'sensor.haval_h3_fuel_level': {
    attributes: {
      friendly_name: 'Fuel Level',
      unit_of_measurement: 'L',
    },
  },
  'sensor.lavash_voltazh_akkumuliatora': {
    attributes: {
      friendly_name: 'Вольтаж аккумулятора',
      unit_of_measurement: 'V',
      device_class: 'voltage',
    },
  },
  'sensor.lavash_temperatura_shiny_perednei_levoi': {
    attributes: {
      friendly_name: 'Температура шины передней левой',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
};

describe('autoDetectEntities does not return invalid keys', () => {
  const results = autoDetectEntities(FIXTURE);

  it('every result key exists in SENSOR_PRESETS_BY_KEY', () => {
    for (const r of results) {
      expect(SENSOR_PRESETS_BY_KEY.has(r.key)).toBe(true);
    }
  });

  it('does not return tire_fl_pressure', () => {
    const keys = results.map((r) => r.key);
    expect(keys).not.toContain('tire_fl_pressure');
  });

  it('does not return tire_fr_pressure', () => {
    const keys = results.map((r) => r.key);
    expect(keys).not.toContain('tire_fr_pressure');
  });

  it('does not return tire_rl_pressure', () => {
    const keys = results.map((r) => r.key);
    expect(keys).not.toContain('tire_rl_pressure');
  });

  it('does not return tire_rr_pressure', () => {
    const keys = results.map((r) => r.key);
    expect(keys).not.toContain('tire_rr_pressure');
  });

  it('does not return fuel_level', () => {
    const keys = results.map((r) => r.key);
    expect(keys).not.toContain('fuel_level');
  });
});
