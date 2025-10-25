/**
 * Inline text formatting parser for browser-side extraction
 */
import type { TextOptions } from '../types.js';
/**
 * Text run options for inline formatting
 *
 * Contains style properties that can be applied to individual text runs:
 * - bold: boolean for bold text
 * - italic: boolean for italic text
 * - underline: boolean for underlined text
 * - color: hex color string
 * - transparency: opacity value (0-100)
 * - fontSize: font size in points
 * - bullet: bullet options with indent
 * - breakLine: whether to insert a line break after this run
 *
 * Using Partial<TextOptions> to provide better type safety while
 * allowing flexible text option building.
 */
type TextRunOptions = Partial<TextOptions>;
/**
 * Parse inline formatting tags (<b>, <i>, <u>, <strong>, <em>, <span>) into text runs
 */
export declare function parseInlineFormatting(element: HTMLElement, baseOptions?: TextRunOptions, runs?: Array<{
    text: string;
    options: TextRunOptions;
}>, baseTextTransform?: (text: string) => string, errors?: string[]): Array<{
    text: string;
    options: TextRunOptions;
}>;
export {};
//# sourceMappingURL=inlineFormatting.d.ts.map