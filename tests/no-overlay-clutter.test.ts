import { describe, it, expect } from 'vitest';
import { SENSOR_PRESETS } from '../src/sensor-presets';

describe('no overlay clutter', () => {
  it('no vehicle position has more than 2 presets', () => {
    const positionCounts: Record<string, number> = {};
    for (const preset of SENSOR_PRESETS) {
      if (preset.render_area !== 'vehicle') continue;
      const pos = preset.position;
      positionCounts[pos] = (positionCounts[pos] || 0) + 1;
    }
    for (const [pos, count] of Object.entries(positionCounts)) {
      expect(count).toBeLessThanOrEqual(2);
    }
  });
});
