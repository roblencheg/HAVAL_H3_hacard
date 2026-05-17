import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('render policy in vehicle-panel (v1.4.0)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('imports custom-badge component', () => {
    expect(source).toContain("import './custom-badge'");
  });

  it('has three zone methods: _getBadgesByArea', () => {
    expect(source).toContain('_getBadgesByArea');
    expect(source).toContain("b.area === area");
  });

  it('filters by area above_vehicle', () => {
    expect(source).toContain("'above_vehicle'");
  });

  it('filters by area on_vehicle', () => {
    expect(source).toContain("'on_vehicle'");
  });

  it('filters by area below_vehicle', () => {
    expect(source).toContain("'below_vehicle'");
  });

  it('renders above_vehicle badges in chip-zone.above', () => {
    expect(source).toContain('chip-zone above');
    expect(source).toContain('<custom-badge');
  });

  it('renders on_vehicle badges with position and drag support', () => {
    expect(source).toContain('@badge-drag-start');
    expect(source).toContain('overlay-container');
    expect(source).toContain('_previewPositions');
  });

  it('renders below_vehicle badges in chip-zone.below', () => {
    expect(source).toContain('chip-zone below');
  });

  it('drag events dispatch badge-position-changed with id and position', () => {
    expect(source).toContain("detail: { id: this._draggingId, position: { top, left } }");
  });

  it('does NOT reference TIRE_KEYS or VEHICLE_ALLOWED_KEYS', () => {
    expect(source).not.toContain('TIRE_KEYS');
    expect(source).not.toContain('VEHICLE_ALLOWED_KEYS');
  });

  it('does NOT reference battery-badge', () => {
    expect(source).not.toContain('battery-badge');
  });

  it('does NOT reference ghost entities', () => {
    expect(source).not.toContain('ghost');
  });
});
