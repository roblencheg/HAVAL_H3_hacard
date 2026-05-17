import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('autodiscovery new aliases (v1.3.9)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/sensor-presets.ts'), 'utf-8');

  it('outdoor_temp has new aliases: outdoor_temp, cesar_smart_outdoor_temperature, lavash_outdoor_temperature', () => {
    expect(source).toContain("'outdoor_temp'");
    expect(source).toContain("'cesar_smart_outdoor_temperature'");
    expect(source).toContain("'lavash_outdoor_temperature'");
  });

  it('engine_temperature has new aliases: engine_temp, coolant_temp, cesar_smart_engine_temperature, lavash_engine_temperature', () => {
    expect(source).toContain("'engine_temp'");
    expect(source).toContain("'coolant_temp'");
    expect(source).toContain("'cesar_smart_engine_temperature'");
    expect(source).toContain("'lavash_engine_temperature'");
  });

  it('battery_voltage has new aliases: akkumuliator_voltazh, cesar_smart_battery_voltage, lavash_battery_voltage', () => {
    expect(source).toContain("'akkumuliator_voltazh'");
    expect(source).toContain("'cesar_smart_battery_voltage'");
    expect(source).toContain("'lavash_battery_voltage'");
  });

  it('battery has new aliases: cesar_smart_battery, lavash_battery', () => {
    expect(source).toContain("'cesar_smart_battery'");
    expect(source).toContain("'lavash_battery'");
  });
});
