import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('config normalization on badge save (v1.3.9)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/haval-h3-card.ts'), 'utf-8');

  it('calls mergeConfig after setting custom_position', () => {
    const lines = source.split('\n');
    const handlerStart = lines.findIndex(l => l.includes('_handleBadgePositionChanged'));
    const handlerLines = lines.slice(handlerStart, handlerStart + 40).join('\n');
    expect(handlerLines).toContain('this.config = mergeConfig(config)');
  });

  it('skips missing wheel entity keys (prevents phantom entities)', () => {
    expect(source).toContain("if (!config.entities[targetKey]) continue");
  });

  it('still saves custom_position for non-wheel keys via spread', () => {
    expect(source).toContain('config.entities[key] = {');
    expect(source).toContain('...(config.entities[key] || {}),');
    expect(source).toContain('custom_position');
  });
});
