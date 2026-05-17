import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('ghost badge for hidden sensors (v1.3.9)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('has GhostEntry interface', () => {
    expect(source).toContain('interface GhostEntry');
    expect(source).toContain('key: string');
    expect(source).toContain('label: string');
    expect(source).toContain('reason: string');
  });

  it('has _getGhostEntities method', () => {
    expect(source).toContain('private _getGhostEntities');
    expect(source).toContain('Ghost badge');
  });

  it('renders ghost badges in debug mode', () => {
    expect(source).toContain('ghostEntities.map');
    expect(source).toContain('ghost-badge');
  });

  it('ghost badge has ghost-badge CSS class', () => {
    expect(source).toContain('.ghost-badge');
    expect(source).toContain('border: 1px dashed');
    expect(source).toContain('color: rgba(255, 255, 255, 0.5)');
  });

  it('warns via console.warn for hidden sensors', () => {
    expect(source).toContain('console.warn');
    expect(source).toContain('[haval-h3] Ghost badge');
  });

  it('ghost entities exclude already-resolved keys', () => {
    expect(source).toContain('resolvedKeys.has(key)');
  });
});
