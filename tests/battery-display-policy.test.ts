import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('battery display policy (v1.3.9)', () => {
  const vehicleSource = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');
  const batterySource = fs.readFileSync(path.resolve(__dirname, '../src/components/battery-badge.ts'), 'utf-8');

  it('vehicle-panel imports battery-badge component', () => {
    expect(vehicleSource).toContain("import './battery-badge'");
  });

  it('vehicle-panel has BATTERY_KEYS constant', () => {
    expect(vehicleSource).toContain('BATTERY_KEYS = new Set');
    expect(vehicleSource).toContain("'battery_voltage'");
    expect(vehicleSource).toContain("'battery'");
  });

  it('getResolvedEntities skips BATTERY_KEYS', () => {
    expect(vehicleSource).toContain('if (BATTERY_KEYS.has(key)) continue');
  });

  it('vehicle-panel has _getBatteryBadge method', () => {
    expect(vehicleSource).toContain('private _getBatteryBadge');
    expect(vehicleSource).toContain('primaryEntity: ResolvedEntity | null');
    expect(vehicleSource).toContain('fallbackEntity: ResolvedEntity | null');
  });

  it('vehicle-panel renders battery-badge in template', () => {
    expect(vehicleSource).toContain('<battery-badge');
    expect(vehicleSource).toContain('.primaryEntity');
    expect(vehicleSource).toContain('.fallbackEntity');
  });

  it('battery-badge prefers primaryEntity over fallbackEntity', () => {
    expect(batterySource).toContain('return this.primaryEntity || this.fallbackEntity || null');
  });

  it('battery-badge is registered as custom element', () => {
    expect(batterySource).toContain("window.customElements.get('battery-badge')");
    expect(batterySource).toContain("window.customElements.define('battery-badge'");
  });

  it('battery-badge supports drag with badge-drag-start event', () => {
    expect(batterySource).toContain("key: 'battery_voltage'");
    expect(batterySource).toContain('badge-drag-start');
  });
});
