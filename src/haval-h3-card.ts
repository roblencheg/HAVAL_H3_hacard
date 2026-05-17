import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig } from './types';
import { CARD_NAME, CARD_VERSION } from './const';
import { mergeConfig, validateConfig, updateBadgePosition } from './utils/config-schema';
import './components/vehicle-panel';
import './components/map-panel';

interface HassEntity {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HassState {
  states: Record<string, HassEntity>;
}

interface HomeAssistant {
  states: Record<string, HassEntity>;
  [key: string]: unknown;
}

export class HavalH3Card extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CardConfig;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) errorMessage = '';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--font-family, 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, sans-serif);
      color: var(--primary-text-color, #f4f7fb);
    }
    .card-shell {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 14px;
      padding: 16px;
      box-sizing: border-box;
      border-radius: 26px;
      border: 1px solid rgba(125, 152, 179, 0.18);
      background:
        radial-gradient(circle at top left, rgba(65, 92, 122, 0.34), transparent 42%),
        radial-gradient(circle at top right, rgba(18, 137, 167, 0.18), transparent 28%),
        linear-gradient(180deg, rgba(15, 23, 34, 0.96), rgba(10, 17, 26, 0.94));
      box-shadow:
        0 16px 34px rgba(0, 0, 0, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .card-shell.is-editing {
      border-color: rgba(72, 192, 255, 0.36);
      box-shadow:
        0 18px 36px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(72, 192, 255, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }
    .hero {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .hero-copy {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(146, 175, 205, 0.78);
    }
    .card-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      line-height: 1.1;
      letter-spacing: -0.04em;
      color: var(--primary-text-color, #fff);
    }
    .hero-subtitle {
      margin: 0;
      max-width: 760px;
      color: rgba(214, 224, 236, 0.76);
      font-size: 13px;
      line-height: 1.5;
    }
    .hero-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.04);
      color: rgba(234, 242, 251, 0.88);
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .pill strong {
      font-weight: 700;
      color: #fff;
    }
    .pill.editing {
      border-color: rgba(72, 192, 255, 0.32);
      background: rgba(72, 192, 255, 0.12);
      color: #d8f3ff;
    }
    .edit-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 18px;
      border: 1px solid rgba(72, 192, 255, 0.2);
      background: linear-gradient(135deg, rgba(31, 98, 137, 0.28), rgba(19, 39, 58, 0.38));
      color: rgba(228, 245, 255, 0.92);
      font-size: 13px;
      line-height: 1.45;
    }
    .edit-banner strong {
      color: #fff;
    }
    .card-content {
      display: grid;
      grid-template-columns: minmax(0, var(--left-column, 1fr)) minmax(0, var(--right-column, 1fr));
      gap: 14px;
      min-height: 0;
      flex: 1;
    }
    .panel-shell {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      padding: 14px;
      gap: 12px;
      border-radius: 22px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
        rgba(7, 14, 22, 0.5);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .panel-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .panel-kicker {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(143, 171, 199, 0.72);
    }
    .panel-title {
      margin: 0;
      font-size: 18px;
      font-weight: 650;
      color: #fff;
      letter-spacing: -0.02em;
    }
    .panel-caption {
      margin: 0;
      color: rgba(211, 221, 232, 0.68);
      font-size: 12px;
      line-height: 1.45;
    }
    .panel-body {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.12);
      border-radius: 24px;
      padding: 20px;
      text-align: center;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    @media (max-width: 768px) {
      .card-shell {
        padding: 14px;
        border-radius: 22px;
      }
      .hero {
        gap: 12px;
      }
      .card-title {
        font-size: 21px;
      }
      .card-content {
        grid-template-columns: minmax(0, 1fr);
      }
      .panel-shell {
        padding: 12px;
      }
    }

    @media (max-height: 500px) {
      .card-shell {
        padding: 10px;
        gap: 10px;
      }
    }
  `;

  static async getConfigElement(): Promise<HTMLElement> {
    await import('./editor');
    return document.createElement('haval-h3-dashboard-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      title: 'Haval H3',
      layout: { left_width: 50, right_width: 50 },
      map: {
        device_tracker: '',
      },
      entities: {},
      display: {
        show_icons: true,
        show_labels: true,
        show_units: true,
        hide_unavailable: true,
        hide_disabled: true,
        status_color_rules: true,
        theme_mode: 'auto',
      },
    };
  }

  setConfig(config: Partial<CardConfig>): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    try {
      this.config = mergeConfig(config);
      const warnings = validateConfig(this.config);
      if (warnings.length > 0) {
        import('home-assistant-js-websocket').then(() => {
          console.warn(`[${CARD_NAME}] ${warnings.join('; ')}`);
        });
      }
      this.error = false;
    } catch (e) {
      this.error = true;
      this.errorMessage = e instanceof Error ? e.message : 'Unknown error';
    }
  }

  private _handleBadgePositionChanged(ev: CustomEvent): void {
    const { id, position } = ev.detail || {};
    if (!id || !position) return;

    const config = JSON.parse(JSON.stringify(this.config));
    config.badges = updateBadgePosition(config, id, position);
    config.display = {
      ...(config.display || {}),
      edit_positions: false,
    };

    this.config = mergeConfig(config);

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  getCardSize(): number {
    return 5;
  }

  render(): TemplateResult {
    if (this.error) {
      return html`<div class="error">Configuration error: ${this.errorMessage}</div>`;
    }

    const leftWidth = this.config.layout?.left_width ?? 50;
    const rightWidth = this.config.layout?.right_width ?? 50;
    const badgeCount = (this.config.badges || []).filter((badge) => badge.enabled !== false).length;
    const editMode = this.config.display?.edit_positions === true;
    const mapReady = !!(this.config.map?.device_tracker || (this.config.map?.latitude_entity && this.config.map?.longitude_entity));
    const vehicleName = this.config.vehicle?.name || this.config.title || 'Haval H3';
    const dashboardTitle = this.config.title || vehicleName;
    const rootStyle = `--left-column:${leftWidth}; --right-column:${rightWidth};`;

    return html`
      <div class="card-shell${editMode ? ' is-editing' : ''}" style=${rootStyle}>
        <div class="hero">
          <div class="hero-copy">
            <div class="eyebrow">Vehicle Dashboard</div>
            <h2 class="card-title">${dashboardTitle}</h2>
            <p class="hero-subtitle">
              ${vehicleName} overview with live vehicle overlays, clearer sensor grouping, and a dedicated map surface.
            </p>
          </div>
          <div class="hero-pills">
            <span class="pill"><strong>${badgeCount}</strong> active badges</span>
            <span class="pill"><strong>${leftWidth}/${rightWidth}</strong> layout split</span>
            <span class="pill"><strong>${mapReady ? 'Ready' : 'Waiting'}</strong> map</span>
            <span class="pill${editMode ? ' editing' : ''}">
              <strong>${editMode ? 'Editing positions' : 'Live layout'}</strong>
            </span>
          </div>
        </div>
        ${editMode ? html`
          <div class="edit-banner">
            <strong>Position edit mode is active.</strong>
            Drag a badge on the vehicle image and release it to save. After the next drop, editing turns off automatically to prevent accidental moves.
          </div>
        ` : ''}
        <div class="card-content">
          <section class="panel-shell">
            <div class="panel-meta">
              <div class="panel-kicker">Vehicle</div>
              <h3 class="panel-title">Sensor overlay</h3>
              <p class="panel-caption">Key vehicle entities stay anchored to the image for faster visual scanning.</p>
            </div>
            <div class="panel-body">
              <vehicle-panel
                .config=${this.config}
                .hass=${this.hass}
                @badge-position-changed=${this._handleBadgePositionChanged}
              ></vehicle-panel>
            </div>
          </section>
          <section class="panel-shell">
            <div class="panel-meta">
              <div class="panel-kicker">Location</div>
              <h3 class="panel-title">Trip map</h3>
              <p class="panel-caption">GPS, speed, course, and freshness are grouped into a single map workspace.</p>
            </div>
            <div class="panel-body">
              <map-panel
                .mapConfig=${this.config.map || {}}
                .hass=${this.hass}
                .title=${'Vehicle location'}
              ></map-panel>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
