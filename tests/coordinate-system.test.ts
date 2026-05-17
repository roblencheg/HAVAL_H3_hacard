import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('vehicle coordinate system (v1.3.9)', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/components/vehicle-panel.ts'), 'utf-8');

  it('has _imageBox state property', () => {
    expect(source).toContain('_imageBox: { left: number; top: number; width: number; height: number } | null = null');
  });

  it('has ResizeObserver in firstUpdated', () => {
    expect(source).toContain('_resizeObserver: ResizeObserver | null = null');
    expect(source).toContain('firstUpdated');
    expect(source).toContain('_setupImageObserver');
  });

  it('has _updateImageBox method that measures img bounds relative to stage', () => {
    expect(source).toContain('_updateImageBox');
    expect(source).toContain('stage.getBoundingClientRect()');
    expect(source).toContain('img.getBoundingClientRect()');
  });

  it('overlay-container has inline style for left/top/width/height', () => {
    expect(source).toContain('style=${this._imageBox ? `left:${this._imageBox.left}px');
  });

  it('vehicle-img has @load handler to trigger _updateImageBox', () => {
    expect(source).toContain('@load=${this._updateImageBox}');
  });

  it('image-stage has position: relative for correct overlay positioning', () => {
    const cssMatch = source.match(/static styles = css`[\s\S]*?`/);
    expect(cssMatch).not.toBeNull();
    const cssContent = cssMatch![0];
    expect(cssContent).toContain('.image-stage');
    expect(cssContent).toContain('position: relative');
  });

  it('disconnectedCallback cleans up ResizeObserver', () => {
    expect(source).toContain('_resizeObserver?.disconnect()');
  });

  it('drag handles clamp percentages relative to overlay-container', () => {
    expect(source).toContain('overlay.getBoundingClientRect()');
    expect(source).toContain('clampPercentage(((ev.clientX - rect.left) / rect.width) * 100)');
  });
});
