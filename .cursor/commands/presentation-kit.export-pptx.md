---
Description: Convert HTML slides to PowerPoint format, add charts and tables to placeholder areas, and generate the final presentation file.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** review the user input before proceeding (if not empty).

The text the user enters after `/persentation-kit.export-pptx` in the activation message **is** the <presentation_name>. Assume you always have this text available in this conversation even if `$ARGUMENTS` appears below. Do not ask the user to repeat unless they provide a blank command.


---

## Prerequisites

**Before starting, verify:**
1. HTML slides exist in `decks/<presentation_name>/slides/`
2. `slide-inventory.md` exists with chart specifications
3. `plan.md` contains complete chart data and configurations
4. All asset files (icons, gradients) are in place
5. html2pptx is installed globally

---

## CRITICAL: Read Documentation First

**MANDATORY:**
1. **Read chart sections in `skills/pptx/html2pptx.md`** (lines 426-750)
   - Chart data format requirements
   - Chart type specifications
   - Color usage rules (NO # prefix)
   - Table formatting options

2. **Review slide-inventory.md**:
   - List of placeholder IDs
   - Chart types for each placeholder
   - Data requirements

---

## Workflow Steps

### Step 1: Verify Installation

**What to do:**
```bash
# Verify html2pptx is installed
npm list -g @ant/html2pptx

# If not installed
npm install -g skills/pptx/html2pptx.tgz
```

---

### Step 2: Prepare Chart Data

**What to do:**
1. Read `plan.md` to extract all chart specifications
2. Organize data into JavaScript objects
3. Verify data completeness

**For each chart, collect:**
- Chart type (BAR, LINE, PIE, SCATTER)
- Data series (labels and values)
- Axis titles
- Colors (hex codes WITHOUT # prefix)
- Chart title
- Additional options (legend, data labels, etc.)

**Example data structure:**
```javascript
const chartData = {
  'revenue-chart': {
    type: 'BAR',
    data: [
      {
        name: 'Revenue 2024',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [1200, 1450, 1680, 1920]
      }
    ],
    options: {
      showTitle: true,
      title: 'Quarterly Revenue Growth',
      showCatAxisTitle: true,
      catAxisTitle: 'Quarter',
      showValAxisTitle: true,
      valAxisTitle: 'Revenue ($000s)',
      chartColors: ['4472C4'], // NO # prefix
      barDir: 'col',
      showLegend: false
    }
  },
  'market-share': {
    type: 'PIE',
    data: [
      {
        name: 'Market Share',
        labels: ['Company A', 'Company B', 'Company C', 'Others'],
        values: [35, 28, 22, 15]
      }
    ],
    options: {
      showPercent: true,
      showLegend: true,
      legendPos: 'r',
      chartColors: ['4472C4', 'ED7D31', '70AD47', 'A5A5A5']
    }
  }
};
```

---

### Step 3: Create Export Script

**What to do:**
Create a JavaScript file `decks/<presentation_name>/export-pptx.js` that:
1. Imports required libraries
2. Processes each HTML slide
3. Adds charts to placeholders
4. Saves the PowerPoint file

**Script template:**
```javascript
const pptxgen = require('pptxgenjs');
const { html2pptx } = require('@ant/html2pptx');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  // Initialize presentation
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Your Name';
  pptx.title = 'Presentation Title';
  
  // Get all slide files
  const slidesDir = path.join(__dirname, 'slides');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(f => f.startsWith('slide-') && f.endsWith('.html'))
    .sort();
  
  console.log(`Processing ${slideFiles.length} slides...`);
  
  // Chart data configurations
  const chartData = {
    // [INSERT CHART DATA HERE]
  };
  
  // Process each slide
  for (const file of slideFiles) {
    const slideNum = file.match(/slide-(\d+)/)[1];
    const htmlPath = path.join(slidesDir, file);
    
    console.log(`Processing slide ${slideNum}: ${file}`);
    
    // Convert HTML to PowerPoint slide
    const { slide, placeholders } = await html2pptx(htmlPath, pptx);
    
    // Add charts to placeholders
    for (const placeholder of placeholders) {
      const chartConfig = chartData[placeholder.id];
      
      if (chartConfig) {
        console.log(`  Adding ${chartConfig.type} chart to ${placeholder.id}`);
        
        const chartType = pptx.charts[chartConfig.type];
        const chartOptions = {
          ...placeholder,
          ...chartConfig.options
        };
        
        slide.addChart(chartType, chartConfig.data, chartOptions);
      }
    }
  }
  
  // Save presentation
  const outputFile = 'presentation.pptx';
  await pptx.writeFile({ fileName: outputFile });
  console.log(`\nPresentation saved: ${outputFile}`);
}

createPresentation().catch(console.error);
```

---

### Step 4: Configure Chart Data

**CRITICAL RULES:**

#### Color Format
- ❌ **NEVER** use `#` prefix: `#4472C4` causes file corruption
- ✅ **ALWAYS** use hex without prefix: `4472C4`

#### Chart Types and Data Format

**Bar Chart:**
```javascript
{
  type: 'BAR',
  data: [
    {
      name: 'Sales 2024',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [4500, 5500, 6200, 7100]
    }
  ],
  options: {
    barDir: 'col', // 'col' = vertical, 'bar' = horizontal
    showTitle: true,
    title: 'Quarterly Sales',
    showCatAxisTitle: true,
    catAxisTitle: 'Quarter',
    showValAxisTitle: true,
    valAxisTitle: 'Sales ($000s)',
    chartColors: ['4472C4'],
    showLegend: false,
    dataLabelPosition: 'outEnd',
    valAxisMinVal: 0,
    valAxisMaxVal: 8000,
    valAxisMajorUnit: 2000
  }
}
```

**Line Chart:**
```javascript
{
  type: 'LINE',
  data: [
    {
      name: 'Temperature',
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      values: [32, 35, 42, 55]
    }
  ],
  options: {
    lineSize: 4,
    lineSmooth: true,
    showCatAxisTitle: true,
    catAxisTitle: 'Month',
    showValAxisTitle: true,
    valAxisTitle: 'Temperature (°F)',
    chartColors: ['4472C4'],
    valAxisMinVal: 0,
    valAxisMaxVal: 60,
    valAxisMajorUnit: 20
  }
}
```

**Pie Chart:**
```javascript
{
  type: 'PIE',
  data: [
    {
      name: 'Market Share',
      labels: ['Product A', 'Product B', 'Product C', 'Others'],
      values: [35, 28, 22, 15]
    }
  ],
  options: {
    showPercent: true,
    showLegend: true,
    legendPos: 'r',
    chartColors: ['4472C4', 'ED7D31', '70AD47', 'A5A5A5']
  }
}
```

**Scatter Chart:**
```javascript
// Note: Scatter charts have unusual format - first series is X values
{
  type: 'SCATTER',
  data: [
    { name: 'X-Axis', values: [10, 15, 20, 25, 30] },
    { name: 'Series 1', values: [20, 25, 30, 35, 40] },
    { name: 'Series 2', values: [18, 22, 28, 32, 38] }
  ],
  options: {
    lineSize: 0,
    lineDataSymbol: 'circle',
    lineDataSymbolSize: 6,
    showCatAxisTitle: true,
    catAxisTitle: 'X Axis',
    showValAxisTitle: true,
    valAxisTitle: 'Y Axis',
    chartColors: ['4472C4', 'ED7D31']
  }
}
```

#### Multiple Series Charts

For comparing multiple data series:
```javascript
{
  type: 'LINE',
  data: [
    {
      name: 'Product A',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [10, 20, 30, 40]
    },
    {
      name: 'Product B',
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [15, 25, 20, 35]
    }
  ],
  options: {
    showCatAxisTitle: true,
    catAxisTitle: 'Quarter',
    showValAxisTitle: true,
    valAxisTitle: 'Revenue ($M)',
    chartColors: ['4472C4', 'ED7D31'],
    showLegend: true,
    legendPos: 'b'
  }
}
```

#### Time Series Data - Correct Granularity

**IMPORTANT:** Choose appropriate time granularity:
- **< 30 days**: Daily grouping (e.g., "10-01", "10-02")
- **30-365 days**: Monthly grouping (e.g., "2024-01", "2024-02")
- **> 365 days**: Yearly grouping (e.g., "2023", "2024")

❌ **DON'T**: Aggregate 7 days into 1 month (creates single-point chart)
✅ **DO**: Show all 7 days as individual points

---

### Step 5: Add Tables (if needed)

**What to do:**
If any slides have table placeholders, add them using `slide.addTable()`

**Basic table:**
```javascript
// Find table placeholder
const tablePlaceholder = placeholders.find(p => p.id === 'data-table');

if (tablePlaceholder) {
  const tableData = [
    ['Product', 'Revenue', 'Growth'],
    ['Product A', '$50M', '+15%'],
    ['Product B', '$35M', '+22%'],
    ['Product C', '$28M', '+8%']
  ];
  
  slide.addTable(tableData, {
    ...tablePlaceholder,
    border: { pt: 1, color: 'CCCCCC' },
    fontSize: 14,
    align: 'center'
  });
}
```

**Table with custom formatting:**
```javascript
const tableData = [
  // Header row with styling
  [
    { text: 'Product', options: { fill: { color: '4472C4' }, color: 'FFFFFF', bold: true } },
    { text: 'Revenue', options: { fill: { color: '4472C4' }, color: 'FFFFFF', bold: true } },
    { text: 'Growth', options: { fill: { color: '4472C4' }, color: 'FFFFFF', bold: true } }
  ],
  // Data rows
  ['Product A', '$50M', '+15%'],
  ['Product B', '$35M', '+22%'],
  ['Product C', '$28M', '+8%']
];

slide.addTable(tableData, {
  ...tablePlaceholder,
  colW: [3, 2.5, 2.5],
  border: { pt: 1, color: 'CCCCCC' },
  fontSize: 14,
  align: 'center',
  valign: 'middle'
});
```

---

### Step 6: Run Export Script

**What to do:**
```bash
cd decks/<presentation_name>
NODE_PATH=$(npm root -g) node export-pptx.js
```

**Expected output:**
```
Processing 12 slides...
Processing slide 01: slide-01.html
Processing slide 02: slide-02.html
Processing slide 03: slide-03.html
  Adding BAR chart to revenue-chart
Processing slide 04: slide-04.html
...
Presentation saved: presentation.pptx
```

---

### Step 7: Generate Thumbnails for Validation

**What to do:**
Create thumbnail grid to visually inspect the presentation:

```bash
cd /home/hoang.nguyen17/Projects/presentation-kit
python skills/pptx/scripts/thumbnail.py decks/<presentation_name>/presentation.pptx decks/<presentation_name>/thumbnails --cols 4
```

**This creates:**
- `decks/<presentation_name>/thumbnails.jpg` (or multiple files for large decks)
- Grid view of all slides for quick visual inspection

---

### Step 8: Visual Validation

**What to do:**
1. Read the thumbnail image(s)
2. Carefully inspect each slide for:
   - **Text cutoff**: Text being cut off by shapes or slide edges
   - **Text overlap**: Text overlapping with other elements
   - **Positioning issues**: Content too close to boundaries
   - **Contrast issues**: Insufficient text/background contrast
   - **Chart rendering**: Charts appear correctly
   - **Missing content**: All placeholders filled

**Common issues to check:**
- Headers with thick borders cutting off text
- Bullet points extending beyond slide bounds
- Chart labels being cut off
- Overlapping chart elements
- Color contrast problems

---

### Step 9: Fix Issues (if found)

**If validation reveals problems:**

1. **Text cutoff/overlap:**
   - Adjust margins in HTML slides
   - Reduce font sizes
   - Adjust element spacing
   - Regenerate HTML and re-export

2. **Chart issues:**
   - Adjust chart dimensions in placeholder
   - Modify axis label rotation
   - Adjust font sizes in chart options
   - Re-run export script

3. **Color/contrast issues:**
   - Update colors in HTML and chart configurations
   - Ensure sufficient contrast ratios
   - Re-export presentation

**Iteration process:**
```bash
# 1. Fix HTML slides
# 2. Re-run export
cd decks/<presentation_name>
NODE_PATH=$(npm root -g) node export-pptx.js

# 3. Generate new thumbnails
cd /home/hoang.nguyen17/Projects/presentation-kit
python skills/pptx/scripts/thumbnail.py decks/<presentation_name>/presentation.pptx decks/<presentation_name>/thumbnails --cols 4

# 4. Validate again
```

---

### Step 10: Final Quality Check

**Open presentation in PowerPoint/LibreOffice and verify:**

✅ **Content:**
- All slides present and in correct order
- All text readable and properly formatted
- All charts render correctly with data
- Tables formatted properly (if applicable)

✅ **Design:**
- Consistent styling across slides
- Colors match design specifications
- Typography hierarchy clear
- Visual alignment correct

✅ **Technical:**
- No corruption errors
- File opens without warnings
- Charts are editable (not images)
- File size reasonable

---

## Common Mistakes to Avoid

❌ **DON'T**: Use `#` prefix in colors: `chartColors: ['#4472C4']`
✅ **DO**: Omit `#` prefix: `chartColors: ['4472C4']`

❌ **DON'T**: Forget axis titles on bar/line charts
✅ **DO**: Always include `catAxisTitle` and `valAxisTitle`

❌ **DON'T**: Use wrong time granularity (monthly for 7 days)
✅ **DO**: Match granularity to time period (daily for < 30 days)

❌ **DON'T**: Skip thumbnail validation
✅ **DO**: Always generate and inspect thumbnails

❌ **DON'T**: Use multiple series for pie charts
✅ **DO**: Use single series with all categories in labels array

❌ **DON'T**: Forget to set `barDir` for bar charts
✅ **DO**: Specify `'col'` (vertical) or `'bar'` (horizontal)

❌ **DON'T**: Set `NODE_PATH` in script file
✅ **DO**: Set `NODE_PATH` when running: `NODE_PATH=$(npm root -g) node script.js`

---

## Chart Options Reference

### Common Options for All Charts
- `showTitle`: boolean - Show chart title
- `title`: string - Chart title text
- `showLegend`: boolean - Show legend
- `legendPos`: 'b' | 'r' | 't' | 'l' - Legend position
- `chartColors`: string[] - Hex colors WITHOUT #

### Bar/Line Chart Options
- `showCatAxisTitle`: boolean - Show category axis label
- `catAxisTitle`: string - Category axis label text
- `showValAxisTitle`: boolean - Show value axis label
- `valAxisTitle`: string - Value axis label text
- `valAxisMinVal`: number - Minimum Y-axis value
- `valAxisMaxVal`: number - Maximum Y-axis value
- `valAxisMajorUnit`: number - Y-axis label spacing
- `catAxisLabelRotate`: number - Rotate category labels (degrees)

### Bar Chart Specific
- `barDir`: 'col' | 'bar' - Vertical or horizontal bars
- `dataLabelPosition`: 'outEnd' | 'inEnd' | 'ctr' - Label position

### Line Chart Specific
- `lineSize`: number - Line thickness
- `lineSmooth`: boolean - Smooth lines
- `lineDataSymbol`: 'circle' | 'square' | 'triangle' - Data point symbol
- `lineDataSymbolSize`: number - Data point size

### Pie Chart Specific
- `showPercent`: boolean - Show percentages
- `dataLabelPosition`: 'bestFit' | 'outEnd' | 'inEnd' - Label position

---

## Output Format

After completing all steps, you should have:

```
decks/<presentation_name>/
├── context.md
├── plan.md
├── preview.html
├── slide-inventory.md
├── export-pptx.js
├── presentation.pptx           # Final output
├── thumbnails.jpg              # Validation thumbnails
└── slides/
    ├── slide-01.html
    ├── slide-02.html
    └── ...
```

---

## Completion Message

"PowerPoint presentation exported successfully!

**Output:** `decks/ai-in-healthcare/presentation.pptx`

**Slides:** 12 slides with 3 charts
- Slide 03: Revenue bar chart
- Slide 05: Market share pie chart
- Slide 08: Trend line chart

**Validation:** Thumbnails generated at `decks/ai-in-healthcare/thumbnails.jpg`

**Visual Check Results:**
✅ All slides render correctly
✅ No text cutoff or overlap detected
✅ Charts display properly
✅ Colors and formatting consistent

**Next Steps:**
1. Open `presentation.pptx` in PowerPoint/LibreOffice to review
2. Request modifications if needed
3. Presentation is ready for delivery!

File location: `decks/ai-in-healthcare/presentation.pptx`"

