import { describe, it, expect } from 'vitest';
import { autoDetectEntities, autoDetectMapEntities } from '../src/utils/entity-autodiscovery';

const LAVASH_FIXTURE: Record<string, { entity_id?: string; attributes: Record<string, unknown> }> = {
  'sensor.lavash_akkumuliator': {
    attributes: {
      friendly_name: 'Аккумулятор',
      unit_of_measurement: 'V',
      device_class: 'battery',
    },
  },
  'sensor.lavash_voltazh_akkumuliatora': {
    attributes: {
      friendly_name: 'Вольтаж аккумулятора',
      unit_of_measurement: 'V',
      device_class: 'voltage',
    },
  },
  'sensor.lavash_davlenie_v_shine_zadnei_levoi': {
    attributes: {
      friendly_name: 'Давление в шине задней левой',
      unit_of_measurement: 'bar',
      device_class: 'pressure',
    },
  },
  'sensor.lavash_davlenie_v_shine_zadnei_pravoi': {
    attributes: {
      friendly_name: 'Давление в шине задней правой',
      unit_of_measurement: 'bar',
      device_class: 'pressure',
    },
  },
  'sensor.lavash_davlenie_v_shine_perednei_levoi': {
    attributes: {
      friendly_name: 'Давление в шине передней левой',
      unit_of_measurement: 'bar',
      device_class: 'pressure',
    },
  },
  'sensor.lavash_davlenie_v_shine_perednei_pravoi': {
    attributes: {
      friendly_name: 'Давление в шине передней правой',
      unit_of_measurement: 'bar',
      device_class: 'pressure',
    },
  },
  'sensor.lavash_temperatura_shiny_zadnei_levoi': {
    attributes: {
      friendly_name: 'Температура шины задней левой',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_temperatura_shiny_zadnei_pravoi': {
    attributes: {
      friendly_name: 'Температура шины задней правой',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_temperatura_shiny_perednei_levoi': {
    attributes: {
      friendly_name: 'Температура шины передней левой',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_temperatura_shiny_perednei_pravoi': {
    attributes: {
      friendly_name: 'Температура шины передней правой',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_zapas_khoda': {
    attributes: {
      friendly_name: 'Запас хода',
      unit_of_measurement: 'km',
    },
  },
  'sensor.lavash_probeg': {
    attributes: {
      friendly_name: 'Пробег',
      unit_of_measurement: 'km',
      device_class: 'distance',
    },
  },
  'sensor.lavash_status_obsluzhivaniia': {
    attributes: {
      friendly_name: 'Статус обслуживания',
    },
  },
  'sensor.lavash_status_tbox': {
    attributes: {
      friendly_name: 'Статус TBOX',
    },
  },
  'sensor.lavash_temperatura_vozdukha': {
    attributes: {
      friendly_name: 'Температура воздуха',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_temperatura_dvigatelia': {
    attributes: {
      friendly_name: 'Температура двигателя',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'sensor.lavash_toplivo': {
    attributes: {
      friendly_name: 'Топливо',
      unit_of_measurement: 'L',
    },
  },
  'sensor.lavash_uroven_masla': {
    attributes: {
      friendly_name: 'Уровень масла',
      unit_of_measurement: 'L',
    },
  },
  'binary_sensor.lavash_tbox_onlain': {
    attributes: {
      friendly_name: 'TBOX Онлайн',
      device_class: 'connectivity',
    },
  },
  'device_tracker.lavash_mestopolozhenie': {
    attributes: {
      friendly_name: 'Местоположение Лаваш',
    },
  },
};

describe('autoDetectEntities - GWM RU / Lavash', () => {
  const results = autoDetectEntities(LAVASH_FIXTURE);
  const resultMap = new Map(results.map((r) => [r.key, r]));

  it('detects rear_left_tire_pressure', () => {
    const r = resultMap.get('rear_left_tire_pressure');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_davlenie_v_shine_zadnei_levoi');
    expect(r!.confidence).toBeGreaterThanOrEqual(60);
  });

  it('detects rear_right_tire_pressure', () => {
    const r = resultMap.get('rear_right_tire_pressure');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_davlenie_v_shine_zadnei_pravoi');
  });

  it('detects front_left_tire_pressure', () => {
    const r = resultMap.get('front_left_tire_pressure');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_davlenie_v_shine_perednei_levoi');
  });

  it('detects front_right_tire_pressure', () => {
    const r = resultMap.get('front_right_tire_pressure');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_davlenie_v_shine_perednei_pravoi');
  });

  it('detects rear_left_tire_temp', () => {
    const r = resultMap.get('rear_left_tire_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_shiny_zadnei_levoi');
  });

  it('detects rear_right_tire_temp', () => {
    const r = resultMap.get('rear_right_tire_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_shiny_zadnei_pravoi');
  });

  it('detects front_left_tire_temp', () => {
    const r = resultMap.get('front_left_tire_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_shiny_perednei_levoi');
  });

  it('detects front_right_tire_temp', () => {
    const r = resultMap.get('front_right_tire_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_shiny_perednei_pravoi');
  });

  it('detects battery', () => {
    const r = resultMap.get('battery');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_akkumuliator');
  });

  it('detects battery_voltage', () => {
    const r = resultMap.get('battery_voltage');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_voltazh_akkumuliatora');
  });

  it('detects range', () => {
    const r = resultMap.get('range');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_zapas_khoda');
  });

  it('detects mileage', () => {
    const r = resultMap.get('mileage');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_probeg');
  });

  it('detects outdoor_temp', () => {
    const r = resultMap.get('outdoor_temp');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_vozdukha');
  });

  it('detects engine_temperature', () => {
    const r = resultMap.get('engine_temperature');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_temperatura_dvigatelia');
  });

  it('detects fuel', () => {
    const r = resultMap.get('fuel');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_toplivo');
  });

  it('detects oil_qty', () => {
    const r = resultMap.get('oil_qty');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_uroven_masla');
  });

  it('detects service_status', () => {
    const r = resultMap.get('service_status');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_status_obsluzhivaniia');
  });

  it('detects tbox_status', () => {
    const r = resultMap.get('tbox_status');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('sensor.lavash_status_tbox');
  });

  it('detects tbox_online', () => {
    const r = resultMap.get('tbox_online');
    expect(r).toBeDefined();
    expect(r!.entityId).toBe('binary_sensor.lavash_tbox_onlain');
  });
});

describe('autoDetectMapEntities - Lavash', () => {
  const mapResult = autoDetectMapEntities(LAVASH_FIXTURE);

  it('detects device_tracker', () => {
    expect(mapResult.device_tracker).toBe('device_tracker.lavash_mestopolozhenie');
  });
});

describe('button safety - Lavash entities', () => {
  const BUTTON_FIXTURE: Record<string, { attributes: Record<string, unknown> }> = {
    ...LAVASH_FIXTURE,
    'button.lavash_otkryt_dveri': { attributes: { friendly_name: 'Открыть двери' } },
    'button.lavash_zakryt_bagazhnik': { attributes: { friendly_name: 'Закрыть багажник' } },
    'button.lavash_otkryt_lyuk': { attributes: { friendly_name: 'Открыть люк' } },
    'button.lavash_zakryt_lyuk': { attributes: { friendly_name: 'Закрыть люк' } },
    'button.lavash_morgnut_farami': { attributes: { friendly_name: 'Моргнуть фарами' } },
    'button.lavash_podat_signal': { attributes: { friendly_name: 'Подать сигнал' } },
    'button.lavash_vkliuchit_obogrev': { attributes: { friendly_name: 'Включить обогрев' } },
    'button.lavash_vikliuchit_obogrev': { attributes: { friendly_name: 'Выключить обогрев' } },
    'button.lavash_obnovit_datchiki': { attributes: { friendly_name: 'Обновить датчики' } },
  };

  const results = autoDetectEntities(BUTTON_FIXTURE);
  const resultKeys = results.map((r) => r.key);

  it('does not include button entities in results', () => {
    for (const entityId of Object.keys(BUTTON_FIXTURE)) {
      if (entityId.startsWith('button.')) {
        const found = results.find((r) => r.entityId === entityId);
        expect(found).toBeUndefined();
      }
    }
  });
});
