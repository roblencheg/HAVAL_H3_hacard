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
      gap: 3px;
      padding: 2px 5px;
      border-radius: 7px;
      background: rgba(0,0,0,0.42);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      min-height: 17px;
      max-width: 160px;
      font-size: 10px;
      line-height: 1.4;
      white-space: nowrap;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
      border: 1px solid var(--overlay-badge-border, rgba(255, 255, 255, 0.1));
    }
    .badge.editable {
      cursor: move;
      outline: 1px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .badge.on-vehicle {
      position: absolute;
      transform: translate(-50%, -50%);
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      flex: 0 0 12px;
    }
    .icon ha-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.7);
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      max-width: 48px;
    }
    .value {
      font-weight: 600;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 64px;
    }
    .unit {
      font-size: 8px;
      opacity: 0.7;
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
      <div class="badge${this.editable ? ' editable' : ''}${isOnVehicle ? ' on-vehicle' : ''}" style="${style}" @pointerdown=${this._handlePointerDown}>
        ${showIcon ? html`<span class="icon"><ha-icon .icon=${icon}></ha-icon></span>` : ''}
        ${showName && name ? html`<span class="name">${name}</span>` : ''}
        <span class="value">${value}</span>
        ${showUnit && unit ? html`<span class="unit">${unit}</span>` : ''}
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
