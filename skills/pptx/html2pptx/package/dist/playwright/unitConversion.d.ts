/**
 * Unit conversion utilities for browser-side extraction
 */
/**
 * Convert pixels to inches
 */
export declare function pxToInch(px: number): number;
/**
 * Convert pixels to points
 */
export declare function pxToPoints(pxStr: string | number): number;
/**
 * Convert RGB/RGBA string to hex color
 */
export declare function rgbToHex(rgbStr: string): string;
/**
 * Extract alpha transparency from RGBA string
 * Returns transparency percentage (0-100) or null if fully opaque
 */
export declare function extractAlpha(rgbStr: string): number | null;
//# sourceMappingURL=unitConversion.d.ts.map