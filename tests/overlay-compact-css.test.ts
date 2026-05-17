import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('overlay-badge compact CSS', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/overlay-badge.ts'), 'utf-8');

  it('uses compact padding (2px 5px)', () => {
    expect(source).toContain('padding: 2px 5px');
  });

  it('uses compact border-radius (7px)', () => {
    expect(source).toContain('border-radius: 7px');
  });

  it('uses dark semi-transparent background (rgba(0, 0, 0, 0.42))', () => {
    expect(source).toContain('rgba(0, 0, 0, 0.42)');
  });

  it('uses backdrop-filter blur(3px)', () => {
    expect(source).toContain('blur(3px)');
  });

  it('uses compact font-size (10px)', () => {
    expect(source).toContain('font-size: 10px');
  });

  it('uses compact min-height (17px)', () => {
    expect(source).toContain('min-height: 17px');
  });

  it('uses compact max-width (130px)', () => {
    expect(source).toContain('max-width: 130px');
  });

  it('uses small icon size (12x12px)', () => {
    expect(source).toContain('width: 12px');
    expect(source).toContain('height: 12px');
  });

  it('uses compact label font-size (8px)', () => {
    expect(source).toContain('font-size: 8px');
  });

  it('uses compact value font-size (10px)', () => {
    expect(source).toContain('font-size: 10px');
  });
});
