import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('wheel drag save in haval-h3-card', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/haval-h3-card.ts'), 'utf-8');

  it('imports parseWheelKey from wheel-badge', () => {
    expect(source).toContain("import { parseWheelKey, getWheelTargetKeys } from './components/wheel-badge'");
  });

  it('contains wheelKey branching in _handleBadgePositionChanged', () => {
    expect(source).toContain('const wheelKey = parseWheelKey(key)');
    expect(source).toContain('if (wheelKey)');
  });

  it('saves custom_position to both target keys for wheel group', () => {
    expect(source).toContain("getWheelTargetKeys(wheelKey)");
    expect(source).toContain("for (const targetKey of [pKey, tKey])");
    expect(source).toContain("config.entities[targetKey]");
  });

  it('falls back to single key save for non-wheel keys', () => {
    const lines = source.split('\n');
    const handlerStart = lines.findIndex(l => l.includes('_handleBadgePositionChanged'));
    const handlerLines = lines.slice(handlerStart, handlerStart + 30).join('\n');
    expect(handlerLines).toContain('} else {');
    expect(handlerLines).toContain('config.entities[key]');
  });
});
