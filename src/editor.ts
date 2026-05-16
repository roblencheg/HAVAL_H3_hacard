import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, EntityConfig } from './types';
import { CARD_NAME, EDITOR_NAME } from './const';
import { autoDetectEntities } from './utils/entity-autodiscovery';

interface HassEntity {
  entity_id?: string;
  attributes?: Record<string, unknown>;
}

interface HomeAssistant {
  states?: Record<string, HassEntity>;
  [key: string]: unknown;
}

interface SensorPreset {
  key: string;
  label: string;
  unit?: string;
  position: string;
  precision?: number;
}

const POSITION_OPTIONS = [
  'front_left_wheel', 'front_right_wheel', 'rear_left_wheel', 'rear_right_wheel',
  'front_left_wheel_secondary', 'front_right_wheel_secondary', 'rear_left_wheel_secondary', 'rear_right_wheel_secondary',
  'hood', 'engine', 'trunk', 'roof', 'sunroof', 'windshield', 'rear_window',
  'door_front_left', 'door_front_right', 'door_back_left', 'door_back_right',
  'dashboard', 'center_console', 'cabin',
  'engine_temperature', 'outdoor_temperature',
  'fuel_area', 'battery_area', 'mileage', 'info_block',
  'ignition', 'engine_state', 'security_mode',
  'front_center', 'rear_center',
];

type Section = { title: string; sensors: SensorPreset[] };

const SECTIONS: Section[] = [
  {
    title: 'TPMS / Tires',
    sensors: [
      { key: 'front_left_tire_pressure', label: 'FL', unit: 'bar', position: 'front_left_wheel', precision: 1 },
      { key: 'front_right_tire_pressure', label: 'FR', unit: 'bar', position: 'front_right_wheel', precision: 1 },
      { key: 'rear_left_tire_pressure', label: 'RL', unit: 'bar', position: 'rear_left_wheel', precision: 1 },
      { key: 'rear_right_tire_pressure', label: 'RR', unit: 'bar', position: 'rear_right_wheel', precision: 1 },
      { key: 'front_left_tire_temp', label: 'FL', unit: '°C', position: 'front_left_wheel_secondary' },
      { key: 'front_right_tire_temp', label: 'FR', unit: '°C', position: 'front_right_wheel_secondary' },
      { key: 'rear_left_tire_temp', label: 'RL', unit: '°C', position: 'rear_left_wheel_secondary' },
      { key: 'rear_right_tire_temp', label: 'RR', unit: '°C', position: 'rear_right_wheel_secondary' },
    ],
  },
  {
    title: 'Doors & Openings',
    sensors: [
      { key: 'hood', label: 'Hood', position: 'hood' },
      { key: 'trunk', label: 'Trunk', position: 'trunk' },
      { key: 'door_front_left', label: 'Front L', position: 'door_front_left' },
      { key: 'door_front_right', label: 'Front R', position: 'door_front_right' },
      { key: 'door_back_left', label: 'Rear L', position: 'door_back_left' },
      { key: 'door_back_right', label: 'Rear R', position: 'door_back_right' },
    ],
  },
  {
    title: 'Power & Engine',
    sensors: [
      { key: 'ignition', label: 'Ignition', position: 'ignition' },
      { key: 'engine_state', label: 'Engine', position: 'engine_state' },
      { key: 'battery', label: 'Battery', unit: 'V', position: 'battery_area', precision: 1 },
      { key: 'fuel', label: 'Fuel', unit: 'L', position: 'fuel_area', precision: 1 },
      { key: 'mileage', label: 'Mileage', unit: 'km', position: 'mileage' },
      { key: 'oil_qty', label: 'Oil', unit: 'L', position: 'engine', precision: 1 },
    ],
  },
  {
    title: 'Security',
    sensors: [
      { key: 'security_mode', label: 'Security', position: 'security_mode' },
      { key: 'tbox_online', label: 'TBOX Online', position: 'info_block' },
      { key: 'service_status', label: 'Service', position: 'info_block' },
    ],
  },
  {
    title: 'Climate',
    sensors: [
      { key: 'cabin_temp', label: 'Cabin', unit: '°C', position: 'cabin' },
      { key: 'outdoor_temp', label: 'Outdoor', unit: '°C', position: 'outdoor_temperature' },
      { key: 'engine_temperature', label: 'Engine Temp', unit: '°C', position: 'engine_temperature' },
    ],
  },
  {
    title: 'Info / Telemetry',
    sensors: [
      { key: 'location_speed', label: 'Speed', unit: 'km/h', position: 'info_block' },
      { key: 'location_course', label: 'Course', position: 'info_block' },
      { key: 'last_update', label: 'Updated', position: 'info_block' },
    ],
  },
];

