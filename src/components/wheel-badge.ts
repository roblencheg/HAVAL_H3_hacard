import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ResolvedEntity, DisplayConfig, CardConfig, PositionConfig, EntityConfig } from '../types';
import { getEntityIcon, getEntityColor, formatEntityValue } from '../utils/entity-resolver';
import { resolvePosition, clampPercentage } from '../utils/position-resolver';

export type WheelKey = 'front_left' | 'front_right' | 'rear_left' | 'rear_right';

export const WHEEL_LABELS: Record<WheelKey, string> = {
  front_left: 'FL',
  front_right: 'FR',
  rear_left: 'RL',
  rear_right: 'RR',
};

export const WHEEL_POSITION_KEYS: Record<WheelKey, string> = {
  front_left: 'front_left_wheel',
  front_right: 'front_right_wheel',
  rear_left: 'rear_left_wheel',
  rear_right: 'rear_right_wheel',
};

export function getWheelGroupKey(wheelKey: WheelKey): string {
  return `wheel_${wheelKey}`;
}

export function getWheelTargetKeys(wheelKey: WheelKey): string[] {
  const map: Record<WheelKey, string[]> = {
    front_left: ['front_left_tire_pressure', 'front_left_tire_temp'],
    front_right: ['front_right_tire_pressure', 'front_right_tire_temp'],
    rear_left: ['rear_left_tire_pressure', 'rear_left_tire_temp'],
    rear_right: ['rear_right_tire_pressure', 'rear_right_tire_temp'],
  };
  return map[wheelKey];
}

export function parseWheelKey(groupKey: string): WheelKey | null {
  const match = groupKey.match(/^wheel_(.+)$/);
  if (match) {
    const wk = match[1] as WheelKey;
    if (wk in WHEEL_LABELS) return wk;
  }
  return null;
}

export class WheelBadge extends LitElement {
  @property({ attribute: false }) wheelKey!: WheelKey;
  @property({ attribute: false }) pressureEntity?: ResolvedEntity;
  @property({ attribute: false }) tempEntity?: ResolvedEntity;
  @property({ attribute: false }) pressureConfig?: EntityConfig;
  @property({ attribute: false }) tempConfig?: EntityConfig;
  @property({ attribute: false }) display!: DisplayConfig;
  @property({ attribute: false }) cardConfig?: CardConfig;
  @property({ type: Boolean }) editable = false;
  @property({ attribute: false }) customPosition?: PositionConfig;

  static styles = css`
    :host {
      position: absolute;
      pointer-events: auto;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    .wheel-badge {
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
      max-width: 110px;
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
      border: 1px solid var(--overlay-badge-border, rgba(255, 255, 255, 0.1));
      min-height: 18px;
    }
    .wheel-badge.editable {
      cursor: move;
      outline: 1px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .wheel-label {
      font-weight: 600;
      font-size: 10px;
      color: var(--primary-text-color, #fff);
      margin-right: 1px;
    }
    .wheel-icon {
      display: inline-flex;
      align-items: center;
      width: 12px;
      height: 12px;
      flex: 0 0 12px;
    }
    .wheel-icon ha-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
    }
    .wheel-value {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .separator {
      opacity: 0.5;
      margin: 0 1px;
    }
  `;

  render(): TemplateResult {
    const label = WHEEL_LABELS[this.wheelKey] || this.wheelKey;
    const posKey = WHEEL_POSITION_KEYS[this.wheelKey];

    const pressureIcon = this.pressureEntity ? getEntityIcon(this.pressureEntity, this.pressureConfig || this.pressureEntity.config) : null;
    const tempIcon = this.tempEntity ? getEntityIcon(this.tempEntity, this.tempConfig || this.tempEntity.config) : null;

    const pressureValue = this.pressureEntity && this.display.show_units
      ? formatEntityValue(this.pressureEntity, this.pressureConfig || this.pressureEntity.config, this.display)
      : null;
    const tempValue = this.tempEntity && this.display.show_units
      ? formatEntityValue(this.tempEntity, this.tempConfig || this.tempEntity.config, this.display)
      : null;

    const effectiveConfig: EntityConfig = {
      ...(this.pressureConfig || this.tempConfig || {}),
      position: posKey,
      custom_position: this.customPosition,
    };
    const pos = resolvePosition({
      ...effectiveConfig,
      imageLayout: this.cardConfig?.vehicle?.image_layout,
    });

    if (pos) {
      if (pos.top !== undefined) this.style.top = `${clampPercentage(pos.top)}%`;
      if (pos.left !== undefined) this.style.left = `${clampPercentage(pos.left)}%`;
    }

    return html`
      <div class="wheel-badge${this.editable ? ' editable' : ''}" @pointerdown=${this._handlePointerDown}>
        ${this.display.show_icons && pressureIcon ? html`
          <span class="wheel-icon"><ha-icon .icon=${pressureIcon}></ha-icon></span>
        ` : ''}
        <span class="wheel-label">${label}</span>
        ${pressureValue ? html`<span class="wheel-value">${pressureValue}</span>` : ''}
        ${pressureValue && tempValue ? html`<span class="separator">·</span>` : ''}
        ${tempValue ? html`<span class="wheel-value">${tempValue}</span>` : ''}
      </div>
    `;
  }

  private _handlePointerDown(ev: PointerEvent): void {
    if (!this.editable) return;
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(new CustomEvent('badge-drag-start', {
      detail: {
        key: getWheelGroupKey(this.wheelKey),
        clientX: ev.clientX,
        clientY: ev.clientY,
      },
      bubbles: true,
      composed: true,
    }));
  }
}

if (!window.customElements.get('wheel-badge')) {
  window.customElements.define('wheel-badge', WheelBadge);
}
