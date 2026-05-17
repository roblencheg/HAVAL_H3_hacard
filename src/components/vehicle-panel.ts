import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, CustomBadgeConfig } from '../types';
import { DEFAULT_VEHICLE_IMAGE } from '../generated/default-image';
import { clampPercentage } from '../utils/position-resolver';
import './custom-badge';

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

  private _draggingId?: string;
  private _previewPositions: Record<string, { top: number; left: number }> = {};
  private _imageBox: { left: number; top: number; width: number; height: number } | null = null;
  private _resizeObserver: ResizeObserver | null = null;

  private _boundPointerMove = this._handleWindowPointerMove.bind(this);
  private _boundPointerUp = this._handleWindowPointerUp.bind(this);
  private _boundPointerCancel = this._handleWindowPointerCancel.bind(this);

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._removeDragListeners();
  }

  firstUpdated(): void {
    this._setupImageObserver();
  }

  private _removeDragListeners(): void {
    window.removeEventListener('pointermove', this._boundPointerMove);
    window.removeEventListener('pointerup', this._boundPointerUp);
    window.removeEventListener('pointercancel', this._boundPointerCancel);
  }

  private _setupImageObserver(): void {
    const stage = this.renderRoot.querySelector('.image-stage') as HTMLElement | null;
    if (!stage) return;
    this._resizeObserver = new ResizeObserver(() => this._updateImageBox());
    this._resizeObserver.observe(stage);
    const img = this.renderRoot.querySelector('.vehicle-img') as HTMLImageElement | null;
    if (img) {
      this._resizeObserver.observe(img);
    }
  }

  private _updateImageBox(): void {
    const stage = this.renderRoot.querySelector('.image-stage') as HTMLElement | null;
    const img = this.renderRoot.querySelector('.vehicle-img') as HTMLImageElement | null;
    if (!stage || !img) {
      this._imageBox = null;
      return;
    }
    const stageRect = stage.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    this._imageBox = {
      left: imgRect.left - stageRect.left,
      top: imgRect.top - stageRect.top,
      width: imgRect.width,
      height: imgRect.height,
    };
  }

  private _getBadgesByArea(area: CustomBadgeConfig['area']): CustomBadgeConfig[] {
    return (this.config.badges || []).filter(b => b.area === area && b.enabled !== false);
  }

  private _getResolvedState(badge: CustomBadgeConfig): HassEntity | null {
    if (!badge.entity || !this.hass?.states) return null;
    const entityId = badge.entity;
    if (!entityId.includes('.')) return null;
    return this.hass.states[entityId] || null;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      background: transparent;
      min-height: 400px;
    }
    .mode-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      padding: 8px 10px;
      border-radius: 12px;
      background: rgba(72, 192, 255, 0.08);
      color: rgba(224, 244, 255, 0.92);
      font-size: 12px;
      line-height: 1.4;
    }
    .mode-banner strong {
      color: #fff;
      font-weight: 700;
    }
    .mode-banner span {
      color: rgba(210, 229, 244, 0.82);
    }
    .image-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      padding: 8px;
      background: rgba(7, 15, 24, 0.24);
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
      pointer-events: none;
    }
    .overlay-container.editing {
      filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
    }
    .overlay-container > * {
      pointer-events: auto;
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
    .chip-zone {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 0 8px;
      justify-content: center;
    }
    .chip-zone.above {
      padding-bottom: 8px;
    }
    .chip-zone.below {
      padding-top: 8px;
    }
  `;

  private _handleBadgeDragStart(ev: CustomEvent): void {
    this._draggingId = ev.detail.id;
    window.addEventListener('pointermove', this._boundPointerMove);
    window.addEventListener('pointerup', this._boundPointerUp);
    window.addEventListener('pointercancel', this._boundPointerCancel);
  }

  private _handleWindowPointerMove(ev: PointerEvent): void {
    if (!this._draggingId) return;
    const overlay = this.renderRoot.querySelector('.overlay-container') as HTMLElement | null;
    if (!overlay) return;

    const rect = overlay.getBoundingClientRect();
    const left = clampPercentage(((ev.clientX - rect.left) / rect.width) * 100);
    const top = clampPercentage(((ev.clientY - rect.top) / rect.height) * 100);

    this._previewPositions[this._draggingId] = { top, left };
    this.requestUpdate();
  }

  private _handleWindowPointerUp(ev: PointerEvent): void {
    if (!this._draggingId) return;
    const overlay = this.renderRoot.querySelector('.overlay-container') as HTMLElement | null;
    if (overlay) {
      const rect = overlay.getBoundingClientRect();
      const left = clampPercentage(((ev.clientX - rect.left) / rect.width) * 100);
      const top = clampPercentage(((ev.clientY - rect.top) / rect.height) * 100);

      this.dispatchEvent(new CustomEvent('badge-position-changed', {
        detail: { id: this._draggingId, position: { top, left } },
        bubbles: true,
        composed: true,
      }));
    }

    delete this._previewPositions[this._draggingId];
    this._draggingId = undefined;
    this._removeDragListeners();
    this.requestUpdate();
  }

  private _handleWindowPointerCancel(): void {
    if (!this._draggingId) return;
    delete this._previewPositions[this._draggingId];
    this._draggingId = undefined;
    this._removeDragListeners();
    this.requestUpdate();
  }

  render(): TemplateResult {
    const showDefault = this.config.vehicle?.show_default_image !== false;
    const imgSrc = this.config.vehicle_image || '';
    const hasImage = showDefault && imgSrc;
    const editMode = this.config.display?.edit_positions === true;

    const handleImgError = (e: Event) => {
      const target = e.target as HTMLImageElement;
      const currentSrc = target.currentSrc || target.src;
      if (currentSrc !== DEFAULT_VEHICLE_IMAGE) {
        target.src = DEFAULT_VEHICLE_IMAGE;
        target.addEventListener('load', () => this._updateImageBox(), { once: true });
      } else {
        target.style.display = 'none';
        target.parentElement?.querySelector('.no-image')?.classList.remove('hidden');
      }
    };

    const aboveBadges = this._getBadgesByArea('above_vehicle');
    const onBadges = this._getBadgesByArea('on_vehicle');
    const belowBadges = this._getBadgesByArea('below_vehicle');

    return html`
      ${editMode ? html`
        <div class="mode-banner">
          <strong>Edit mode.</strong>
          <span>Drag a badge and release to save.</span>
        </div>
      ` : ''}
      ${aboveBadges.length ? html`
        <div class="chip-zone above">
          ${aboveBadges.map(b => html`
            <custom-badge
              .badge=${b}
              .state=${this._getResolvedState(b)}
              .display=${this.config.display || {}}
              .editable=${false}
            ></custom-badge>
          `)}
        </div>
      ` : ''}
      <div class="image-container">
        ${hasImage ? html`
          <div class="image-stage">
            <img class="vehicle-img" src="${imgSrc}" alt="${this.config.vehicle?.name || 'Vehicle'}"
                 @error=${handleImgError}
                 @load=${this._updateImageBox} />
            <div class="no-image hidden">
              <ha-icon icon="mdi:car-side"></ha-icon>
              <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
            </div>
            <div class=${editMode ? 'overlay-container editing' : 'overlay-container'}
                 style=${this._imageBox ? `left:${this._imageBox.left}px;top:${this._imageBox.top}px;width:${this._imageBox.width}px;height:${this._imageBox.height}px;` : ''}
                 @badge-drag-start=${this._handleBadgeDragStart}>
              ${onBadges.map(b => {
                const preview = this._previewPositions[b.id];
                const mergedBadge = preview
                  ? { ...b, position: { ...b.position, ...preview } }
                  : b;
                return html`
                  <custom-badge
                    .badge=${mergedBadge}
                    .state=${this._getResolvedState(b)}
                    .display=${this.config.display || {}}
                    .editable=${editMode}
                  ></custom-badge>
                `;
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
      ${belowBadges.length ? html`
        <div class="chip-zone below">
          ${belowBadges.map(b => html`
            <custom-badge
              .badge=${b}
              .state=${this._getResolvedState(b)}
              .display=${this.config.display || {}}
              .editable=${false}
            ></custom-badge>
          `)}
        </div>
      ` : ''}
    `;
  }
}

if (!window.customElements.get('vehicle-panel')) {
  window.customElements.define('vehicle-panel', VehiclePanel);
}
