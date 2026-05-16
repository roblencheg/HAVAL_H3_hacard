import { PositionConfig, PRESET_POSITIONS } from '../types';

export function resolvePosition(config: {
  position?: string;
  custom_position?: PositionConfig;
}): PositionConfig | null {
  if (config.custom_position) {
    return {
      ...config.custom_position,
    };
  }

  if (config.position && PRESET_POSITIONS[config.position]) {
    return { ...PRESET_POSITIONS[config.position] };
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
