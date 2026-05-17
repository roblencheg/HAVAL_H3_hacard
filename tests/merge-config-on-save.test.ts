import { describe, it, expect } from 'vitest';
import { mergeConfig, normalizeBadges, updateBadgePosition } from '../src/utils/config-schema';

describe('config normalization on badge save (v1.4.0)', () => {
  it('calls mergeConfig after setting position', () => {
    const config = mergeConfig({
      vehicle: { name: 'Test' },
      badges: [
        { id: 'badge_1', entity: 'sensor.test', area: 'on_vehicle', position: { top: 20, left: 30 } },
      ],
    });
    expect(config.badges).toBeDefined();
    expect(config.badges!.length).toBeGreaterThanOrEqual(1);
  });

  it('updateBadgePosition updates position by badge.id', () => {
    const config = {
      badges: [
        { id: 'badge_1', entity: 'sensor.test', area: 'on_vehicle' as const, position: { top: 10, left: 10 } },
        { id: 'badge_2', entity: 'sensor.other', area: 'on_vehicle' as const, position: { top: 50, left: 50 } },
      ],
    };
    const updated = updateBadgePosition(config, 'badge_1', { top: 90, left: 80 });
    expect(updated).toBeDefined();
    expect(updated!.length).toBe(2);
    expect(updated![0].position).toEqual({ top: 90, left: 80 });
    expect(updated![1].position).toEqual({ top: 50, left: 50 });
  });

  it('updateBadgePosition returns badges unchanged when id not found', () => {
    const config = {
      badges: [
        { id: 'badge_1', entity: 'sensor.test', area: 'on_vehicle' as const },
      ],
    };
    const updated = updateBadgePosition(config, 'nonexistent', { top: 90, left: 80 });
    expect(updated).toEqual(config.badges);
  });
});
