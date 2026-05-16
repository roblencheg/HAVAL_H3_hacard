import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardConfig, ResolvedEntity, EntityConfig, DisplayConfig } from '../types';
import { resolvePosition, computeStyle } from '../utils/position-resolver';
import { formatEntityValue, getEntityIcon, getEntityColor, showEntity } from '../utils/entity-resolver';

export class OverlayBadge extends LitElement {
  @property({ attribute: false }) entity!: ResolvedEntity;
  @property({ attribute: false }) entityConfig!: EntityConfig;
  @property({ attribute: false }) display!: DisplayConfig;
  @property({ attribute: false }) cardConfig?: CardConfig;

  static styles = css`
    :host {
      position: absolute;
      pointer-events: auto;
      z-index: 10;
    }
    .badge {
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
      transform: translate(-50%, -50%);
    }
    .badge:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      z-index: 20;
    }
    .icon {
      display: flex;
      align-items: center;
      font-size: 14px;
      width: 16px;
      height: 16px;
    }
    .icon ha-icon {
      width: 14px;
      height: 14px;
    }
    .label {
      color: var(--overlay-badge-label, rgba(255, 255, 255, 0.7));
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      font-weight: 600;
      font-size: 12px;
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
    :host(:hover) .tooltip {
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

    const style = computeStyle(pos);
    const color = getEntityColor(this.entity, this.entityConfig, this.display);
    const icon = getEntityIcon(this.entity, this.entityConfig);
    const value = formatEntityValue(this.entity, this.entityConfig, this.display);
    const isAlert = this.entity.state?.state === 'on' || this.entity.state?.state === 'open';
    const alertColor = 'var(--error-color, #f44336)';
    const isDebug = this.display.debug_positions;

    return html`
      <div style="${style}">
        ${isDebug ? html`<div class="debug-dot"></div>` : ''}
        <div class="badge" style="${isAlert ? `border-color: ${alertColor}; box-shadow: 0 0 12px ${alertColor}40;` : ''}${isDebug ? ' opacity: 0.4;' : ''}">
          ${this.display.show_entity_name_on_hover ? html`<div class="tooltip">${this.entityConfig.label || this.entityConfig.entity}</div>` : ''}
          ${this.display.show_icons ? html`<span class="icon" style="color: ${color}">${icon}</span>` : ''}
          ${this.display.show_labels && this.entityConfig.label ? html`<span class="label">${this.entityConfig.label}</span>` : ''}
          <span class="value" style="color: ${color}">${value}</span>
          ${this.display.show_units && this.entityConfig.unit ? html`<span class="unit">${this.entityConfig.unit}</span>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('overlay-badge', OverlayBadge);
