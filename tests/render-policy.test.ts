import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('render policy in vehicle-panel', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('defines VEHICLE_ALLOWED_KEYS with hood, trunk, doors, battery_voltage, fuel, temperatures', () => {
    expect(source).toContain("'hood'");
    expect(source).toContain("'trunk'");
    expect(source).toContain("'door_front_left'");
    expect(source).toContain("'door_back_right'");
    expect(source).toContain("'battery_voltage'");
    expect(source).toContain("'fuel'");
    expect(source).toContain("'cabin_temp'");
    expect(source).toContain("'outdoor_temp'");
    expect(source).toContain("'engine_temperature'");
  });

  it('does NOT include tire keys in VEHICLE_ALLOWED_KEYS', () => {
    const allowedSection = source.slice(source.indexOf('VEHICLE_ALLOWED_KEYS'), source.indexOf('TIRE_KEYS'));
    expect(allowedSection).not.toContain('tire');
  });

  it('filters unknown keys with !force_vehicle check', () => {
    expect(source).toContain('!VEHICLE_ALLOWED_KEYS.has(key) && !ent.force_vehicle');
  });

  it('skips TIRE_KEYS with continue', () => {
    expect(source).toContain('if (TIRE_KEYS.has(key)) continue;');
  });

  it('defines TIRE_KEYS with all 8 tire sensor keys', () => {
    expect(source).toContain("'front_left_tire_pressure'");
    expect(source).toContain("'front_right_tire_pressure'");
    expect(source).toContain("'rear_left_tire_pressure'");
    expect(source).toContain("'rear_right_tire_pressure'");
    expect(source).toContain("'front_left_tire_temp'");
    expect(source).toContain("'front_right_tire_temp'");
    expect(source).toContain("'rear_left_tire_temp'");
    expect(source).toContain("'rear_right_tire_temp'");
  });
});
