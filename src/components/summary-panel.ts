import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ResolvedEntity, DisplayConfig } from '../types';
import { formatEntityValue, getEntityIcon, getEntityColor, showEntity } from '../utils/entity-resolver';
import { SENSOR_PRESETS_BY_KEY } from '../sensor-presets';

export class SummaryPanel extends LitElement {
  @property({ attribute: false }) entities: ResolvedEntity[] = [];
  @property({ attribute: false }) display!: DisplayConfig;

  static styles = css`
    :host {
      display: block;
      padding: 8px 12px;
    }
    .summary-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 3px;
      padding: 3px 8px;
      border-radius: 8px;
      background: var(--summary-chip-bg, rgba(255, 255, 255, 0.08));
      font-size: 10px;
      color: var(--primary-text-color, #fff);
    }
    .chip ha-icon {
      width: 12px;
      height: 12px;
      --mdc-icon-size: 12px;
    }
    .chip-label {
      opacity: 0.6;
    }
    .chip-value {
      font-weight: 600;
    }
    .chip-unit {
      opacity: 0.5;
    }
  `;

  render(): TemplateResult {
    if (!this.entities || this.entities.length === 0) {
      return html``;
    }

    const sorted = [...this.entities].sort((a, b) => {
      const orderA = SENSOR_PRESETS_BY_KEY.get(a.key || '')?.summary_order ?? 999;
      const orderB = SENSOR_PRESETS_BY_KEY.get(b.key || '')?.summary_order ?? 999;
      return orderA - orderB;
    });

    return html`
      <div class="summary-container">
        ${sorted.map((entity) => {
          if (!showEntity(entity, this.display)) return html``;
          const icon = getEntityIcon(entity, entity.config);
          const color = getEntityColor(entity, entity.config, this.display);
          const value = formatEntityValue(entity, entity.config, this.display);
          const label = entity.config.label;
          const unit = entity.config.unit;
          return html`
            <div class="chip">
              ${this.display.show_icons ? html`<ha-icon .icon=${icon} style="color:${color}"></ha-icon>` : ''}
              ${this.display.show_labels && label ? html`<span class="chip-label">${label}</span>` : ''}
              <span class="chip-value" style="color:${color}">${value}</span>
              ${this.display.show_units && unit ? html`<span class="chip-unit">${unit}</span>` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}

if (!window.customElements.get('summary-panel')) {
  window.customElements.define('summary-panel', SummaryPanel);
}
