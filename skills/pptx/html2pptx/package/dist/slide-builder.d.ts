/**
 * Slide building functions for html2pptx
 * These functions add elements to PowerPoint slides
 */
import type PptxGenJS from 'pptxgenjs';
import type { Slide, SlideData } from './types.js';
/**
 * Add background to slide (image or color)
 */
export declare function addBackground(slideData: SlideData, targetSlide: Slide, _tmpDir: string): Promise<void>;
/**
 * Add all elements to slide (images, shapes, text, lists)
 */
export declare function addElements(slideData: SlideData, targetSlide: Slide, pres: PptxGenJS): void;
//# sourceMappingURL=slide-builder.d.ts.map