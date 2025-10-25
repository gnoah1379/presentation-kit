# Presentation Plan: [Title]

## Presentation Metadata

- **Title**: [Full presentation title]
- **Subtitle**: [Subtitle if applicable]
- **Author**: [Author name]
- **Total Slides**: [Number of slides]
- **Aspect Ratio**: 16:9 (720pt × 405pt)
- **Design System**: [Reference to color palette and typography from context.md]

---

## Slide-by-Slide Breakdown

### Slide 1: Title Slide

**Purpose**: Introduce the presentation and capture attention

**Layout Type**: Full-slide title layout

**Content**:
- **Title**: [Main presentation title]
- **Subtitle**: [Subtitle or tagline]
- **Author/Date**: [Presenter name and date]

**Visual Elements**:
- Background: [Describe background treatment - solid color, gradient, split background]
- Decorative elements: [Any shapes, borders, or visual accents]
- Typography: [Font sizes, weights, alignment]

**Design Notes**:
- [Specific styling decisions for this slide]
- [Color usage and placement]

---

### Slide 2: [Slide Title]

**Purpose**: [What this slide accomplishes - introduce agenda, provide context, etc.]

**Layout Type**: [Single column, two-column, full-bleed image with overlay, etc.]

**Content**:

**Text Content**:
- **Heading**: [Slide heading text]
- **Body Text**: 
  - [Bullet point 1 or paragraph text]
  - [Bullet point 2]
  - [Bullet point 3]

**Visual Elements**:
- [Image description if applicable - "Photo of X", "Icon representing Y"]
- [Chart/graph description - "Bar chart showing quarterly revenue"]
- [Decorative elements - shapes, dividers, borders]

**Layout Details**:
- **Column Structure**: [If using columns: "40% text / 60% chart" or "50/50 split"]
- **Positioning**: [Specific layout guidance]
- **Spacing**: [Margin and padding notes]

**Data Visualization** (if applicable):
- **Chart Type**: [Bar chart, line chart, pie chart, etc.]
- **Data Source**: [Reference to data in context.md]
- **Chart Configuration**:
  - Labels: [Category labels]
  - Values: [Data values or ranges]
  - Colors: [Specific hex colors without # prefix]
  - Axis titles: [X-axis and Y-axis labels]

**Design Notes**:
- [Specific styling decisions]
- [Color usage]
- [Typography treatments]

---

### Slide 3: [Slide Title]

**Purpose**: [What this slide accomplishes]

**Layout Type**: [Layout description]

**Content**:

**Text Content**:
- **Heading**: [Slide heading]
- **Body Text**:
  - [Content point 1]
  - [Content point 2]
  - [Content point 3]

**Visual Elements**:
- [Visual element descriptions]

**Layout Details**:
- [Layout specifications]

**Data Visualization** (if applicable):
- **Chart Type**: [Chart type]
- **Data**: 
  ```
  [Provide actual data structure, e.g.:
  Categories: Q1, Q2, Q3, Q4
  Values: 1200, 1450, 1680, 1920
  ]
  ```
- **Chart Configuration**:
  - Title: [Chart title]
  - Category Axis: [X-axis label]
  - Value Axis: [Y-axis label]
  - Colors: [Hex colors without #]
  - Legend: [Show/hide, position]

**Design Notes**:
- [Specific styling decisions]

---

### Slide 4: [Slide Title]

**Purpose**: [What this slide accomplishes]

**Layout Type**: [Layout description]

**Content**:

**Text Content**:
- [All text content with structure]

**Visual Elements**:
- [Visual elements needed]

**Data Visualization** (if applicable):
- [Complete chart/table specifications]

**Design Notes**:
- [Design decisions and styling]

---

[Continue pattern for all slides...]

---

### Slide N: Conclusion/Thank You

**Purpose**: Close the presentation and provide next steps

**Layout Type**: Closing slide layout

**Content**:
- **Heading**: [Closing message - "Thank You", "Questions?", "Let's Connect"]
- **Summary Points**: [Optional: 2-3 key takeaways]
- **Call to Action**: [What should audience do next?]
- **Contact Information**: [Email, website, social media if applicable]

**Visual Elements**:
- Background: [Background treatment]
- Typography: [Font styling for closing]

**Design Notes**:
- [Final visual impact considerations]

---

## Design System Reference

### Typography Scale
- **H1 (Slide Titles)**: [Font, size, weight, color]
- **H2 (Section Headers)**: [Font, size, weight, color]
- **Body Text**: [Font, size, weight, color]
- **Data Labels**: [Font, size, weight, color]
- **Captions**: [Font, size, weight, color]

### Color Palette
- **Primary**: [Hex without #] - [Usage description]
- **Secondary**: [Hex without #] - [Usage description]
- **Accent**: [Hex without #] - [Usage description]
- **Background**: [Hex without #] - [Usage description]
- **Text**: [Hex without #] - [Usage description]

### Spacing System
- **Slide Margins**: [Standard margins, e.g., 30pt all sides]
- **Content Padding**: [Padding for content boxes]
- **Element Spacing**: [Gap between elements]

### Visual Patterns
- [List of recurring visual patterns used across slides]
- [Border treatments used]
- [Shape styles used]

---

## Technical Specifications

### HTML Slide Dimensions
```css
body {
  width: 720pt;
  height: 405pt;
  margin: 0;
  padding: 0;
}
```

### Font Stack
```css
font-family: [Primary Font], [Fallback Font], sans-serif;
```

### Required Assets
- [ ] Icons: [List of icons needed with descriptions]
- [ ] Gradients: [List of gradient backgrounds needed]
- [ ] Images: [List of images needed]
- [ ] Charts: [List of charts/graphs to generate]

---

## Implementation Checklist

### Pre-Generation
- [ ] All data for charts is collected and validated
- [ ] Color palette hex codes verified (no # prefix)
- [ ] Font choices are web-safe fonts only
- [ ] Image/icon requirements identified

### During Generation
- [ ] Each slide saved as `slide-{number}.html` (01, 02, 03, etc.)
- [ ] All text wrapped in proper semantic tags (`<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`)
- [ ] No manual bullet symbols used (•, -, *)
- [ ] Gradients and icons rasterized as PNG before HTML creation
- [ ] Layout uses flexbox for proper positioning
- [ ] Placeholders created with `class="placeholder"` for charts

### Post-Generation
- [ ] Preview file created with all slides
- [ ] Visual validation performed
- [ ] Text overflow and positioning checked
- [ ] Ready for PowerPoint export

---

## Notes

### Special Considerations
- [Any slide-specific technical considerations]
- [Complex layouts that need extra attention]
- [Animation or transition notes for future enhancement]

### Alternative Approaches
- [Alternative design or layout ideas considered]
- [Future improvements or iterations]

