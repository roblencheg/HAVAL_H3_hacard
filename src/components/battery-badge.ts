import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ResolvedEntity, DisplayConfig, CardConfig, PositionConfig, EntityConfig } from '../types';
import { formatEntityValue, getEntityIcon, getEntityColor } from '../utils/entity-resolver';
import { resolvePosition, clampPercentage } from '../utils/position-resolver';

export class BatteryBadge extends LitElement {
  @property({ attribute: false }) primaryEntity?: ResolvedEntity;
  @property({ attribute: false }) fallbackEntity?: ResolvedEntity;
  @property({ attribute: false }) entityConfig?: EntityConfig;
  @property({ attribute: false }) display!: DisplayConfig;
  @property({ attribute: false }) cardConfig?: CardConfig;
  @property({ type: Boolean }) editable = false;

  static styles = css`
    :host {
      position: absolute;
      pointer-events: auto;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    .battery-badge {
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 2px 5px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.48);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      font-size: 10px;
      line-height: 1.1;
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
      border: 1px solid var(--overlay-badge-border, rgba(255, 255, 255, 0.1));
      min-height: 18px;
    }
    .battery-badge.editable {
      cursor: move;
      outline: 1px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .battery-icon {
      display: inline-flex;
      align-items: center;
      width: 12px;
      height: 12px;
      flex: 0 0 12px;
    }
    .battery-icon ha-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
    }
    .battery-value {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
    .battery-unit {
      opacity: 0.7;
      font-size: 8px;
    }
  `;

  private get _activeEntity(): ResolvedEntity | null {
    return this.primaryEntity || this.fallbackEntity || null;
  }

  render(): TemplateResult {
    const active = this._activeEntity;
    if (!active || !this.entityConfig) {
      return html``;
    }

    const pos = resolvePosition({
      ...this.entityConfig,
      imageLayout: this.cardConfig?.vehicle?.image_layout,
    });

    if (pos) {
      if (pos.top !== undefined) this.style.top = `${clampPercentage(pos.top)}%`;
      if (pos.left !== undefined) this.style.left = `${clampPercentage(pos.left)}%`;
    }

    const color = getEntityColor(active, this.entityConfig, this.display);
    const icon = getEntityIcon(active, this.entityConfig);
    const value = formatEntityValue(active, this.entityConfig, this.display);
    const unit = this.entityConfig.unit;

    return html`
      <div class="battery-badge${this.editable ? ' editable' : ''}" @pointerdown=${this._handlePointerDown}>
        ${this.display.show_icons ? html`
          <span class="battery-icon" style="color:${color}"><ha-icon .icon=${icon}></ha-icon></span>
        ` : ''}
        <span class="battery-value" style="color:${color}">${value}</span>
        ${this.display.show_units && unit ? html`<span class="battery-unit">${unit}</span>` : ''}
      </div>
    `;
  }

  private _handlePointerDown(ev: PointerEvent): void {
    if (!this.editable) return;
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(new CustomEvent('badge-drag-start', {
      detail: {
        key: 'battery_voltage',
        clientX: ev.clientX,
        clientY: ev.clientY,
      },
      bubbles: true,
      composed: true,
    }));
  }
}

if (!window.customElements.get('battery-badge')) {
  window.customElements.define('battery-badge', BatteryBadge);
}
