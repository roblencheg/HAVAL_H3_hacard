import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('overlay-badge icon rendering', () => {
  const source = fs.readFileSync(
    path.resolve(__dirname, '../src/components/overlay-badge.ts'),
    'utf-8'
  );

  it('uses <ha-icon> element', () => {
    expect(source).toContain('<ha-icon');
  });

  it('does not render ${icon} as raw text without ha-icon wrapper', () => {
    const lines = source.split('\n');
    const problematic = lines.filter((l) => {
      const hasIconExpr = l.includes('${icon}');
      const hasClosingSpan = l.includes('</span>');
      const hasHaIcon = l.includes('<ha-icon');
      return hasIconExpr && hasClosingSpan && !hasHaIcon;
    });
    expect(problematic).toHaveLength(0);
  });
});
