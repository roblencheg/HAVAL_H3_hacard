import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, DEFAULT_IMAGE } from './types';
import { CARD_NAME, CARD_VERSION } from './const';
import { mergeConfig, validateConfig } from './utils/config-schema';
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
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }
    .card-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 12px;
      box-sizing: border-box;
      gap: 12px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color, #fff);
      padding: 0 4px;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .card-content {
      display: flex;
      flex-direction: row;
      flex: 1;
      gap: 12px;
      min-height: 0;
      overflow: hidden;
    }
    .left-panel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      display: flex;
    }
    .right-panel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      display: flex;
    }
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    @media (max-width: 768px) {
      .card-content {
        flex-direction: column;
      }
      .left-panel, .right-panel {
        flex: none;
        height: 50%;
      }
    }

    @media (max-height: 500px) {
      .card-container {
        padding: 4px;
        gap: 4px;
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
      vehicle_image: DEFAULT_IMAGE,
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

  getCardSize(): number {
    return 5;
  }

  render(): TemplateResult {
    if (this.error) {
      return html`<div class="error">Configuration error: ${this.errorMessage}</div>`;
    }

    const leftWidth = this.config.layout?.left_width ?? 50;
    const rightWidth = this.config.layout?.right_width ?? 50;

    return html`
      <div class="card-container">
        ${this.config.title ? html`<div class="card-title">${this.config.title}</div>` : ''}
        <div class="card-content">
          <div class="left-panel" style="flex: ${leftWidth}; max-width: ${leftWidth}%">
            <vehicle-panel
              .config=${this.config}
              .hass=${this.hass}
            ></vehicle-panel>
          </div>
          <div class="right-panel" style="flex: ${rightWidth}; max-width: ${rightWidth}%">
            <map-panel
              .mapConfig=${this.config.map || {}}
              .hass=${this.hass}
              .title=${'Location'}
            ></map-panel>
          </div>
        </div>
      </div>
    `;
  }
}
