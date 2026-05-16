import { describe, it, expect } from 'vitest';
import { autoDetectEntities } from '../src/utils/entity-autodiscovery';

const BUTTON_TEST_FIXTURE: Record<string, { entity_id?: string; attributes: Record<string, unknown> }> = {
  'sensor.lavash_temperatura_vozdukha': {
    attributes: {
      friendly_name: 'Температура воздуха',
      unit_of_measurement: '°C',
      device_class: 'temperature',
    },
  },
  'button.lavash_otkryt_dveri': {
    attributes: { friendly_name: 'Открыть двери' },
  },
  'button.lavash_zakryt_dveri': {
    attributes: { friendly_name: 'Закрыть двери' },
  },
  'button.lavash_otkryt_bagazhnik': {
    attributes: { friendly_name: 'Открыть багажник' },
  },
  'button.lavash_zakryt_bagazhnik': {
    attributes: { friendly_name: 'Закрыть багажник' },
  },
  'button.lavash_otkryt_lyuk': {
    attributes: { friendly_name: 'Открыть люк' },
  },
  'button.lavash_zakryt_lyuk': {
    attributes: { friendly_name: 'Закрыть люк' },
  },
  'button.lavash_morgnut_farami': {
    attributes: { friendly_name: 'Моргнуть фарами' },
  },
  'button.lavash_podat_signal': {
    attributes: { friendly_name: 'Подать сигнал' },
  },
  'button.lavash_vkliuchit_obogrev': {
    attributes: { friendly_name: 'Включить обогрев' },
  },
  'button.lavash_vikliuchit_obogrev': {
    attributes: { friendly_name: 'Выключить обогрев' },
  },
  'button.lavash_obnovit_datchiki': {
    attributes: { friendly_name: 'Обновить датчики' },
  },
};

describe('button safety', () => {
  const results = autoDetectEntities(BUTTON_TEST_FIXTURE);

  it('no button.* entity appears in autodetection results', () => {
    const buttonEntities = Object.keys(BUTTON_TEST_FIXTURE).filter((id) => id.startsWith('button.'));
    for (const buttonId of buttonEntities) {
      const found = results.find((r) => r.entityId === buttonId);
      expect(found).toBeUndefined(`Button entity ${buttonId} should not be detected`);
    }
  });

  it('still detects regular sensor entities', () => {
    const outdoor = results.find((r) => r.key === 'outdoor_temp');
    expect(outdoor).toBeDefined();
    expect(outdoor!.entityId).toBe('sensor.lavash_temperatura_vozdukha');
  });

  it('returns no results with button-only entities', () => {
    const buttonOnlyFixture: Record<string, { attributes: Record<string, unknown> }> = {
      'button.lavash_otkryt_dveri': { attributes: { friendly_name: 'Открыть двери' } },
      'button.lavash_zakryt_dveri': { attributes: { friendly_name: 'Закрыть двери' } },
    };
    const buttonOnlyResults = autoDetectEntities(buttonOnlyFixture);
    expect(buttonOnlyResults.length).toBe(0);
  });
});
