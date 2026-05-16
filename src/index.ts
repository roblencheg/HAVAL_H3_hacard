import { CARD_NAME, CARD_TITLE, CARD_VERSION } from './const';
import { HavalH3Card } from './haval-h3-card';
import { HavalH3Editor } from './editor';

console.info(
  `%c ${CARD_TITLE} %c v${CARD_VERSION} `,
  'color: #fff; background: #1a73e8; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
  'color: #fff; background: #333; padding: 4px 8px; border-radius: 0 4px 4px 0;'
);

if (!window.customElements.get(CARD_NAME)) {
  window.customElements.define(CARD_NAME, HavalH3Card);
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: CARD_TITLE,
  description: 'Full-screen dashboard card for Haval H3 with vehicle image overlays and GPS map',
  preview: true,
  documentationURL: 'https://github.com/roblencheg/HAVAL_H3_hacard',
});

export { HavalH3Card, HavalH3Editor };
export { CARD_NAME, CARD_TITLE, CARD_VERSION };
