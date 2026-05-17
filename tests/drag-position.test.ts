import { describe, it, expect } from 'vitest';
import { clientToPercent } from '../src/utils/drag-position';

describe('clientToPercent', () => {
  const rect = { left: 100, top: 200, width: 500, height: 300 };

  it('center of rect -> 50, 50', () => {
    const result = clientToPercent(350, 350, rect);
    expect(result.left).toBe(50);
    expect(result.top).toBe(50);
  });

  it('left edge -> 0, 0', () => {
    const result = clientToPercent(0, 0, rect);
    expect(result.left).toBe(0);
    expect(result.top).toBe(0);
  });

  it('beyond right/bottom edge -> 100, 100', () => {
    const result = clientToPercent(1000, 1000, rect);
    expect(result.left).toBe(100);
    expect(result.top).toBe(100);
  });

  it('mid left and mid top', () => {
    const result = clientToPercent(100, 200, rect);
    expect(result.left).toBe(0);
    expect(result.top).toBe(0);
  });

  it('quarter position', () => {
    const result = clientToPercent(225, 275, rect);
    expect(result.left).toBe(25);
    expect(result.top).toBe(25);
  });
});
