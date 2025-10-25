---
Description: Convert the presentation plan into HTML slides following html2pptx specifications, create all required visual assets, and generate a preview interface.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** review the user input before proceeding (if not empty).

The text the user enters after `/persentation-kit.generate` in the activation message **is** the <presentation_name> or the path of the `decks/<presentation_name>/` directory. Assume you always have this text available in this conversation even if `$ARGUMENTS` appears below. Do not ask the user to repeat unless they provide a blank command.


## Prerequisites

**Before starting, verify:**
1. `context.md` exists in `decks/<presentation_name>/`
2. `plan.md` exists in `decks/<presentation_name>/`
3. Directory `decks/<presentation_name>/slides/` exists
4. You have reviewed the design specifications and slide content

---

## CRITICAL: Read Documentation First

**MANDATORY FIRST STEP:**
1. **Read the ENTIRE `pptx/html2pptx.md` file** (no range limits)
   - This contains critical formatting rules
   - Syntax requirements for HTML slides
   - Chart and table specifications
   - Common pitfalls to avoid

2. **Review design specifications in `plan.md`**:
   - Color palette (hex codes WITHOUT # prefix)
   - Typography scale
   - Layout specifications
   - Visual treatments

---

## Workflow Steps

### Step 1: Create Required Visual Assets

**CRITICAL: Create assets BEFORE HTML generation**


#### Icons (if needed)

Use Sharp to rasterize react-icons to PNG:

```javascript
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const { FaChartLine, FaUsers } = require('react-icons/fa');

async function rasterizeIcon(IconComponent, color, size, filename) {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color: `#${color}`, size: size })
  );
  
  await sharp(Buffer.from(svgString)).png().toFile(filename);
  return filename;
}

// Example: Create icons
await rasterizeIcon(FaChartLine, '4472C4', '256', 'decks/my-presentation/slides/icon-chart.png');
await rasterizeIcon(FaUsers, '70AD47', '256', 'decks/my-presentation/slides/icon-users.png');
```
**Save script to file:** `decks/<presentation_name>/rasterize-icon.js`
**When to create icons:**
- Decorative elements for section headers
- Visual indicators for key concepts
- Bullet point replacements for visual impact



#### Gradients (if needed)

Use Sharp to create gradient background PNGs:

```javascript
const sharp = require('sharp');

