/**
 * CSS transform and positioning helpers for browser-side extraction
 */
/**
 * Extract rotation angle from CSS transform and writing-mode
 */
export declare function getRotation(transform: string, writingMode: string): number | null;
/**
 * Get position and size accounting for rotation
 */
export declare function getPositionAndSize(el: HTMLElement, rect: DOMRect, rotation: number | null): {
    x: number;
    y: number;
    w: number;
    h: number;
};
//# sourceMappingURL=transformHelpers.d.ts.map