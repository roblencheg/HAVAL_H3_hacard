import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('no battery-badge in new vehicle-panel (v1.4.0)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('does NOT import battery-badge component', () => {
    expect(source).not.toContain("import './battery-badge'");
    expect(source).toContain("import './custom-badge'");
  });

  it('does NOT have BATTERY_KEYS constant', () => {
    expect(source).not.toContain('BATTERY_KEYS');
  });

  it('does NOT have _getBatteryBadge method', () => {
    expect(source).not.toContain('_getBatteryBadge');
  });

  it('does NOT render battery-badge in template', () => {
    expect(source).not.toContain('<battery-badge');
    expect(source).not.toContain('</battery-badge>');
  });

  it('renders all badges uniformly via custom-badge', () => {
    expect(source).toContain('<custom-badge');
    expect(source).toContain('</custom-badge>');
  });
});
