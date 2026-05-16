import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, ResolvedEntity, DisplayConfig } from '../types';
import { resolveEntity, showEntity } from '../utils/entity-resolver';
import { mergeConfig } from '../utils/config-schema';
import { DEFAULT_VEHICLE_IMAGE } from '../generated/default-image';
import './overlay-badge';

interface HassEntity {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HassState {
  states: Record<string, HassEntity>;
}

export class VehiclePanel extends LitElement {
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) hass!: HassState;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      background: var(--vehicle-panel-bg, transparent);
      min-height: 400px;
    }
    .image-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
    }
      .vehicle-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }
    .overlay-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .overlay-container > * {
      pointer-events: auto;
    }
    .debug-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.3;
    }
    .debug-grid-line-h,
    .debug-grid-line-v {
      position: absolute;
      background: rgba(255, 0, 0, 0.5);
    }
    .debug-grid-line-h {
      left: 0;
      right: 0;
      height: 1px;
    }
    .debug-grid-line-v {
      top: 0;
      bottom: 0;
      width: 1px;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      text-align: center;
    }
    .no-image.hidden {
      display: none;
    }
    .no-image ha-icon {
      width: 48px;
      height: 48px;
      --mdc-icon-size: 48px;
    }
    .vehicle-title {
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

  getResolvedEntities(): ResolvedEntity[] {
    const merged = mergeConfig(this.config as unknown as Partial<CardConfig>);
    const entities = merged.entities;
    const display = merged.display!;
    if (!entities) return [];

    const resolved: ResolvedEntity[] = [];
    for (const [_key, ent] of Object.entries(entities)) {
      const resolvedEntity = resolveEntity(this.hass as any, ent, display);
      if (showEntity(resolvedEntity, display)) {
        resolved.push(resolvedEntity);
      }
    }
    return resolved;
  }

  render(): TemplateResult {
    const showDefault = this.config.vehicle?.show_default_image !== false;
    const imgSrc = this.config.vehicle_image || '';
    const hasImage = showDefault && imgSrc;
    const isDebug = this.config.display?.debug_positions;

    const debugGridLines = [];
    if (isDebug) {
      for (let i = 0; i <= 10; i++) {
        const pct = i * 10;
        debugGridLines.push(
          html`<div class="debug-grid-line-h" style="top: ${pct}%"></div>`,
          html`<div class="debug-grid-line-v" style="left: ${pct}%"></div>`,
        );
      }
    }

    const handleImgError = (e: Event) => {
      const target = e.target as HTMLImageElement;
      const currentSrc = target.currentSrc || target.src;
      if (currentSrc !== DEFAULT_VEHICLE_IMAGE) {
        target.src = DEFAULT_VEHICLE_IMAGE;
      } else {
        target.style.display = 'none';
        target.parentElement?.querySelector('.no-image')?.classList.remove('hidden');
      }
    };

    return html`
      ${this.config.vehicle?.name ? html`<div class="vehicle-title">${this.config.vehicle.name}</div>` : ''}
      <div class="image-container">
        ${hasImage ? html`
          <img class="vehicle-img" src="${imgSrc}" alt="${this.config.vehicle?.name || 'Vehicle'}" 
               @error=${handleImgError} />
          <div class="no-image hidden">
            <ha-icon icon="mdi:car-side"></ha-icon>
            <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
          </div>
          <div class="overlay-container">
            ${isDebug ? html`<div class="debug-grid">${debugGridLines}</div>` : ''}
            ${this.getResolvedEntities().map((entity) => html`
              <overlay-badge
                .entity=${entity}
                .entityConfig=${entity.config}
                .display=${this.config.display || {}}
                .cardConfig=${this.config}
              ></overlay-badge>
            `)}
          </div>
        ` : html`
          <div class="no-image">
            <ha-icon icon="mdi:car-side"></ha-icon>
            <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
          </div>
        `}
      </div>
    `;
  }
}

customElements.define('vehicle-panel', VehiclePanel);
