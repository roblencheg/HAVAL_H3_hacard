import { describe, it, expect } from 'vitest';
import { SENSOR_PRESETS, SENSOR_PRESETS_BY_KEY } from '../src/sensor-presets';

describe('sim_balance preset', () => {
  const preset = SENSOR_PRESETS_BY_KEY.get('sim_balance');

  it('exists in SENSOR_PRESETS_BY_KEY', () => {
    expect(preset).toBeDefined();
  });

  it('has render_area = summary', () => {
    expect(preset?.render_area).toBe('summary');
  });

  it('has unit = ₽', () => {
    expect(preset?.unit).toBe('₽');
  });

  it('has summary_order = 30', () => {
    expect(preset?.summary_order).toBe(30);
  });

  it('is locked (all presets have locked_render_area)', () => {
    expect(preset?.locked_render_area).toBe(true);
  });

  it('appears in SENSOR_PRESETS array', () => {
    const found = SENSOR_PRESETS.find((p) => p.key === 'sim_balance');
    expect(found).toBeDefined();
    expect(found?.render_area).toBe('summary');
  });
});
