import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('wheel badge format (v1.3.9)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/wheel-badge.ts'), 'utf-8');

  it('adds bar suffix to pressure value when show_units is true', () => {
    expect(source).toContain("+ ' bar'");
  });

  it('adds degree symbol to temperature value when show_units is true', () => {
    expect(source).toContain("+ '\\u00B0'");
  });

  it('uses compact border-radius (7px)', () => {
    expect(source).toContain('border-radius: 7px');
  });

  it('uses dark semi-transparent background (rgba(0, 0, 0, 0.42))', () => {
    expect(source).toContain('rgba(0, 0, 0, 0.42)');
  });

  it('uses compact min-height (17px)', () => {
    expect(source).toContain('min-height: 17px');
  });

  it('exports getWheelGroupKey function', () => {
    expect(source).toContain('export function getWheelGroupKey');
  });

  it('exports getWheelTargetKeys function', () => {
    expect(source).toContain('export function getWheelTargetKeys');
  });

  it('exports parseWheelKey function', () => {
    expect(source).toContain('export function parseWheelKey');
  });
});
