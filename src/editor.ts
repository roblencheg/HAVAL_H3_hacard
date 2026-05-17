import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, CustomBadgeConfig, BadgeArea } from './types';
import { EDITOR_NAME } from './const';
import { mergeConfig } from './utils/config-schema';

interface HassEntity {
  entity_id?: string;
  attributes?: Record<string, unknown>;
}

interface HomeAssistant {
  states?: Record<string, HassEntity>;
  [key: string]: unknown;
}

let _badgeCounter = Date.now();

function makeBadgeId(): string {
  return `badge_${++_badgeCounter}_${Math.random().toString(36).slice(2, 6)}`;
}

export class HavalH3Editor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CardConfig;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--primary-text-color, #fff);
    }
    .editor-section {
      margin-bottom: 24px;
      padding: 16px;
      border-radius: 18px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      background:
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
        rgba(10, 18, 27, 0.28);
    }
    .editor-section h3 {
      font-size: 16px;
      font-weight: 650;
      color: var(--primary-text-color, #fff);
      margin: 0 0 6px 0;
    }
    .section-note {
      margin: 0 0 14px 0;
      color: var(--secondary-text-color, #9aa7b5);
      font-size: 12px;
      line-height: 1.45;
    }
    .field-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .badge-row {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 12px;
      padding: 14px;
      border-radius: 16px;
      background: var(--input-bg, rgba(255,255,255,0.035));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
    }
    .badge-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .badge-row-header label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
    }
    .badge-summary {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      color: var(--secondary-text-color, #9aa7b5);
      font-size: 11px;
      line-height: 1.4;
    }
    .badge-summary span {
      display: inline-flex;
      align-items: center;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
    }
    .badge-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: flex-end;
    }
    .field {
      flex: 1;
      min-width: 150px;
    }
    .field.small {
      flex: 0 0 80px;
      min-width: 60px;
    }
    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #9aa7b5);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-input,
    .field-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      border-radius: 10px;
      background: var(--input-bg, rgba(255,255,255,0.05));
      color: var(--primary-text-color, #fff);
      font-size: 13px;
      box-sizing: border-box;
    }
    .field-select {
      appearance: none;
      cursor: pointer;
    }
    .field-input:focus,
    .field-select:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .checkbox-row label {
      font-size: 13px;
      color: var(--primary-text-color, #fff);
    }
    .note {
      font-size: 11px;
      color: var(--secondary-text-color, #9aa7b5);
      margin-top: 4px;
      line-height: 1.5;
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
      border-radius: 10px;
      background: rgba(3, 169, 244, 0.06);
      color: var(--primary-color, #59c2ff);
      font-size: 13px;
      cursor: pointer;
      font-weight: 600;
    }
    .btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .btn-danger {
      border-color: var(--error-color, #f44336);
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.06);
    }
    .btn-danger:hover {
      background: var(--error-color, #f44336);
      color: #fff;
    }
    .pos-label {
      font-size: 11px;
      color: var(--secondary-text-color, #9aa7b5);
      font-family: monospace;
    }
    .mode-callout {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding: 12px 14px;
      margin-top: 14px;
      border-radius: 14px;
      border: 1px solid rgba(72, 192, 255, 0.2);
      background: rgba(72, 192, 255, 0.08);
      font-size: 12px;
      line-height: 1.45;
      color: rgba(224, 244, 255, 0.92);
    }
    .mode-callout strong {
      color: #fff;
    }
  `;

  setConfig(config: CardConfig): void {
    this.config = mergeConfig(config);
  }

  private _cloneConfig(): CardConfig {
    return JSON.parse(JSON.stringify(this.config));
  }

  private _valueChanged(config: CardConfig): void {
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _updateField(key: string, value: unknown): void {
    const nextConfig = this._cloneConfig();
    const keys = key.split('.');
    let obj = nextConfig as unknown as Record<string, unknown>;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]] as Record<string, unknown>;
    }
    obj[keys[keys.length - 1]] = value;
    this.config = mergeConfig(nextConfig);
    this._valueChanged(this.config);
  }

  private _updateBadgeField(index: number, field: string, value: unknown): void {
    const badges = [...(this.config.badges || [])];
    if (!badges[index]) return;
    badges[index] = { ...badges[index], [field]: value } as CustomBadgeConfig;
    this._updateField('badges', badges);
  }

  private _updateBadgeArea(index: number, area: BadgeArea): void {
    const badges = [...(this.config.badges || [])];
    const badge = badges[index];
    if (!badge) return;
    badges[index] = {
      ...badge,
      area,
      position: area === 'on_vehicle' ? (badge.position || { top: 50, left: 50 }) : badge.position,
    };
    this._updateField('badges', badges);
  }

  private _addBadge(): void {
    const badges = [...(this.config.badges || [])];
    badges.push({
      id: makeBadgeId(),
      entity: '',
      area: 'below_vehicle',
      enabled: true,
    });
    this._updateField('badges', badges);
  }

  private _removeBadge(index: number): void {
    const badges = [...(this.config.badges || [])];
    badges.splice(index, 1);
    this._updateField('badges', badges);
  }

  private _applyEntityDefaults(index: number, entityId: string): void {
    const badges = [...(this.config.badges || [])];
    const badge = badges[index];
    if (!badge || !entityId) return;

    const state = this.hass?.states?.[entityId];
    if (!state) return;
    const attrs = state.attributes || {};
    const updated: Record<string, unknown> = {};
    if (!badge.name) {
      updated.name = attrs.friendly_name as string || '';
    }
    if (!badge.icon) {
      updated.icon = attrs.icon as string || '';
    }
    if (!badge.unit) {
      const dc = attrs.device_class as string;
      const uom = attrs.unit_of_measurement as string;
      if (uom) {
        updated.unit = uom;
      } else if (dc === 'temperature') {
        updated.unit = '°C';
      } else if (dc === 'voltage') {
        updated.unit = 'V';
      }
    }
    if (Object.keys(updated).length === 0) return;
    badges[index] = { ...badge, ...updated } as CustomBadgeConfig;
    this._updateField('badges', badges);
  }

  private _handleEntityChange(index: number, e: CustomEvent | Event): void {
    let value = '';
    if ('detail' in e) {
      value = e.detail?.value || '';
    } else {
      value = (e.target as HTMLInputElement).value;
    }
    this._updateBadgeField(index, 'entity', value);
    if (value) {
      this._applyEntityDefaults(index, value);
    }
  }

  private _renderBadgeCard(badge: CustomBadgeConfig, index: number): TemplateResult {
    const hasEntityPicker = customElements.get('ha-entity-picker') !== undefined;
    const isOnVehicle = badge.area === 'on_vehicle';
    const badgeLabel = badge.name || badge.entity || `Badge #${index + 1}`;
    const areaLabel = badge.area.replace('_', ' ');

    const onEntityChange = hasEntityPicker
      ? (e: CustomEvent) => this._handleEntityChange(index, e)
      : (e: Event) => this._handleEntityChange(index, e);

    return html`
      <div class="badge-row">
        <div class="badge-row-header">
          <label>
            <input
              type="checkbox"
              ?checked=${badge.enabled !== false}
              @change=${(e: Event) => this._updateBadgeField(index, 'enabled', (e.target as HTMLInputElement).checked)}
            />
            ${badgeLabel}
          </label>
          <button class="btn btn-danger" style="padding:4px 10px;font-size:11px;" @click=${() => this._removeBadge(index)}>Delete</button>
        </div>
        <div class="badge-summary">
          <span>ID: ${badge.id}</span>
          <span>Area: ${areaLabel}</span>
          <span>${badge.enabled !== false ? 'Visible' : 'Disabled'}</span>
        </div>
        <div class="badge-fields">
          <div class="field" style="flex:2;">
            <label class="field-label">Entity</label>
            ${hasEntityPicker ? html`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${badge.entity || ''}
                @value-changed=${onEntityChange}
              ></ha-entity-picker>
            ` : html`
              <input class="field-input" .value=${badge.entity || ''} @input=${onEntityChange} placeholder="sensor.xxx" />
            `}
          </div>
          <div class="field">
            <label class="field-label">Name</label>
            <input
              class="field-input"
              .value=${badge.name || ''}
              @input=${(e: InputEvent) => this._updateBadgeField(index, 'name', (e.target as HTMLInputElement).value)}
              placeholder="My Sensor"
            />
          </div>
          <div class="field">
            <label class="field-label">Icon</label>
            <input
              class="field-input"
              .value=${badge.icon || ''}
              @input=${(e: InputEvent) => this._updateBadgeField(index, 'icon', (e.target as HTMLInputElement).value)}
              placeholder="mdi:thermometer"
            />
          </div>
          <div class="field small">
            <label class="field-label">Unit</label>
            <input
              class="field-input"
              .value=${badge.unit || ''}
              @input=${(e: InputEvent) => this._updateBadgeField(index, 'unit', (e.target as HTMLInputElement).value)}
              placeholder="°C"
            />
          </div>
          <div class="field small">
            <label class="field-label">Precision</label>
            <input
              class="field-input"
              type="number"
              .value=${badge.precision ?? ''}
              @input=${(e: InputEvent) => this._updateBadgeField(index, 'precision', parseInt((e.target as HTMLInputElement).value) || undefined)}
              placeholder="1"
              min="0"
              max="5"
            />
          </div>
          <div class="field small">
            <label class="field-label">Area</label>
            <select class="field-select" @change=${(e: Event) => this._updateBadgeArea(index, (e.target as HTMLSelectElement).value as BadgeArea)}>
              <option value="on_vehicle" ?selected=${badge.area === 'on_vehicle'}>On vehicle</option>
              <option value="above_vehicle" ?selected=${badge.area === 'above_vehicle'}>Above vehicle</option>
              <option value="below_vehicle" ?selected=${badge.area === 'below_vehicle'}>Below vehicle</option>
            </select>
          </div>
        </div>
        ${isOnVehicle ? html`
          <div class="badge-fields">
            <span class="pos-label">Position: top ${badge.position?.top?.toFixed(1) ?? '50.0'}% · left ${badge.position?.left?.toFixed(1) ?? '50.0'}%</span>
            <button class="btn" style="padding:4px 10px;font-size:11px;" @click=${() => this._updateBadgeField(index, 'position', { top: 50, left: 50 })}>Reset to center</button>
          </div>
        ` : ''}
        <div class="badge-fields">
          <div class="checkbox-row">
            <input
              type="checkbox"
              ?checked=${badge.show_icon !== false}
              @change=${(e: Event) => this._updateBadgeField(index, 'show_icon', (e.target as HTMLInputElement).checked || undefined)}
              id="show_icon_${index}"
            />
            <label for="show_icon_${index}">Icon</label>
          </div>
          <div class="checkbox-row">
            <input
              type="checkbox"
              ?checked=${badge.show_name !== false}
              @change=${(e: Event) => this._updateBadgeField(index, 'show_name', (e.target as HTMLInputElement).checked || undefined)}
              id="show_name_${index}"
            />
            <label for="show_name_${index}">Name</label>
          </div>
          <div class="checkbox-row">
            <input
              type="checkbox"
              ?checked=${badge.show_unit !== false}
              @change=${(e: Event) => this._updateBadgeField(index, 'show_unit', (e.target as HTMLInputElement).checked || undefined)}
              id="show_unit_${index}"
            />
            <label for="show_unit_${index}">Unit</label>
          </div>
          <div class="checkbox-row">
            <input
              type="checkbox"
              ?checked=${badge.hide_unavailable === true}
              @change=${(e: Event) => this._updateBadgeField(index, 'hide_unavailable', (e.target as HTMLInputElement).checked || undefined)}
              id="hide_unavail_${index}"
            />
            <label for="hide_unavail_${index}">Hide unavailable</label>
          </div>
        </div>
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this.config) {
      return html`<div>Loading editor...</div>`;
    }

    const badges = this.config.badges || [];

    return html`
      <div class="editor-section">
        <h3>General</h3>
        <p class="section-note">Basic card identity and which vehicle image is used as the interaction surface.</p>
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
        <h3>Badges</h3>
        <p class="section-note">Each badge maps one entity into the dashboard. Use on-vehicle area for overlay badges and the other areas for quick-glance chips.</p>
        <div class="btn-row">
          <button class="btn" @click=${this._addBadge}>Add badge</button>
        </div>
        ${badges.length === 0 ? html`
          <div class="note">No badges configured. Click "Add badge" to add sensors.</div>
        ` : ''}
        ${badges.map((badge, i) => this._renderBadgeCard(badge, i))}
        <div class="note" style="margin-top:8px;">
          Enable "Edit badge positions" in Display, drag an on-vehicle badge, and release it to save the coordinates.
        </div>
        ${this.config.display?.edit_positions ? html`
          <div class="mode-callout">
            <strong>Position editor is armed.</strong>
            The next drag on the live card saves the new badge coordinates and then automatically exits edit mode.
          </div>
        ` : ''}
      </div>

      <div class="editor-section">
        <h3>Map</h3>
        <p class="section-note">Choose either a tracker entity or explicit latitude and longitude entities for the map panel.</p>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Device Tracker Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.device_tracker || ''}
              @input=${(e: InputEvent) => this._updateField('map.device_tracker', (e.target as HTMLInputElement).value)}
              placeholder="device_tracker.xxx"
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
            <label class="field-label">Course Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.course_entity || ''}
              @input=${(e: InputEvent) => this._updateField('map.course_entity', (e.target as HTMLInputElement).value)}
              placeholder="sensor.location_course"
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
        <p class="section-note">Global display rules apply to all badges unless a badge overrides them.</p>
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
            <select class="field-select" @change=${(e: Event) => this._updateField('display.theme_mode', (e.target as HTMLSelectElement).value)}>
              <option value="auto" ?selected=${(this.config.display?.theme_mode || 'auto') === 'auto'}>Auto</option>
              <option value="light" ?selected=${this.config.display?.theme_mode === 'light'}>Light</option>
              <option value="dark" ?selected=${this.config.display?.theme_mode === 'dark'}>Dark</option>
            </select>
          </div>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${this.config.display?.edit_positions === true}
            @change=${(e: Event) => this._updateField('display.edit_positions', (e.target as HTMLInputElement).checked)}
            id="edit_positions"
          />
          <label for="edit_positions">Edit badge positions (drag to move)</label>
        </div>
      </div>
    `;
  }
}

if (!window.customElements.get(EDITOR_NAME)) {
  window.customElements.define(EDITOR_NAME, HavalH3Editor);
}
