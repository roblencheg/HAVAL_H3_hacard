import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { MapConfig } from '../types';

interface HassEntity {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HassState {
  states: Record<string, HassEntity>;
}

export class MapPanel extends LitElement {
  @property({ attribute: false }) mapConfig!: MapConfig;
  @property({ attribute: false }) hass!: HassState;
  @property({ attribute: false }) title: string = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      min-height: 400px;
    }
    .map-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      overflow: hidden;
      background: var(--map-panel-bg, var(--card-background-color, #1a1a2e));
      position: relative;
    }
    .map-container {
      flex: 1;
      position: relative;
      min-height: 300px;
    }
    .map-container ha-map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .summary-panel {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 12px;
      background: var(--map-summary-bg, rgba(0, 0, 0, 0.3));
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 0 0 12px 12px;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--primary-text-color, #fff);
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--summary-chip-bg, rgba(255, 255, 255, 0.08));
    }
    .summary-item ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }
    .summary-label {
      opacity: 0.6;
    }
    .summary-value {
      font-weight: 600;
    }
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #888);
      gap: 12px;
      padding: 40px;
      text-align: center;
    }
    .placeholder ha-icon {
      width: 48px;
      height: 48px;
      --mdc-icon-size: 48px;
    }
    .placeholder code {
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }
    .map-title {
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color, #fff);
      background: var(--card-background-color, transparent);
      border-radius: 8px;
      margin-bottom: 4px;
    }
  `;

  private getTrackerEntityId(): string | null {
    return this.mapConfig.device_tracker || null;
  }

  private getLatLon(): { lat: number; lon: number } | null {
    const tracker = this.getTrackerEntityId();
    if (tracker && this.hass.states[tracker]) {
      const s = this.hass.states[tracker];
      const lat = s.attributes?.latitude as number | undefined;
      const lon = s.attributes?.longitude as number | undefined;
      if (lat != null && lon != null) return { lat, lon };
    }

    const latEntity = this.mapConfig.latitude_entity;
    const lonEntity = this.mapConfig.longitude_entity;
    if (latEntity && lonEntity) {
      const latState = this.hass.states[latEntity];
      const lonState = this.hass.states[lonEntity];
      if (latState && lonState) {
        const lat = parseFloat(latState.state);
        const lon = parseFloat(lonState.state);
        if (!isNaN(lat) && !isNaN(lon)) return { lat, lon };
      }
    }

    return null;
  }

  private getSpeed(): string | null {
    if (this.mapConfig.speed_entity && this.hass.states[this.mapConfig.speed_entity]) {
      return this.hass.states[this.mapConfig.speed_entity].state;
    }
    const trackerId = this.getTrackerEntityId();
    if (trackerId && this.hass.states[trackerId]) {
      const speed = this.hass.states[trackerId].attributes?.speed;
      if (speed != null) return String(speed);
    }
    return null;
  }

  private getCourse(): string | null {
    if (this.mapConfig.course_entity && this.hass.states[this.mapConfig.course_entity]) {
      return this.hass.states[this.mapConfig.course_entity].state;
    }
    const trackerId = this.getTrackerEntityId();
    if (trackerId && this.hass.states[trackerId]) {
      const course = this.hass.states[trackerId].attributes?.course;
      if (course != null) return String(course);
    }
    return null;
  }

  private getLastUpdate(): string | null {
    if (this.mapConfig.updated_entity && this.hass.states[this.mapConfig.updated_entity]) {
      const state = this.hass.states[this.mapConfig.updated_entity];
      if (state.attributes?.device_class === 'timestamp') {
        const ts = new Date(state.state);
        return isNaN(ts.getTime()) ? state.state : ts.toLocaleTimeString();
      }
      return state.state;
    }
    return null;
  }

  private hasMapData(): boolean {
    return !!this.getTrackerEntityId() || !!(this.mapConfig.latitude_entity && this.mapConfig.longitude_entity);
  }

  render(): TemplateResult {
    const hasData = this.hasMapData();
    const latlon = this.getLatLon();
    const speed = this.getSpeed();
    const course = this.getCourse();
    const lastUpdate = this.getLastUpdate();

    const mapEntities: string[] = [];
    const trackerId = this.getTrackerEntityId();
    if (trackerId) mapEntities.push(trackerId);
    if (this.mapConfig.latitude_entity && this.mapConfig.longitude_entity) {
      mapEntities.push(this.mapConfig.latitude_entity, this.mapConfig.longitude_entity);
    }

    return html`
      ${this.title ? html`<div class="map-title">${this.title}</div>` : ''}
      <div class="map-wrapper">
        <div class="map-container">
          ${hasData && latlon ? html`
            <ha-map
              .entities=${mapEntities}
              .hass=${this.hass}
              ?auto-fit=${false}
              zoom=${this.mapConfig.zoom || 15}
            ></ha-map>
          ` : html`
            <div class="placeholder">
              <ha-icon icon="mdi:map-marker-off"></ha-icon>
              <div>
                ${!hasData
                  ? html`No map data configured.<br>Configure <code>device_tracker</code> or <code>latitude_entity</code> + <code>longitude_entity</code>.`
                  : html`Location unknown.<br>Waiting for GPS data...`}
              </div>
            </div>
          `}
        </div>
        ${hasData ? html`
          <div class="summary-panel">
            ${speed != null ? html`
              <div class="summary-item">
                <ha-icon icon="mdi:speedometer"></ha-icon>
                <span class="summary-label">Speed</span>
                <span class="summary-value">${speed} km/h</span>
              </div>
            ` : ''}
            ${course != null ? html`
              <div class="summary-item">
                <ha-icon icon="mdi:compass"></ha-icon>
                <span class="summary-label">Course</span>
                <span class="summary-value">${course}°</span>
              </div>
            ` : ''}
            ${lastUpdate != null ? html`
              <div class="summary-item">
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="summary-label">Updated</span>
                <span class="summary-value">${lastUpdate}</span>
              </div>
            ` : ''}
            ${latlon ? html`
              <div class="summary-item">
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                <span class="summary-label">GPS</span>
                <span class="summary-value">${latlon.lat.toFixed(4)}, ${latlon.lon.toFixed(4)}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('map-panel', MapPanel);