function getDefaultEntities(): Record<string, EntityConfig> {
  const entities: Record<string, EntityConfig> = {};
  for (const section of SECTIONS) {
    for (const preset of section.sensors) {
      entities[preset.key] = {
        enabled: true,
        label: preset.label,
        unit: preset.unit || undefined,
        position: preset.position,
        precision: preset.precision,
      };
    }
  }
  return entities;
}

export class HavalH3Editor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CardConfig;

  private _autoDetectResults: Map<string, string> = new Map();
  private _autoDetecting = false;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
    .editor-section {
      margin-bottom: 24px;
    }
    .editor-section h3 {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-color, #03a9f4);
      margin: 0 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .editor-section h4 {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #aaa);
      margin: 16px 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .sensor-row {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--input-bg, rgba(255,255,255,0.03));
      align-items: center;
      flex-wrap: wrap;
    }
    .sensor-row:hover {
      background: var(--input-bg, rgba(255,255,255,0.07));
    }
    .sensor-toggle {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    .sensor-key {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color, #888);
      min-width: 140px;
      font-family: monospace;
    }
    .sensor-field {
      flex: 1;
      min-width: 100px;
    }
    .sensor-field.small {
      min-width: 60px;
      flex: 0.5;
    }
    .field {
      flex: 1;
      min-width: 200px;
    }
    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      border-radius: 8px;
      background: var(--input-bg, rgba(255,255,255,0.05));
      color: var(--primary-text-color, #fff);
      font-size: 13px;
      box-sizing: border-box;
    }
    .field-input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .field-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      border-radius: 8px;
      background: var(--input-bg, rgba(255,255,255,0.05));
      color: var(--primary-text-color, #fff);
      font-size: 13px;
      box-sizing: border-box;
      appearance: none;
      cursor: pointer;
    }
    .field-select:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .checkbox-row label {
      font-size: 13px;
      color: var(--primary-text-color, #fff);
    }
    .note {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      font-style: italic;
      margin-top: 4px;
    }
    .btn-row {
      display: flex;
      gap: 8px;
      margin: 12px 0;
      flex-wrap: wrap;
    }
    .btn {
      padding: 8px 16px;
      border: 1px solid var(--primary-color, #03a9f4);
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .detect-hint {
      font-size: 11px;
      color: var(--success-color, #4caf50);
      margin-left: 4px;
    }
    .collapsed {
      display: none;
    }
  `;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  private _valueChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _updateField(key: string, value: unknown): void {
    const keys = key.split('.');
    let obj = this.config as unknown as Record<string, unknown>;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    this._valueChanged();
  }

  private _updateEntityField(sensorKey: string, field: string, value: unknown): void {
    const path = `entities.${sensorKey}.${field}`;
    this._updateField(path, value);
  }

  private _getEntityConfig(sensorKey: string): EntityConfig {
    return this.config.entities?.[sensorKey] || {};
  }

  private _addDefaultLayout(): void {
    const defaults = getDefaultEntities();
    const merged: Record<string, EntityConfig> = { ...(this.config.entities || {}) };
    for (const [key, cfg] of Object.entries(defaults)) {
      if (!merged[key]) {
        merged[key] = cfg;
      }
    }
    this._updateField('entities', merged);
  }

  private async _autoDetect(): Promise<void> {
    if (!this.hass?.states) return;
    this._autoDetecting = true;
    await 0;
    const results = autoDetectEntities(this.hass.states);
    this._autoDetectResults = new Map(results.map((r) => [r.key, r.entityId]));
    const merged: Record<string, EntityConfig> = { ...(this.config.entities || {}) };
    for (const r of results) {
      if (!merged[r.key]) {
        merged[r.key] = { enabled: true, label: r.key.replace(/_/g, ' '), position: r.key };
      }
      merged[r.key].entity = r.entityId;
    }
    this._updateField('entities', merged);
    this._autoDetecting = false;
  }

  private _renderSensorRow(sensor: SensorPreset): TemplateResult {
    const cfg = this._getEntityConfig(sensor.key);
    const isEnabled = cfg.enabled !== false;
    const entityId = cfg.entity || '';
    const autoEntity = this._autoDetectResults.get(sensor.key);
    const hasEntityPicker = customElements.get('ha-entity-picker') !== undefined;

    const onEntityChange = hasEntityPicker
      ? (e: CustomEvent) => this._updateEntityField(sensor.key, 'entity', e.detail?.value || '')
      : (e: InputEvent) => this._updateEntityField(sensor.key, 'entity', (e.target as HTMLInputElement).value);

    return html`
      <div class="sensor-row">
        <div class="sensor-toggle">
          <input type="checkbox" ?checked=${isEnabled}
            @change=${(e: Event) => this._updateEntityField(sensor.key, 'enabled', (e.target as HTMLInputElement).checked)} />
        </div>
        <div class="sensor-key">${sensor.key}</div>
        <div class="sensor-field">
          ${hasEntityPicker ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${entityId}
              .includeDomains=${['sensor', 'binary_sensor', 'device_tracker']}
              @value-changed=${onEntityChange}
            ></ha-entity-picker>
            ${autoEntity && !entityId ? html`<span class="detect-hint">→ ${autoEntity}</span>` : ''}
          ` : html`
            <input class="field-input" .value=${entityId}
              @input=${onEntityChange}
              placeholder="sensor.xxx" />
            ${autoEntity && !entityId ? html`<span class="detect-hint">→ ${autoEntity}</span>` : ''}
          `}
        </div>
        <div class="sensor-field small">
          <input class="field-input" .value=${cfg.label || sensor.label || ''}
            @input=${(e: InputEvent) => this._updateEntityField(sensor.key, 'label', (e.target as HTMLInputElement).value)}
            placeholder="${sensor.label}" />
        </div>
        <div class="sensor-field small">
          <input class="field-input" .value=${cfg.unit || sensor.unit || ''}
            @input=${(e: InputEvent) => this._updateEntityField(sensor.key, 'unit', (e.target as HTMLInputElement).value)}
            placeholder="${sensor.unit || 'unit'}" />
        </div>
        <div class="sensor-field small">
          <select class="field-select"
            @change=${(e: Event) => this._updateEntityField(sensor.key, 'position', (e.target as HTMLSelectElement).value)}>
            <option value="">auto</option>
            ${POSITION_OPTIONS.map((p) => html`
              <option value="${p}" ?selected=${(cfg.position || sensor.position) === p}>${p}</option>
            `)}
          </select>
        </div>
        ${sensor.precision !== undefined ? html`
          <div class="sensor-field" style="flex: 0 0 50px; min-width: 50px;">
            <input class="field-input" type="number" .value=${cfg.precision ?? sensor.precision ?? ''}
              @input=${(e: InputEvent) => this._updateEntityField(sensor.key, 'precision', parseInt((e.target as HTMLInputElement).value) || undefined)}
              placeholder="prec" min="0" max="5" style="text-align:center;" />
          </div>
        ` : ''}
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this.config) {
      return html`<div>Loading editor...</div>`;
    }

    return html`
      <div class="editor-section">
        <h3>General</h3>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Title</label>
            <input class="field-input"
              .value=${this.config.title || ''}
              @input=${(e: InputEvent) => this._updateField('title', (e.target as HTMLInputElement).value)}
              placeholder="Haval H3" />
          </div>
          <div class="field">
            <label class="field-label">Vehicle Image Path</label>
            <input class="field-input"
              .value=${this.config.vehicle_image?.startsWith('data:image/') ? '' : (this.config.vehicle_image || '')}
              @input=${(e: InputEvent) => this._updateField('vehicle_image', (e.target as HTMLInputElement).value)}
              placeholder="Bundled default image, or /local/my_haval_h3.png" />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Vehicle Sensors</h3>
        <div class="btn-row">
          <button class="btn" @click=${this._addDefaultLayout}>Add default Haval H3 sensor layout</button>
          <button class="btn" @click=${this._autoDetect} ?disabled=${this._autoDetecting}>
            ${this._autoDetecting ? 'Detecting...' : 'Try auto-detect entities'}
          </button>
        </div>
        ${SECTIONS.map((section) => html`
          <h4>${section.title}</h4>
          ${section.sensors.map((s) => this._renderSensorRow(s))}
        `)}
        <div class="note">
          Disabled sensors and empty entity fields are hidden on the card.
        </div>
      </div>

      <div class="editor-section">
        <h3>Map</h3>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Device Tracker Entity</label>
            <input class="field-input"
              .value=${this.config.map?.device_tracker || ''}
              @input=${(e: InputEvent) => this._updateField('map.device_tracker', (e.target as HTMLInputElement).value)}
              placeholder="device_tracker.cesar_smart_vehicle" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Speed Entity</label>
            <input class="field-input"
              .value=${this.config.map?.speed_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.speed_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.location_speed" />
          </div>
          <div class="field">
            <label class="field-label">Last Updated Entity</label>
            <input class="field-input"
              .value=${this.config.map?.updated_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.updated_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.last_update" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Latitude Entity (alt)</label>
            <input class="field-input"
              .value=${this.config.map?.latitude_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.latitude_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.gwm_ru_latitude" />
          </div>
          <div class="field">
            <label class="field-label">Longitude Entity (alt)</label>
            <input class="field-input"
              .value=${this.config.map?.longitude_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.longitude_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.gwm_ru_longitude" />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Display</h3>
        <div class="checkbox-row">
          <input type="checkbox" ?checked=${this.config.display?.show_icons !== false}
            @change=${(e: Event) => this._updateField('display.show_icons', (e.target as HTMLInputElement).checked)}
            id="show_icons" />
          <label for="show_icons">Show Icons</label>
        </div>
        <div class="checkbox-row">
          <input type="checkbox" ?checked=${this.config.display?.show_labels !== false}
            @change=${(e: Event) => this._updateField('display.show_labels', (e.target as HTMLInputElement).checked)}
            id="show_labels" />
          <label for="show_labels">Show Labels</label>
        </div>
        <div class="checkbox-row">
          <input type="checkbox" ?checked=${this.config.display?.show_units !== false}
            @change=${(e: Event) => this._updateField('display.show_units', (e.target as HTMLInputElement).checked)}
            id="show_units" />
          <label for="show_units">Show Units</label>
        </div>
        <div class="checkbox-row">
          <input type="checkbox" ?checked=${this.config.display?.hide_unavailable !== false}
            @change=${(e: Event) => this._updateField('display.hide_unavailable', (e.target as HTMLInputElement).checked)}
            id="hide_unavailable" />
          <label for="hide_unavailable">Hide Unavailable Entities</label>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Theme Mode</label>
            <select class="field-input"
              @change=${(e: Event) => this._updateField('display.theme_mode', (e.target as HTMLSelectElement).value)}>
              <option value="auto" ?selected=${(this.config.display?.theme_mode || 'auto') === 'auto'}>Auto</option>
              <option value="light" ?selected=${this.config.display?.theme_mode === 'light'}>Light</option>
              <option value="dark" ?selected=${this.config.display?.theme_mode === 'dark'}>Dark</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }
}

if (!window.customElements.get(EDITOR_NAME)) {
  window.customElements.define(EDITOR_NAME, HavalH3Editor);
}
