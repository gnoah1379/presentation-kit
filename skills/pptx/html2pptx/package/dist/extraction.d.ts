/**
 * Browser-side extraction functions for html2pptx
 *
 * Note: extractSlideData runs in the browser context via page.evaluate()
 * Helper functions are now in src/playwright/ and bundled via rollup
 */
import type { Page } from 'playwright';
import type { SlideData } from './types.js';
/**
 * Extract slide data from HTML page
 * This function runs in the browser context using helpers from the bundled ExtractSlideData
 */
export declare function extractSlideData(page: Page): Promise<SlideData>;
//# sourceMappingURL=extraction.d.ts.map