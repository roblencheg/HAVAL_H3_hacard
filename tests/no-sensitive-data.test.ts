import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, '../src');

function getAllSourceFiles(): string[] {
  const entries = fs.readdirSync(SRC_DIR, { recursive: true }) as string[];
  return entries
    .filter((e) => e.endsWith('.ts') && !e.startsWith('generated' + path.sep))
    .map((e) => path.join(SRC_DIR, e));
}

describe('no sensitive data in source code', () => {
  const files = getAllSourceFiles();

  it('does not contain phone numbers', () => {
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const phoneMatch = content.match(/[\+\d][\d\s\-\(\)]{7,}[\d]/);
      if (phoneMatch) {
        const line = content.split('\n').findIndex((l) => l.includes(phoneMatch[0]));
        expect.fail(`Phone-like pattern found in ${path.relative(SRC_DIR, file)}:${line + 1}`);
      }
    }
  });

  it('does not contain VIN numbers', () => {
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const vinPattern = /[A-HJ-NPR-Z0-9]{17}/;
      const match = content.match(vinPattern);
      if (match) {
        const line = content.split('\n').findIndex((l) => l.includes(match[0]));
        expect.fail(`VIN-like pattern found in ${path.relative(SRC_DIR, file)}:${line + 1}`);
      }
    }
  });

  it('does not contain unitId', () => {
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      expect(content.toLowerCase()).not.toContain('unitid');
      expect(content.toLowerCase()).not.toContain('unit_id');
    }
  });
});
