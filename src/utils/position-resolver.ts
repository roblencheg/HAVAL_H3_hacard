import { PositionConfig, getPresetPositions, ImageLayout } from '../types';

export function resolvePosition(config: {
  position?: string;
  custom_position?: PositionConfig;
  imageLayout?: ImageLayout;
}): PositionConfig | null {
  if (config.custom_position) {
    return {
      ...config.custom_position,
    };
  }

  const presets = getPresetPositions(config.imageLayout);

  if (config.position && presets[config.position]) {
    return { ...presets[config.position] };
  }

  return null;
}

export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function computeStyle(pos: PositionConfig): string {
  const parts: string[] = [];

  if (pos.top !== undefined) {
    parts.push(`top: ${clampPercentage(pos.top)}%`);
  }
  if (pos.left !== undefined) {
    parts.push(`left: ${clampPercentage(pos.left)}%`);
  }
  if (pos.bottom !== undefined) {
    parts.push(`bottom: ${clampPercentage(pos.bottom)}%`);
  }
  if (pos.right !== undefined) {
    parts.push(`right: ${clampPercentage(pos.right)}%`);
  }

  return parts.join('; ');
}

export function normalizePositionStyle(pos: PositionConfig): Record<string, string> {
  const result: Record<string, string> = {};
  if (pos.top !== undefined) result.top = `${clampPercentage(pos.top)}%`;
  if (pos.left !== undefined) result.left = `${clampPercentage(pos.left)}%`;
  if (pos.bottom !== undefined) result.bottom = `${clampPercentage(pos.bottom)}%`;
  if (pos.right !== undefined) result.right = `${clampPercentage(pos.right)}%`;
  return result;
}
