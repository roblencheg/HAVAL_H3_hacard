export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function clientToPercent(clientX: number, clientY: number, rect: RectLike) {
  return {
    left: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
    top: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
  };
}
