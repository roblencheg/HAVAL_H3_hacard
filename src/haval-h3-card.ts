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
      gap: 12px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 18px;
      background: transparent;
    }
    .card-shell.is-editing {
      box-shadow: 0 0 0 1px rgba(72, 192, 255, 0.16);
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: var(--primary-text-color, #fff);
    }
    .edit-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(72, 192, 255, 0.08);
      color: rgba(228, 245, 255, 0.92);
      font-size: 12px;
      line-height: 1.4;
    }
    .edit-banner strong {
      color: #fff;
    }
    .card-content {
      display: grid;
      grid-template-columns: minmax(0, var(--left-column, 50%)) minmax(360px, var(--right-column, 50%));
      gap: 12px;
      min-height: 0;
      flex: 1;
      width: 100%;
      align-items: stretch;
    }
    .panel-shell {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
    }
    .panel-shell.map-column {
      min-width: 360px;
    }
    .panel-shell > * {
      flex: 1 1 auto;
      width: 100%;
      min-width: 0;
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
        padding: 8px;
      }
      .card-title {
        font-size: 16px;
      }
      .card-content {
        grid-template-columns: minmax(0, 1fr);
      }
      .panel-shell.map-column {
        min-width: 0;
      }
    }

    @media (max-height: 500px) {
      .card-shell {
        padding: 6px;
        gap: 8px;
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
    const editMode = this.config.display?.edit_positions === true;
    const vehicleName = this.config.vehicle?.name || this.config.title || 'Haval H3';
    const dashboardTitle = this.config.title || vehicleName;
    const totalWidth = Math.max(leftWidth + rightWidth, 1);
    const normalizedLeft = (leftWidth / totalWidth) * 100;
    const normalizedRight = (rightWidth / totalWidth) * 100;
    const rootStyle = `--left-column:${normalizedLeft}%; --right-column:${normalizedRight}%;`;

    return html`
      <div class="card-shell${editMode ? ' is-editing' : ''}" style=${rootStyle}>
        ${this.config.title ? html`<h2 class="card-title">${dashboardTitle}</h2>` : ''}
        ${editMode ? html`
          <div class="edit-banner">
            <strong>Edit mode.</strong>
            Drag a badge and release to save its position.
          </div>
        ` : ''}
        <div class="card-content">
          <section class="panel-shell vehicle-column">
            <vehicle-panel
              .config=${this.config}
              .hass=${this.hass}
              @badge-position-changed=${this._handleBadgePositionChanged}
            ></vehicle-panel>
          </section>
          <section class="panel-shell map-column">
            <map-panel
              .mapConfig=${this.config.map || {}}
              .hass=${this.hass}
              .title=${''}
            ></map-panel>
          </section>
        </div>
      </div>
    `;
  }
}
