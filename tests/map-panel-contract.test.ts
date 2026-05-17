import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('map-panel contract', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/map-panel.ts'), 'utf-8');

  it('passes entity ids to ha-map instead of hass state objects', () => {
    expect(source).toContain('const mapEntities: string[] = []');
    expect(source).toContain('mapEntities.push(trackerId)');
    expect(source).not.toContain('mapEntities.push(this.hass.states[trackerId])');
  });

  it('enables auto-fit so the tracker is visible immediately', () => {
    expect(source).toContain('.autoFit=${true}');
  });
});
