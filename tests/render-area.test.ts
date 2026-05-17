import { describe, it, expect } from 'vitest';
import { SENSOR_PRESETS, SENSOR_PRESETS_BY_KEY } from '../src/sensor-presets';

describe('render_area assignments', () => {
  it('all presets have render_area', () => {
    for (const preset of SENSOR_PRESETS) {
      expect(preset.render_area).toBeDefined();
      expect(['vehicle', 'summary', 'map', 'hidden']).toContain(preset.render_area);
    }
  });

  describe('vehicle presets', () => {
    const vehicleKeys = SENSOR_PRESETS.filter((p) => p.render_area === 'vehicle').map((p) => p.key);

    it('includes tire pressures', () => {
      expect(vehicleKeys).toContain('front_left_tire_pressure');
      expect(vehicleKeys).toContain('front_right_tire_pressure');
      expect(vehicleKeys).toContain('rear_left_tire_pressure');
      expect(vehicleKeys).toContain('rear_right_tire_pressure');
    });

    it('includes tire temps', () => {
      expect(vehicleKeys).toContain('front_left_tire_temp');
      expect(vehicleKeys).toContain('front_right_tire_temp');
      expect(vehicleKeys).toContain('rear_left_tire_temp');
      expect(vehicleKeys).toContain('rear_right_tire_temp');
    });

    it('includes hood, trunk, doors', () => {
      expect(vehicleKeys).toContain('hood');
      expect(vehicleKeys).toContain('trunk');
      expect(vehicleKeys).toContain('door_front_left');
      expect(vehicleKeys).toContain('door_front_right');
      expect(vehicleKeys).toContain('door_back_left');
      expect(vehicleKeys).toContain('door_back_right');
    });

    it('includes battery_voltage', () => {
      expect(vehicleKeys).toContain('battery_voltage');
    });

    it('includes fuel', () => {
      expect(vehicleKeys).toContain('fuel');
    });

    it('includes engine_temperature, outdoor_temp, cabin_temp', () => {
      expect(vehicleKeys).toContain('engine_temperature');
      expect(vehicleKeys).toContain('outdoor_temp');
      expect(vehicleKeys).toContain('cabin_temp');
    });
  });

  describe('summary presets', () => {
    const summaryKeys = SENSOR_PRESETS.filter((p) => p.render_area === 'summary').map((p) => p.key);

    it('includes mileage, range', () => {
      expect(summaryKeys).toContain('mileage');
      expect(summaryKeys).toContain('range');
    });

    it('includes model, color, label', () => {
      expect(summaryKeys).toContain('model');
      expect(summaryKeys).toContain('color');
      expect(summaryKeys).toContain('label');
    });

    it('includes service_status, tbox_status, tbox_online', () => {
      expect(summaryKeys).toContain('service_status');
      expect(summaryKeys).toContain('tbox_status');
      expect(summaryKeys).toContain('tbox_online');
    });
  });

  describe('map presets', () => {
    const mapKeys = SENSOR_PRESETS.filter((p) => p.render_area === 'map').map((p) => p.key);

    it('includes device_tracker', () => {
      expect(mapKeys).toContain('device_tracker');
    });

    it('includes location_speed, location_course, last_update', () => {
      expect(mapKeys).toContain('location_speed');
      expect(mapKeys).toContain('location_course');
      expect(mapKeys).toContain('last_update');
    });
  });
});
