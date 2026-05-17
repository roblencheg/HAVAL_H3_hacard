import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');

interface FileCheck {
  file: string;
  name: string;
}

const COMPONENTS: FileCheck[] = [
  { file: 'vehicle-panel.ts', name: 'vehicle-panel' },
  { file: 'overlay-badge.ts', name: 'overlay-badge' },
  { file: 'summary-panel.ts', name: 'summary-panel' },
  { file: 'map-panel.ts', name: 'map-panel' },
];

describe('custom element registration guards', () => {
  for (const { file, name } of COMPONENTS) {
    it(`${name} is guarded with window.customElements.get`, () => {
      const source = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf-8');
      const lines = source.split('\n');
      const defineLineIndex = lines.findIndex((l) =>
        l.includes(`customElements.define('${name}'`)
      );
      expect(defineLineIndex).toBeGreaterThanOrEqual(0);

      const surrounding = lines.slice(Math.max(0, defineLineIndex - 2), defineLineIndex + 2).join('\n');
      expect(surrounding).toContain('window.customElements.get');
      expect(lines[defineLineIndex]).toContain('window.customElements.define');
    });
  }

  it('editor.ts is guarded', () => {
    const source = fs.readFileSync(path.resolve(__dirname, '../src/editor.ts'), 'utf-8');
    const lines = source.split('\n');
    const defineLineIndex = lines.findIndex((l) => l.includes('window.customElements.define(EDITOR_NAME'));
    expect(defineLineIndex).toBeGreaterThanOrEqual(0);
    const before = lines.slice(Math.max(0, defineLineIndex - 2), defineLineIndex).join('\n');
    expect(before).toMatch(/if \(!window\.customElements\.get\(/);
  });

  it('index.ts is guarded', () => {
    const source = fs.readFileSync(path.resolve(__dirname, '../src/index.ts'), 'utf-8');
    const lines = source.split('\n');
    const defineLines = lines.filter((l) => l.includes('window.customElements.define'));
    for (const line of defineLines) {
      const idx = lines.indexOf(line);
      const before = lines.slice(Math.max(0, idx - 1), idx).join('\n');
      expect(before).toMatch(/if \(!window\.customElements\.get\(/);
    }
  });
});
