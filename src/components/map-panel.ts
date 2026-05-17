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
      border-radius: 18px;
      min-height: 400px;
    }
    .map-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
      border-radius: 18px;
      overflow: hidden;
      background:
        radial-gradient(circle at top right, rgba(71, 132, 175, 0.16), transparent 30%),
        linear-gradient(180deg, rgba(13, 24, 35, 0.82), rgba(8, 15, 22, 0.92));
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.06);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .map-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .map-title-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .map-title {
      margin: 0;
      font-size: 18px;
      font-weight: 650;
      color: #fff;
      letter-spacing: -0.02em;
    }
    .map-subtitle {
      margin: 0;
      font-size: 12px;
      line-height: 1.4;
      color: rgba(208, 220, 233, 0.72);
    }
    .map-state {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.04);
      color: rgba(234, 241, 248, 0.9);
      font-size: 12px;
      white-space: nowrap;
    }
    .map-container {
      flex: 1;
      position: relative;
      min-height: 300px;
      overflow: hidden;
      border-radius: 16px;
      background: rgba(6, 11, 18, 0.44);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .map-container ha-map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .summary-panel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 12px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      background: rgba(255, 255, 255, 0.045);
      color: var(--primary-text-color, #fff);
      min-height: 88px;
    }
    .summary-item-top {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: rgba(198, 214, 229, 0.78);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .summary-item ha-icon {
      width: 16px;
      height: 16px;
      --mdc-icon-size: 16px;
    }
    .summary-value {
      font-weight: 700;
      font-size: 16px;
      line-height: 1.25;
      color: #fff;
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
      background:
        radial-gradient(circle at top, rgba(72, 192, 255, 0.08), transparent 36%),
        rgba(5, 10, 16, 0.3);
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
    const heading = this.title || 'Map';
    const hasLiveLocation = hasData && latlon;

    const mapEntities: string[] = [];
    const trackerId = this.getTrackerEntityId();
    if (trackerId) mapEntities.push(trackerId);
    if (this.mapConfig.latitude_entity && this.mapConfig.longitude_entity) {
      mapEntities.push(this.mapConfig.latitude_entity, this.mapConfig.longitude_entity);
    }

    return html`
      <div class="map-wrapper">
        <div class="map-header">
          <div class="map-title-block">
            <h3 class="map-title">${heading}</h3>
            <p class="map-subtitle">
              ${hasLiveLocation
                ? 'Live vehicle position with quick trip context.'
                : hasData
                  ? 'Map source is configured, waiting for fresh coordinates.'
                  : 'Connect a tracker or explicit latitude/longitude entities.'}
            </p>
          </div>
          <div class="map-state">${hasLiveLocation ? 'Live GPS signal' : hasData ? 'Waiting for GPS' : 'Map not configured'}</div>
        </div>
        <div class="map-container">
          ${hasLiveLocation ? html`
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
                <div class="summary-item-top">
                  <ha-icon icon="mdi:speedometer"></ha-icon>
                  <span>Speed</span>
                </div>
                <span class="summary-value">${speed} km/h</span>
              </div>
            ` : ''}
            ${course != null ? html`
              <div class="summary-item">
                <div class="summary-item-top">
                  <ha-icon icon="mdi:compass"></ha-icon>
                  <span>Course</span>
                </div>
                <span class="summary-value">${course}°</span>
              </div>
            ` : ''}
            ${lastUpdate != null ? html`
              <div class="summary-item">
                <div class="summary-item-top">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  <span>Updated</span>
                </div>
                <span class="summary-value">${lastUpdate}</span>
              </div>
            ` : ''}
            ${latlon ? html`
              <div class="summary-item">
                <div class="summary-item-top">
                  <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                  <span>GPS</span>
                </div>
                <span class="summary-value">${latlon.lat.toFixed(4)}, ${latlon.lon.toFixed(4)}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

if (!window.customElements.get('map-panel')) {
  window.customElements.define('map-panel', MapPanel);
}
