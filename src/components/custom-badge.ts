import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { HassEntity } from 'home-assistant-js-websocket';
import { CustomBadgeConfig, DisplayConfig } from '../types';

const DEVICE_CLASS_ICONS: Record<string, string> = {
  temperature: 'mdi:thermometer',
  battery: 'mdi:battery',
  voltage: 'mdi:car-battery',
  pressure: 'mdi:car-tire-pressure',
  '': 'mdi:eye',
};

export function resolveBadgeIcon(badge: CustomBadgeConfig, state: HassEntity | null): string {
  if (badge.icon) return badge.icon;
  if (state?.attributes?.icon) return state.attributes.icon as string;
  const dc = state?.attributes?.device_class as string | undefined;
  if (dc && DEVICE_CLASS_ICONS[dc]) return DEVICE_CLASS_ICONS[dc];
  return 'mdi:eye';
}

export function resolveBadgeName(badge: CustomBadgeConfig, state: HassEntity | null): string {
  if (badge.name) return badge.name;
  if (state?.attributes?.friendly_name) return state.attributes.friendly_name as string;
  return badge.entity || '';
}

export function resolveBadgeUnit(badge: CustomBadgeConfig, state: HassEntity | null): string {
  if (badge.unit) return badge.unit;
  if (state?.attributes?.unit_of_measurement) return state.attributes.unit_of_measurement as string;
  return '';
}

export function formatBadgeValue(state: HassEntity | null, precision?: number): string {
  if (!state) return '\u2014';
  const s = state.state;
  if (s === 'unavailable' || s === 'unknown') return '\u2014';
  const num = Number(s);
  if (!isNaN(num) && precision !== undefined) return num.toFixed(precision);
  return s;
}

export class CustomBadge extends LitElement {
  @property({ attribute: false }) badge!: CustomBadgeConfig;
  @property({ attribute: false }) state!: HassEntity | null;
  @property({ attribute: false }) display!: DisplayConfig;
  @property({ type: Boolean }) editable = false;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      pointer-events: auto;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 8px;
      border-radius: 12px;
      background: rgba(12, 20, 30, 0.58);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      min-height: 32px;
      max-width: 190px;
      font-size: 11px;
      line-height: 1.3;
      white-space: nowrap;
      box-shadow:
        0 6px 16px rgba(0, 0, 0, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .badge.editable {
      cursor: grab;
      border-color: rgba(72, 192, 255, 0.26);
      box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(72, 192, 255, 0.12);
    }
    .badge.editable:active {
      cursor: grabbing;
    }
    .badge.on-vehicle {
      position: absolute;
      transform: translate(-50%, -50%);
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex: 0 0 20px;
      border-radius: 7px;
      background: rgba(255, 255, 255, 0.07);
    }
    .icon ha-icon {
      width: 13px;
      height: 13px;
      --mdc-icon-size: 13px;
      color: rgba(235, 243, 251, 0.92);
    }
    .content {
      display: flex;
      flex-direction: column;
      min-width: 0;
      gap: 2px;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(194, 209, 223, 0.76);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.02em;
      max-width: 140px;
    }
    .metric {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      min-width: 0;
    }
    .value {
      font-weight: 700;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 110px;
      color: #fff;
    }
    .unit {
      font-size: 10px;
      opacity: 0.72;
      color: rgba(220, 230, 240, 0.82);
    }
  `;

  render(): TemplateResult {
    if (this.badge.enabled === false) return html``;
    if (!this.badge.entity) return html``;
    if (this.badge.hide_unavailable && (!this.state || this.state.state === 'unavailable' || this.state.state === 'unknown')) {
      return html``;
    }

    const showIcon = this.badge.show_icon ?? this.display.show_icons ?? true;
    const showName = this.badge.show_name ?? this.display.show_labels ?? true;
    const showUnit = this.badge.show_unit ?? this.display.show_units ?? true;

    const icon = resolveBadgeIcon(this.badge, this.state);
    const name = resolveBadgeName(this.badge, this.state);
    const value = formatBadgeValue(this.state, this.badge.precision);
    const unit = resolveBadgeUnit(this.badge, this.state);

    const isOnVehicle = this.badge.area === 'on_vehicle';
    const pos = isOnVehicle && this.badge.position ? this.badge.position : null;

    let style = '';
    if (pos) {
      style = `top: ${pos.top ?? 50}%; left: ${pos.left ?? 50}%;`;
    }

    return html`
      <div
        class="badge${this.editable ? ' editable' : ''}${isOnVehicle ? ' on-vehicle' : ''}"
        style="${style}"
        title="${name || this.badge.entity || 'Badge'}"
        @pointerdown=${this._handlePointerDown}
      >
        ${showIcon ? html`<span class="icon"><ha-icon .icon=${icon}></ha-icon></span>` : ''}
        <span class="content">
          ${showName && name ? html`<span class="name">${name}</span>` : ''}
          <span class="metric">
            <span class="value">${value}</span>
            ${showUnit && unit ? html`<span class="unit">${unit}</span>` : ''}
          </span>
        </span>
      </div>
    `;
  }

  private _handlePointerDown(ev: PointerEvent): void {
    if (!this.editable || !this.badge.id) return;
    ev.preventDefault();
    ev.stopPropagation();
    this.dispatchEvent(new CustomEvent('badge-drag-start', {
      detail: {
        id: this.badge.id,
        clientX: ev.clientX,
        clientY: ev.clientY,
      },
      bubbles: true,
      composed: true,
    }));
  }
}

if (!window.customElements.get('custom-badge')) {
  window.customElements.define('custom-badge', CustomBadge);
}
