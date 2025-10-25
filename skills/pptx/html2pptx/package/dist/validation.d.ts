/**
 * Validation functions for html2pptx
 */
import type { Page } from 'playwright';
import type { PptxGenJS, BodyDimensions, SlideData } from './types.js';
/**
 * Get body dimensions and check for overflow
 */
export declare function getBodyDimensions(page: Page): Promise<BodyDimensions>;
/**
 * Validate dimensions match presentation layout
 */
export declare function validateDimensions(bodyDimensions: BodyDimensions, pres: PptxGenJS): string[];
/**
 * Validate text box positions are not too close to bottom edge
 */
export declare function validateTextBoxPosition(slideData: SlideData, bodyDimensions: BodyDimensions): string[];
//# sourceMappingURL=validation.d.ts.map