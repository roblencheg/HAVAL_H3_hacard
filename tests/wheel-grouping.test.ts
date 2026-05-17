import { describe, it, expect, beforeAll } from 'vitest';

describe('wheel grouping helpers', () => {
  let getWheelGroupKey: (wk: string) => string;
  let getWheelTargetKeys: (wk: string) => [string, string];
  let parseWheelKey: (key: string) => string | null;

  beforeAll(async () => {
    (globalThis as Record<string, unknown>).window = globalThis as unknown as Window & typeof globalThis;
    (globalThis as Record<string, unknown>).window.customElements = {
      get: () => undefined,
      define: () => {},
    } as unknown as CustomElementRegistry;
    const mod = await import('../src/components/wheel-badge');
    getWheelGroupKey = mod.getWheelGroupKey;
    getWheelTargetKeys = mod.getWheelTargetKeys;
    parseWheelKey = mod.parseWheelKey;
  });
  describe('getWheelGroupKey', () => {
    it('returns wheel_front_left for front_left', () => {
      expect(getWheelGroupKey('front_left')).toBe('wheel_front_left');
    });

    it('returns wheel_front_right for front_right', () => {
      expect(getWheelGroupKey('front_right')).toBe('wheel_front_right');
    });

    it('returns wheel_rear_left for rear_left', () => {
      expect(getWheelGroupKey('rear_left')).toBe('wheel_rear_left');
    });

    it('returns wheel_rear_right for rear_right', () => {
      expect(getWheelGroupKey('rear_right')).toBe('wheel_rear_right');
    });
  });

  describe('getWheelTargetKeys', () => {
    it('returns pressure then temp for front_left', () => {
      const [p, t] = getWheelTargetKeys('front_left');
      expect(p).toBe('front_left_tire_pressure');
      expect(t).toBe('front_left_tire_temp');
    });

    it('returns correct pair for front_right', () => {
      const [p, t] = getWheelTargetKeys('front_right');
      expect(p).toBe('front_right_tire_pressure');
      expect(t).toBe('front_right_tire_temp');
    });

    it('returns correct pair for rear_left', () => {
      const [p, t] = getWheelTargetKeys('rear_left');
      expect(p).toBe('rear_left_tire_pressure');
      expect(t).toBe('rear_left_tire_temp');
    });

    it('returns correct pair for rear_right', () => {
      const [p, t] = getWheelTargetKeys('rear_right');
      expect(p).toBe('rear_right_tire_pressure');
      expect(t).toBe('rear_right_tire_temp');
    });
  });

  describe('parseWheelKey', () => {
    it('parses wheel_front_left to front_left', () => {
      expect(parseWheelKey('wheel_front_left')).toBe('front_left');
    });

    it('parses wheel_rear_right to rear_right', () => {
      expect(parseWheelKey('wheel_rear_right')).toBe('rear_right');
    });

    it('returns null for non-wheel key', () => {
      expect(parseWheelKey('hood')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(parseWheelKey('')).toBeNull();
    });
  });
});
