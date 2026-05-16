import { describe, it, expect } from 'vitest';
import { CARD_VERSION } from '../src/const';
import pkg from '../package.json';

describe('version sync', () => {
  it('CARD_VERSION matches package.json version', () => {
    expect(CARD_VERSION).toBe(pkg.version);
  });
});
