import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ResolvedEntity, DisplayConfig } from '../types';
import { formatEntityValue, getEntityIcon, getEntityColor, showEntity } from '../utils/entity-resolver';

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
      gap: 8px;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--summary-chip-bg, rgba(255, 255, 255, 0.08));
      font-size: 11px;
      color: var(--primary-text-color, #fff);
    }
    .chip ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
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

    return html`
      <div class="summary-container">
        ${this.entities.map((entity) => {
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

customElements.define('summary-panel', SummaryPanel);
