/**
 * CSS box-shadow parsing for browser-side extraction
 */
/**
 * Parse CSS box-shadow into PptxGenJS shadow properties
 */
export declare function parseBoxShadow(boxShadow: string): {
    type: string;
    angle: number;
    blur: number;
    color: string;
    offset: number;
    opacity: number;
} | null;
//# sourceMappingURL=shadowHelpers.d.ts.map