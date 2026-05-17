import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('no ghost badges in vehicle-panel (v1.4.0)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('does not have GhostEntry interface', () => {
    expect(source).not.toContain('interface GhostEntry');
  });

  it('does not have _getGhostEntities method', () => {
    expect(source).not.toContain('_getGhostEntities');
  });

  it('does not render ghost badge template', () => {
    expect(source).not.toContain('ghostEntities');
    expect(source).not.toContain('ghost-badge');
  });

  it('does not have .ghost-badge CSS class', () => {
    expect(source).not.toContain('.ghost-badge');
  });

  it('does not warn about ghost badges via console.warn', () => {
    expect(source).not.toContain('Ghost badge');
  });
});
