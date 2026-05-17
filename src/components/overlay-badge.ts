import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, ResolvedEntity, EntityConfig, DisplayConfig } from '../types';
import { resolvePosition, clampPercentage } from '../utils/position-resolver';
import { formatEntityValue, getEntityIcon, getEntityColor, showEntity } from '../utils/entity-resolver';

export class OverlayBadge extends LitElement {
  @property({ attribute: false }) entity!: ResolvedEntity;
  @property({ attribute: false }) entityConfig!: EntityConfig;
  @property({ attribute: false }) display!: DisplayConfig;
  @property({ attribute: false }) cardConfig?: CardConfig;
  @property({ type: Boolean }) editable = false;
  @property({ type: String }) entityKey = '';

  static styles = css`
    :host {
      position: absolute;
      pointer-events: auto;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    .badge {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 12px;
      background: var(--overlay-badge-bg, rgba(0, 0, 0, 0.65));
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      font-size: 11px;
      line-height: 1.4;
      white-space: nowrap;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--overlay-badge-border, rgba(255, 255, 255, 0.1));
      transform: none;
      max-width: 170px;
      min-height: 24px;
      overflow: hidden;
    }
    .badge:hover {
      transform: scale(1.08);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      z-index: 20;
    }
    .badge.editable {
      cursor: move;
      outline: 1px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex: 0 0 16px;
      overflow: hidden;
    }
    .icon ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }
    .label,
    .value,
    .unit {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .label {
      color: var(--overlay-badge-label, rgba(255, 255, 255, 0.7));
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      max-width: 72px;
    }
    .value {
      font-weight: 600;
      font-size: 12px;
      max-width: 90px;
    }
    .unit {
      font-size: 9px;
      opacity: 0.7;
    }
    .tooltip {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--overlay-tooltip-bg, rgba(0, 0, 0, 0.85));
      color: #fff;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 10px;
      white-space: nowrap;
      pointer-events: none;
    }
    .badge:hover .tooltip {
      display: block;
    }
    .debug-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff00;
      border: 2px solid #fff;
      transform: translate(-50%, -50%);
      z-index: 5;
      box-shadow: 0 0 6px rgba(0, 255, 0, 0.8);
      pointer-events: none;
    }
  `;

  @property({ type: Number }) collisionIndex = 0;
  @property({ type: Number }) collisionCount = 1;

  render(): TemplateResult {
    if (!showEntity(this.entity, this.display)) {
      return html``;
    }

    const pos = resolvePosition({
      ...this.entityConfig,
      imageLayout: this.cardConfig?.vehicle?.image_layout,
    });
    if (!pos) {
      return html``;
    }

    const color = getEntityColor(this.entity, this.entityConfig, this.display);
    const icon = getEntityIcon(this.entity, this.entityConfig);
    const value = formatEntityValue(this.entity, this.entityConfig, this.display);
    const isAlert = this.entity.state?.state === 'on' || this.entity.state?.state === 'open';
    const alertColor = 'var(--error-color, #f44336)';
    const isDebug = this.display.debug_positions;

    const topPct = pos.top !== undefined ? clampPercentage(pos.top) : undefined;
    const leftPct = pos.left !== undefined ? clampPercentage(pos.left) : undefined;
    const bottomPct = pos.bottom !== undefined ? clampPercentage(pos.bottom) : undefined;
    const rightPct = pos.right !== undefined ? clampPercentage(pos.right) : undefined;

    if (topPct !== undefined) this.style.top = `${topPct}%`;
    else this.style.removeProperty('top');
    if (leftPct !== undefined) this.style.left = `${leftPct}%`;
    else this.style.removeProperty('left');
    if (bottomPct !== undefined) this.style.bottom = `${bottomPct}%`;
    else this.style.removeProperty('bottom');
    if (rightPct !== undefined) this.style.right = `${rightPct}%`;
    else this.style.removeProperty('right');

    const offsetY = this.collisionCount > 1 ? (this.collisionIndex - (this.collisionCount - 1) / 2) * 28 : 0;
    if (offsetY !== 0) {
      this.style.transform = `translate(-50%, calc(-50% + ${offsetY}px))`;
    } else {
      this.style.transform = 'translate(-50%, -50%)';
    }

    const badgeStyle = [
      isAlert ? `border-color:${alertColor};box-shadow:0 0 12px ${alertColor}40` : '',
      isDebug ? 'opacity:0.4' : '',
    ].filter(Boolean).join(';');

    return html`
      <div class="badge${this.editable ? ' editable' : ''}" style="${badgeStyle}" @pointerdown=${this._handlePointerDown}>
        ${isDebug ? html`<div class="debug-dot"></div>` : ''}
        ${this.display.show_entity_name_on_hover ? html`<div class="tooltip">${this.entityConfig.label || this.entityConfig.entity}</div>` : ''}
        ${this.display.show_icons ? html`<span class="icon" style="color:${color}"><ha-icon .icon=${icon}></ha-icon></span>` : ''}
        ${this.display.show_labels && this.entityConfig.label ? html`<span class="label">${this.entityConfig.label}</span>` : ''}
        <span class="value" style="color:${color}">${value}</span>
        ${this.display.show_units && this.entityConfig.unit ? html`<span class="unit">${this.entityConfig.unit}</span>` : ''}
      </div>
    `;
  }

  private _handlePointerDown(ev: PointerEvent): void {
    if (!this.editable || !this.entityKey) return;
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(new CustomEvent('badge-drag-start', {
      detail: {
        key: this.entityKey,
        clientX: ev.clientX,
        clientY: ev.clientY,
      },
      bubbles: true,
      composed: true,
    }));
  }
}

if (!window.customElements.get('overlay-badge')) {
  window.customElements.define('overlay-badge', OverlayBadge);
}