async function createGradient(color1, color2, direction, filename) {
  // direction: 'horizontal', 'vertical', or 'diagonal'
  let x1 = '0%', y1 = '0%', x2 = '100%', y2 = '0%';
  
  if (direction === 'vertical') {
    x2 = '0%'; y2 = '100%';
  } else if (direction === 'diagonal') {
    y2 = '100%';
  }
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562.5">
    <defs>
      <linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" style="stop-color:#${color1}"/>
        <stop offset="100%" style="stop-color:#${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  
  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

// Example: Create gradient backgrounds
await createGradient('667EEA', '764BA2', 'diagonal', 'decks/my-presentation/slides/gradient-bg.png');
```
**Save script to file:** `decks/<presentation_name>/create-gradient.js`
**When to create gradients:**
- Full-slide backgrounds
- Header/section backgrounds
- Accent shapes with visual interest



---

### Step 2: Create HTML Slides

**CRITICAL RULES FROM html2pptx.md:**

#### HTML Structure Requirements

**Body dimensions (MANDATORY):**
```css
body {
  width: 720pt;
  height: 405pt;
  margin: 0;
  padding: 0;
  display: flex; /* Prevents margin collapse */
}
```

**Text element rules:**
- ✅ **ALL text MUST be in** `<p>`, `<h1>`-`<h6>`, `<ul>`, or `<ol>`
- ❌ **NEVER** put text directly in `<div>` or `<span>` - it will not appear in PowerPoint
- ❌ **NEVER** use manual bullet symbols (•, -, *) - use `<ul>` or `<ol>` instead

**Font requirements:**
- ✅ **ONLY web-safe fonts**: Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana, Tahoma, Trebuchet MS, Impact
- ❌ **NEVER** use: 'Segoe UI', 'Roboto', 'SF Pro', custom fonts

**Styling rules:**
- **Backgrounds/borders/shadows**: ONLY on `<div>` elements, NOT on text elements
- **Inline formatting**: Use `<b>`, `<i>`, `<u>` tags OR `<span>` with CSS
- **Colors**: Always use hex colors with # prefix in CSS (e.g., `color: #FF0000`)

**Gradients and icons:**
- ❌ **NEVER** use CSS gradients - they don't convert to PowerPoint
- ✅ **ALWAYS** rasterize to PNG first, then reference in HTML

#### Layout Best Practices

**For slides with charts/tables:**
- ✅ **PREFERRED**: Two-column layout (text in one column, chart in other)
- ✅ **ALTERNATIVE**: Full-slide chart layout
- ❌ **NEVER**: Vertically stacked (chart below text in single column)

**Layout structure:**
```html
<!-- Two-column layout example -->
<div style="display: flex; gap: 20pt;">
  <div style="flex: 0 0 280pt;">
    <!-- Text content -->
    <h2>Heading</h2>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
  </div>
  <div style="flex: 1;">
    <!-- Chart placeholder -->
    <div id="chart-revenue" class="placeholder" style="width: 380pt; height: 300pt;"></div>
  </div>
</div>
```

#### Chart Placeholders

For areas where charts will be added:
```html
<div id="unique-chart-id" class="placeholder" style="width: 400pt; height: 250pt; background: #e0e0e0;"></div>
```

**Placeholder requirements:**
- Must have `class="placeholder"`
- Must have unique `id` attribute
- Must have explicit width and height
- Should have gray background for visibility in preview

---

### Step 3: Generate Each Slide HTML File

**Process for each slide:**

1. **Read slide specifications from `plan.md`**
2. **Create HTML file with proper structure**
3. **Add all text content in semantic tags**
4. **Add visual elements (shapes, borders, backgrounds)**
5. **Add chart placeholders where specified**
6. **Save as `slide-XX.html`** (01, 02, 03, etc.)

**File naming:**
```
decks/<presentation_name>/slides/slide-01.html
decks/<presentation_name>/slides/slide-02.html
decks/<presentation_name>/slides/slide-03.html
...
```

#### Example Slide Template

```html
<!doctype html>
<html>
<head>
  <style>
    html {
      background: #ffffff;
    }
    body {
      width: 720pt;
      height: 405pt;
      margin: 0;
      padding: 0;
      background: #f5f5f5;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: #4472C4;
      padding: 30pt;
      border-left: 8pt solid #ED7D31;
    }
    .header h1 {
      margin: 0;
      font-size: 36pt;
      color: #ffffff;
      font-weight: bold;
    }
    .content {
      flex: 1;
      padding: 40pt;
      display: flex;
      gap: 30pt;
    }
    .text-column {
      flex: 0 0 300pt;
    }
    .text-column h2 {
      font-size: 24pt;
      color: #2d3748;
      margin-bottom: 20pt;
    }
    .text-column ul {
      font-size: 16pt;
      color: #4a5568;
      line-height: 1.6;
    }
    .chart-column {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .placeholder {
      background: #e0e0e0;
      border: 2px dashed #999999;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Slide Title</h1>
  </div>
  <div class="content">
    <div class="text-column">
      <h2>Key Points</h2>
      <ul>
        <li>First important point</li>
        <li>Second key insight</li>
        <li>Third major finding</li>
      </ul>
    </div>
    <div class="chart-column">
      <div id="revenue-chart" class="placeholder" style="width: 350pt; height: 280pt;"></div>
    </div>
  </div>
</body>
</html>
```
---

### Step 4: Test Preview

**What to do:**
1. Open preview file in browser
2. Verify all slides load correctly
3. Check navigation (Previous/Next buttons, keyboard shortcuts)
4. Test grid view
5. Verify all content is visible and properly formatted

**Common issues to check:**
- Text cut off by slide edges
- Overlapping elements
- Missing images or assets
- Incorrect colors
- Font rendering issues

---

### Step 5: Validate HTML Slides

**For each slide, verify:**

✅ **Structure:**
- Body has correct dimensions (720pt × 405pt)
- Body has `display: flex` to prevent margin collapse
- All text is in `<p>`, `<h1>`-`<h6>`, `<ul>`, or `<ol>` tags

✅ **Content:**
- No text directly in `<div>` or `<span>` without text tags
- No manual bullet symbols (•, -, *)
- All content fits within body dimensions (no overflow)

✅ **Styling:**
- Only web-safe fonts used
- No CSS gradients (use PNG backgrounds instead)
- Backgrounds/borders/shadows only on `<div>` elements
- Colors use # prefix in CSS

✅ **Charts:**
- Placeholders have `class="placeholder"`
- Placeholders have unique IDs
- Placeholders have explicit dimensions
- Placeholder IDs documented for export step

---

### Step 6: Create Slide Inventory Document

**What to do:**
Create a file `decks/<presentation_name>/slide-inventory.md` documenting:
- Total number of slides
- Chart placeholders with IDs and slide numbers
- Required asset files (icons, gradients)
- Design system summary

**Format:**
```markdown
# Slide Inventory: [Presentation Name]

## Overview
- Total Slides: 12
- Aspect Ratio: 16:9 (720pt × 405pt)
- Font: Arial

## Chart Placeholders

| Slide | Placeholder ID | Chart Type | Description |
|-------|---------------|------------|-------------|
| 03 | revenue-chart | Bar Chart | Quarterly revenue growth |
| 05 | market-share | Pie Chart | Market share distribution |
| 08 | trend-line | Line Chart | 5-year trend analysis |

## Assets Created

### Icons
- `icon-chart.png` - Chart icon (blue, 256x256)
- `icon-users.png` - Users icon (green, 256x256)

### Gradients
- `gradient-header.png` - Header gradient (blue to purple)

## Design System

### Colors (for PowerPoint export)
- Primary: 4472C4
- Secondary: ED7D31
- Accent: 70AD47
- Background: FFFFFF
- Text: 2D3748

Note: Colors listed WITHOUT # prefix for PowerPoint compatibility

### Typography
- H1: Arial, 36pt, bold
- H2: Arial, 24pt, bold
- Body: Arial, 16pt, regular
```

---

### Step 7: Quality Assurance

**Final checks:**

1. **File organization:**
   - [ ] All slides saved as `slide-01.html`, `slide-02.html`, etc.
   - [ ] All asset files (icons, gradients) in slides directory
   - [ ] Preview file created and working
   - [ ] Slide inventory document created

2. **Content accuracy:**
   - [ ] All slides match specifications in plan.md
   - [ ] Text content is complete and proofread
   - [ ] Chart placeholders positioned correctly
   - [ ] Visual design consistent across slides

3. **Technical validation:**
   - [ ] All HTML files have correct body dimensions
   - [ ] No text outside semantic tags
   - [ ] No CSS gradients used
   - [ ] Only web-safe fonts specified
   - [ ] All colors have # prefix in CSS
   - [ ] No content overflow detected

4. **Preview testing:**
   - [ ] All slides render correctly
   - [ ] Navigation works (buttons and keyboard)
   - [ ] Grid view displays all slides
   - [ ] No console errors

---

## Common Mistakes to Avoid

❌ **DON'T**: Put text directly in `<div>`: `<div>Hello</div>`
✅ **DO**: Wrap text in semantic tags: `<div><p>Hello</p></div>`

❌ **DON'T**: Use manual bullets: `<li>• Point one</li>`
✅ **DO**: Use list elements: `<ul><li>Point one</li></ul>`

❌ **DON'T**: Use CSS gradients: `background: linear-gradient(...)`
✅ **DO**: Rasterize to PNG: `background-image: url('gradient.png')`

❌ **DON'T**: Use non-web-safe fonts: `font-family: 'Segoe UI'`
✅ **DO**: Use web-safe fonts: `font-family: Arial, sans-serif`

❌ **DON'T**: Style text elements: `<p style="background: red;">`
✅ **DO**: Style containers: `<div style="background: red;"><p>Text</p></div>`

❌ **DON'T**: Vertically stack chart below text in single column
✅ **DO**: Use two-column layout or full-slide chart

❌ **DON'T**: Forget `display: flex` on body
✅ **DO**: Always include `display: flex` to prevent margin collapse

---

## Output Format

After completing all steps, you should have:

```
decks/<presentation_name>/
├── context.md
├── plan.md
├── preview.html
├── slide-inventory.md
└── slides/
    ├── slide-01.html
    ├── slide-02.html
    ├── slide-03.html
    ├── ...
    ├── icon-chart.png (if needed)
    ├── icon-users.png (if needed)
    └── gradient-bg.png (if needed)
```

---

## Completion Message

"HTML slides generated successfully for **[Presentation Title]**!

**Created:**
- 12 HTML slides in `decks/ai-in-healthcare/slides/`
- Preview interface at `decks/ai-in-healthcare/preview.html`
- Slide inventory at `decks/ai-in-healthcare/slide-inventory.md`

**Preview:** Open `preview.html` in your browser to review all slides

**Charts to Add:**
- Slide 03: Revenue bar chart (ID: revenue-chart)
- Slide 05: Market share pie chart (ID: market-share)
- Slide 08: Trend line chart (ID: trend-line)

**Next Steps:**
1. Review slides in preview.html
2. Run `presentation-kit/export-pptx` to generate PowerPoint file with charts
3. Or request modifications to specific slides

Ready to export to PowerPoint?"

