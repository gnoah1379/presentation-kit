/**
 * Main extraction logic that runs in the browser context
 * This is the core function that extracts slide data from the DOM
 */
import type { SlideData } from '../types.js';
export type { SlideData };
/**
 * Extract slide data from the current HTML page
 * This function runs in the browser context via page.evaluate()
 */
export declare function extractSlideDataInBrowser(): SlideData;
//# sourceMappingURL=extractSlideDataInBrowser.d.ts.map