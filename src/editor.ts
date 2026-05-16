import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig } from './types';
import { CARD_NAME, EDITOR_NAME } from './const';

interface HomeAssistant {
  [key: string]: unknown;
}

export class HavalH3Editor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CardConfig;

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
    .field-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      flex-wrap: wrap;
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
            <input
              class="field-input"
              .value=${this.config.title || ''}
              @input=${(e: InputEvent) => this._updateField('title', (e.target as HTMLInputElement).value)}
              placeholder="Haval H3"
            />
          </div>
          <div class="field">
            <label class="field-label">Vehicle Image Path</label>
            <input
              class="field-input"
              .value=${this.config.vehicle_image?.startsWith('data:image/') ? '' : (this.config.vehicle_image || '')}
              @input=${(e: InputEvent) => this._updateField('vehicle_image', (e.target as HTMLInputElement).value)}
              placeholder="Bundled default image, or /local/my_haval_h3.png"
            />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Map</h3>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Device Tracker Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.device_tracker || ''}
              @input=${(e: InputEvent) => this._updateField('map.device_tracker', (e.target as HTMLInputElement).value)}
              placeholder="device_tracker.cesar_smart_vehicle"
            />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Speed Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.speed_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.speed_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.location_speed"
            />
          </div>
          <div class="field">
            <label class="field-label">Last Updated Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.updated_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.updated_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.last_update"
            />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Latitude Entity (alt)</label>
            <input
              class="field-input"
              .value=${this.config.map?.latitude_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.latitude_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.gwm_ru_latitude"
            />
          </div>
          <div class="field">
            <label class="field-label">Longitude Entity (alt)</label>
            <input
              class="field-input"
              .value=${this.config.map?.longitude_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.longitude_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.gwm_ru_longitude"
            />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Display</h3>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${this.config.display?.show_icons !== false}
            @change=${(e: Event) => this._updateField('display.show_icons', (e.target as HTMLInputElement).checked)}
            id="show_icons"
          />
          <label for="show_icons">Show Icons</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${this.config.display?.show_labels !== false}
            @change=${(e: Event) => this._updateField('display.show_labels', (e.target as HTMLInputElement).checked)}
            id="show_labels"
          />
          <label for="show_labels">Show Labels</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${this.config.display?.show_units !== false}
            @change=${(e: Event) => this._updateField('display.show_units', (e.target as HTMLInputElement).checked)}
            id="show_units"
          />
          <label for="show_units">Show Units</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${this.config.display?.hide_unavailable !== false}
            @change=${(e: Event) => this._updateField('display.hide_unavailable', (e.target as HTMLInputElement).checked)}
            id="hide_unavailable"
          />
          <label for="hide_unavailable">Hide Unavailable Entities</label>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Theme Mode</label>
            <select
              class="field-input"
              @change=${(e: Event) => this._updateField('display.theme_mode', (e.target as HTMLSelectElement).value)}
            >
              <option value="auto" ?selected=${(this.config.display?.theme_mode || 'auto') === 'auto'}>Auto</option>
              <option value="light" ?selected=${this.config.display?.theme_mode === 'light'}>Light</option>
              <option value="dark" ?selected=${this.config.display?.theme_mode === 'dark'}>Dark</option>
            </select>
          </div>
        </div>
        <div class="note">
          For full entity configuration (sensors, positions, labels), use the YAML editor.
        </div>
      </div>
    `;
  }
}

if (!window.customElements.get(EDITOR_NAME)) {
  window.customElements.define(EDITOR_NAME, HavalH3Editor);
}
