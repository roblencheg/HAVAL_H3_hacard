import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, ResolvedEntity, DisplayConfig, PositionConfig } from '../types';
import { resolveEntity, showEntity } from '../utils/entity-resolver';
import { mergeConfig } from '../utils/config-schema';
import { SENSOR_PRESETS_BY_KEY } from '../sensor-presets';
import { DEFAULT_VEHICLE_IMAGE } from '../generated/default-image';
import { clampPercentage } from '../utils/position-resolver';
import './overlay-badge';
import './summary-panel';

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

  private _draggingKey?: string;
  private _previewPositions: Record<string, { top: number; left: number }> = {};

  private _boundPointerMove = this._handleWindowPointerMove.bind(this);
  private _boundPointerUp = this._handleWindowPointerUp.bind(this);

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeDragListeners();
  }

  private _removeDragListeners(): void {
    window.removeEventListener('pointermove', this._boundPointerMove);
    window.removeEventListener('pointerup', this._boundPointerUp);
  }

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
    .image-stage {
      position: relative;
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }
    .vehicle-img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }
    .overlay-container {
      position: absolute;
      inset: 0;
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
    for (const [key, ent] of Object.entries(entities)) {
      const renderArea = ent.render_area || SENSOR_PRESETS_BY_KEY.get(key)?.render_area;
      if (renderArea && renderArea !== 'vehicle') continue;
      const resolvedEntity = resolveEntity(this.hass as any, ent, display);
      if (showEntity(resolvedEntity, display)) {
        resolved.push({ ...resolvedEntity, key });
      }
    }
    return resolved;
  }

  getSummaryEntities(): ResolvedEntity[] {
    const merged = mergeConfig(this.config as unknown as Partial<CardConfig>);
    const entities = merged.entities;
    const display = merged.display!;
    if (!entities) return [];

    const resolved: ResolvedEntity[] = [];
    for (const [_key, ent] of Object.entries(entities)) {
      const renderArea = ent.render_area || SENSOR_PRESETS_BY_KEY.get(_key)?.render_area;
      if (renderArea !== 'summary') continue;
      const resolvedEntity = resolveEntity(this.hass as any, ent, display);
      if (showEntity(resolvedEntity, display)) {
        resolved.push(resolvedEntity);
      }
    }
    return resolved;
  }

  private _handleBadgeDragStart(ev: CustomEvent): void {
    this._draggingKey = ev.detail.key;
    window.addEventListener('pointermove', this._boundPointerMove);
    window.addEventListener('pointerup', this._boundPointerUp);
  }

  private _handleWindowPointerMove(ev: PointerEvent): void {
    if (!this._draggingKey) return;
    const overlay = this.renderRoot.querySelector('.overlay-container') as HTMLElement | null;
    if (!overlay) return;

    const rect = overlay.getBoundingClientRect();
    const left = clampPercentage(((ev.clientX - rect.left) / rect.width) * 100);
    const top = clampPercentage(((ev.clientY - rect.top) / rect.height) * 100);

    this._previewPositions[this._draggingKey] = { top, left };
    this.requestUpdate();
  }

  private _handleWindowPointerUp(ev: PointerEvent): void {
    if (!this._draggingKey) return;
    const overlay = this.renderRoot.querySelector('.overlay-container') as HTMLElement | null;
    if (overlay) {
      const rect = overlay.getBoundingClientRect();
      const left = clampPercentage(((ev.clientX - rect.left) / rect.width) * 100);
      const top = clampPercentage(((ev.clientY - rect.top) / rect.height) * 100);

      this.dispatchEvent(new CustomEvent('badge-position-changed', {
        detail: { key: this._draggingKey, custom_position: { top, left } },
        bubbles: true,
        composed: true,
      }));
    }

    delete this._previewPositions[this._draggingKey];
    this._draggingKey = undefined;
    this._removeDragListeners();
    this.requestUpdate();
  }

  render(): TemplateResult {
    const showDefault = this.config.vehicle?.show_default_image !== false;
    const imgSrc = this.config.vehicle_image || '';
    const hasImage = showDefault && imgSrc;
    const isDebug = this.config.display?.debug_positions;
    const editMode = this.config.display?.edit_positions === true;

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

    const vehicleEntities = this.getResolvedEntities();
    const positionGroups = new Map<string, ResolvedEntity[]>();
    for (const entity of vehicleEntities) {
      const pos = entity.config.position || 'default';
      if (!positionGroups.has(pos)) positionGroups.set(pos, []);
      positionGroups.get(pos)!.push(entity);
    }

    return html`
      ${this.config.vehicle?.name ? html`<div class="vehicle-title">${this.config.vehicle.name}</div>` : ''}
      <div class="image-container">
        ${hasImage ? html`
          <div class="image-stage">
            <img class="vehicle-img" src="${imgSrc}" alt="${this.config.vehicle?.name || 'Vehicle'}" 
                 @error=${handleImgError} />
            <div class="no-image hidden">
              <ha-icon icon="mdi:car-side"></ha-icon>
              <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
            </div>
            <div class="overlay-container" @badge-drag-start=${this._handleBadgeDragStart}>
              ${isDebug ? html`<div class="debug-grid">${debugGridLines}</div>` : ''}
              ${Array.from(positionGroups.entries()).map(([_pos, entities]) => {
                const count = entities.length;
                return entities.map((entity, idx) => {
                  const entityKey = entity.key || '';
                  const preview = this._previewPositions[entityKey];
                  const effectiveConfig = preview
                    ? { ...entity.config, custom_position: preview as PositionConfig }
                    : entity.config;
                  return html`
                    <overlay-badge
                      .entity=${entity}
                      .entityKey=${entityKey}
                      .editable=${editMode}
                      .entityConfig=${effectiveConfig}
                      .display=${this.config.display || {}}
                      .cardConfig=${this.config}
                      .collisionIndex=${idx}
                      .collisionCount=${count}
                    ></overlay-badge>
                  `;
                });
              })}
            </div>
          </div>
        ` : html`
          <div class="no-image">
            <ha-icon icon="mdi:car-side"></ha-icon>
            <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
          </div>
        `}
      </div>
      <summary-panel
        .entities=${this.getSummaryEntities()}
        .display=${this.config.display || {}}
      ></summary-panel>
    `;
  }
}

customElements.define('vehicle-panel', VehiclePanel);
