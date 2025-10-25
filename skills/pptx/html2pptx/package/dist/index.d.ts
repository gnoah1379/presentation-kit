/**
 * html2pptx - Convert HTML slide to pptxgenjs slide with positioned elements
 *
 * USAGE:
 *   const pptx = new pptxgen();
 *   pptx.layout = 'LAYOUT_16x9';  // Must match HTML body dimensions
 *
 *   const { slide, placeholders } = await html2pptx('slide.html', pptx);
 *   slide.addChart(pptx.charts.LINE, data, placeholders[0]);
 *
 *   await pptx.writeFile('output.pptx');
 *
 * FEATURES:
 *   - Converts HTML to PowerPoint with accurate positioning
 *   - Supports text, images, shapes, and bullet lists
 *   - Extracts placeholder elements (class="placeholder") with positions
 *   - Handles CSS gradients, borders, and margins
 *
 * VALIDATION:
 *   - Uses body width/height from HTML for viewport sizing
 *   - Throws error if HTML dimensions don't match presentation layout
 *   - Throws error if content overflows body (with overflow details)
 *
 * RETURNS:
 *   { slide, placeholders } where placeholders is an array of { id, x, y, w, h }
 *
 * @packageDocumentation
 */
import type { PptxGenJS, Html2PptxOptions, Html2PptxResult } from './types.js';
export type { PptxGenJS, Slide, Html2PptxOptions, Html2PptxResult, Placeholder, ImageOptions, TextOptions, TextRun, Shadow, } from './types.js';
export declare const Y = 5;
export declare function html2pptx(htmlFile: string, pres: PptxGenJS, options?: Html2PptxOptions): Promise<Html2PptxResult>;
//# sourceMappingURL=index.d.ts.map