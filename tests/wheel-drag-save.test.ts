import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('wheel drag save in haval-h3-card (v1.4.0)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/haval-h3-card.ts'), 'utf-8');

  it('imports updateBadgePosition from config-schema', () => {
    expect(source).toContain("updateBadgePosition");
    expect(source).toContain("from './utils/config-schema'");
  });

  it('does NOT import parseWheelKey or getWheelTargetKeys', () => {
    expect(source).not.toContain('parseWheelKey');
    expect(source).not.toContain('getWheelTargetKeys');
    expect(source).not.toContain('./components/wheel-badge');
  });

  it('_handleBadgePositionChanged destructures id and position from event detail', () => {
    expect(source).toContain("const { id, position } = ev.detail || {}");
  });

  it('_handleBadgePositionChanged calls updateBadgePosition by badge.id', () => {
    expect(source).toContain("updateBadgePosition(config, id, position)");
    expect(source).toContain("config.badges");
  });

  it('_handleBadgePositionChanged disables edit mode after saving a new position', () => {
    expect(source).toContain("edit_positions: false");
  });

  it('_handleBadgePositionChanged dispatches config-changed with badge-based config', () => {
    expect(source).toContain("'config-changed'");
    expect(source).toContain("detail: { config }");
  });

  it('listens for badge-position-changed event from vehicle-panel', () => {
    expect(source).toContain("@badge-position-changed");
  });
});
