/**
 * Type definitions for html2pptx
 */
import type PptxGenJSType from 'pptxgenjs';
export type PptxGenJS = PptxGenJSType;
export type Slide = PptxGenJSType.Slide;
export type TextOptions = PptxGenJSType.TextPropsOptions;
export interface ImageOptions {
    path: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface TextRun {
    text: string;
    options?: Partial<TextOptions>;
}
export interface Shadow {
    type: 'outer' | 'inner' | 'none';
    angle: number;
    blur: number;
    color: string;
    offset: number;
    opacity: number;
}
export interface BodyDimensions {
    width: number;
    height: number;
    scrollWidth: number;
    scrollHeight: number;
    errors: string[];
}
export interface Position {
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface ElementStyle {
    fontSize: number;
    fontFace: string;
    color: string;
    transparency?: number | null;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    align?: string;
    lineSpacing?: number | null;
    paraSpaceBefore?: number;
    paraSpaceAfter?: number;
    margin?: [number, number, number, number];
    rotate?: number | null;
}
export interface BaseElement {
    type: string;
    position: Position;
}
export interface ImageElement extends BaseElement {
    type: 'image';
    src: string;
}
export interface LineElement {
    type: 'line';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    width: number;
    color: string;
}
export interface ShapeElement extends BaseElement {
    type: 'shape';
    text: string;
    shape: {
        fill: string | null;
        transparency: number | null;
        line: {
            color: string;
            width: number;
        } | null;
        rectRadius: number;
        shadow: Shadow | null;
    };
}
export interface TextElement extends BaseElement {
    type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string | TextRun[];
    style: ElementStyle;
}
export interface ListElement extends BaseElement {
    type: 'list';
    items: TextRun[];
    style: ElementStyle;
}
export type SlideElement = ImageElement | LineElement | ShapeElement | TextElement | ListElement;
export interface Background {
    type: 'image' | 'color';
    path?: string;
    value?: string;
}
export interface Placeholder {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface SlideData {
    background: Background;
    elements: SlideElement[];
    placeholders: Placeholder[];
    errors: string[];
}
export interface Html2PptxOptions {
    tmpDir?: string;
    slide?: Slide | null;
}
export interface Html2PptxResult {
    slide: Slide;
    placeholders: Placeholder[];
}
//# sourceMappingURL=types.d.ts.map