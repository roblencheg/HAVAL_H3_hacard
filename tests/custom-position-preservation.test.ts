import { describe, it, expect } from 'vitest';
import { mergeConfig } from '../src/utils/config-schema';

describe('custom_position preservation', () => {
  it('preserves custom_position when merging config', () => {
    const result = mergeConfig({
      entities: {
        mileage: {
          entity: 'sensor.mileage',
          custom_position: { top: 50, left: 25 },
        },
      },
    });
    expect(result.entities?.mileage?.custom_position).toEqual({ top: 50, left: 25 });
  });

  it('preserves custom_position with all other fields', () => {
    const result = mergeConfig({
      entities: {
        fuel: {
          enabled: true,
          entity: 'sensor.fuel_level',
          label: 'Fuel',
          unit: 'L',
          precision: 1,
          position: 'top-left',
          custom_position: { top: 10, left: 90 },
        },
      },
    });
    expect(result.entities?.fuel?.custom_position).toEqual({ top: 10, left: 90 });
    expect(result.entities?.fuel?.enabled).toBe(true);
    expect(result.entities?.fuel?.label).toBe('Fuel');
  });

  it('does not add custom_position if not originally present', () => {
    const result = mergeConfig({
      entities: {
        mileage: {
          entity: 'sensor.mileage',
        },
      },
    });
    expect(result.entities?.mileage?.custom_position).toBeUndefined();
  });

  it('merges custom_position even when entity has no prior config', () => {
    const result = mergeConfig({
      entities: {
        hood: {
          custom_position: { top: 30, left: 70 },
        },
      },
    });
    expect(result.entities?.hood?.custom_position).toEqual({ top: 30, left: 70 });
  });
});
