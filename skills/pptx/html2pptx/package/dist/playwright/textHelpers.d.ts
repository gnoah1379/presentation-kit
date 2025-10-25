/**
 * Text transformation and formatting helpers for browser-side extraction
 */
/**
 * Check if a font should skip bold formatting
 * (applying bold causes PowerPoint to use faux bold which makes text wider)
 */
export declare function shouldSkipBold(fontFamily: string): boolean;
/**
 * Apply CSS text-transform to text
 */
export declare function applyTextTransform(text: string, textTransform: string): string;
//# sourceMappingURL=textHelpers.d.ts.map