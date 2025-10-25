# Slide Inventory: Giải pháp Tối ưu gRPC và Metadata Kubernetes

## Overview
- Total Slides: 13
- Aspect Ratio: 16:9 (720pt × 405pt)
- Font: Arial, Helvetica
- Language: Vietnamese (UTF-8)

## Chart Placeholders

| Slide | Placeholder ID | Chart Type | Description | Data Series |
|-------|---------------|------------|-------------|-------------|
| 03 | message-size-chart | Horizontal Bar Chart | Message size comparison showing current vs limit vs recommended | Agent Message (12MB), Server Limit (10MB), Recommended Max (25MB) |
| 04 | data-waste-chart | Pie Chart | Data waste visualization showing changed vs unchanged metadata | Changed data (15%), Unchanged data (85%) |
| 08 | bandwidth-chart | Line Chart | Bandwidth usage over time comparing polling vs streaming | Polling (flat 10MB/min), Streaming (spike at 12MB then 0.5MB/min) |
| 09 | scalability-chart | Grouped Bar Chart | Metrics at different cluster scales (1k, 10k, 20k pods) | API Requests/sec, Metadata Size (MB), Etcd Latency (ms) |

## Assets Created

### Icons
- `icon-warning.png` - Warning triangle icon (orange FF8C00, 256x256)
- `icon-checkmark.png` - Checkmark icon (blue 4A90E2, 256x256)
- `icon-xmark.png` - X mark icon (red E33737, 256x256)
- `icon-arrow.png` - Right arrow icon (charcoal 292929, 256x256)
- `icon-bullet.png` - Bullet point circle (blue 4A90E2, 256x256)

### No Gradients Required
All backgrounds use solid colors defined in CSS.

## Design System

### Colors (for PowerPoint export - WITHOUT # prefix)
- **Primary Red**: E33737 - Problems, current issues, critical points
- **Secondary Charcoal**: 292929 - Main text, backgrounds for emphasis
- **Accent Blue**: 4A90E2 - Solutions, streaming architecture, positive outcomes
- **Supporting Gray**: CCCBCB - Secondary information, subtle backgrounds
- **Light Gray**: F5F5F5 - Background boxes, section dividers
- **Orange Warning**: FF8C00 - Medium severity, 10k pod scale warnings
- **Yellow Caution**: FFF9E6 - Caution boxes, limitation callouts
- **Light Red**: FFE6E6 - Problem callouts, high severity backgrounds
- **Light Blue**: EBF5FF - Solution boxes, positive callouts
- **White**: FFFFFF - Primary slide backgrounds
- **Text Gray**: 666666 - Secondary text, captions
- **Green**: 2ECC71 - Positive indicators in table

### Typography
- **H1 (Slide Titles)**: Arial Bold, 32pt, Charcoal 292929
- **H2 (Section Headers)**: Arial Bold, 18-20pt, Various (Red E33737 for problems, Blue 4A90E2 for solutions)
- **Body Text**: Arial Regular, 14-16pt, Charcoal 292929
- **Large Numbers/Stats**: Arial Bold, 28pt, Blue 4A90E2
- **Technical Values**: Courier New, 16pt (for sizes like 12MB, 10KB, etc.)
- **Table Text**: Arial Regular, 14pt
- **Metadata/Captions**: Arial Regular, 12pt, Gray 666666

## Slide-by-Slide Summary

1. **Slide 01** - Title Slide: Dark charcoal background with white title text
2. **Slide 02** - Agenda: Light gray box with bullet points using blue icons
3. **Slide 03** - Current Problem: Two-column layout with chart placeholder, warning icon
4. **Slide 04** - Root Cause: Two-column layout with pie chart placeholder, red callout box
5. **Slide 05** - Short-term Solution: Blue solution box and yellow limitation box
6. **Slide 06** - Long-term Solution: Before/after comparison with arrow
7. **Slide 07** - How Streaming Works: Four-step numbered explanation
8. **Slide 08** - Benefits: Two-column layout with line chart placeholder
9. **Slide 09** - Large K8s Risks: Two-column layout with grouped bar chart placeholder
10. **Slide 10** - Trade-offs: Comparison table with color-coded cells
11. **Slide 11** - Integration Challenges: Two sections (challenges and mitigation)
12. **Slide 12** - Recommendations: Four-phase grid layout with colored boxes
13. **Slide 13** - Conclusion: Numbered takeaways with call-to-action box

## Chart Data Details

### Slide 3: Message Size Chart
```javascript
chartData: [
  {
    name: 'Configuration',
    labels: ['Agent Message', 'Server Limit', 'Recommended Max'],
    values: [12, 10, 25]
  }
]
chartOptions: {
  barDir: 'bar', // horizontal
  chartColors: ['E33737', 'E33737', '4A90E2'],
  showTitle: true,
  title: 'Message Size (MB)',
  showCatAxisTitle: true,
  catAxisTitle: 'Configuration Type',
  showValAxisTitle: true,
  valAxisTitle: 'Size (MB)',
  dataLabelPosition: 'outEnd'
}
```

### Slide 4: Data Waste Chart
```javascript
chartData: [
  {
    name: 'Metadata Distribution',
    labels: ['Dữ liệu thay đổi', 'Dữ liệu không đổi'],
    values: [15, 85]
  }
]
chartOptions: {
  chartColors: ['4A90E2', 'E33737'],
  showPercent: true,
  showLegend: true,
  legendPos: 'b',
  showTitle: true,
  title: 'Phân bổ Dữ liệu Metadata'
}
```

### Slide 8: Bandwidth Chart
```javascript
chartData: [
  {
    name: 'Polling',
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    values: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  },
  {
    name: 'Streaming',
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    values: [12, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  }
]
chartOptions: {
  chartColors: ['E33737', '4A90E2'],
  lineSize: 3,
  showTitle: true,
  title: 'Băng thông theo thời gian',
  showCatAxisTitle: true,
  catAxisTitle: 'Thời gian (phút)',
  showValAxisTitle: true,
  valAxisTitle: 'Băng thông (MB/phút)',
  showLegend: true,
  legendPos: 'tr'
}
```

### Slide 9: Scalability Chart
```javascript
// Note: This requires grouped bars showing 3 metrics across 3 scales
// May need to normalize or use separate series
chartData: [
  {
    name: '1k pods',
    labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
    values: [10, 2, 50]
  },
  {
    name: '10k pods',
    labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
    values: [100, 20, 200]
  },
  {
    name: '20k pods',
    labels: ['API Req/sec', 'Metadata (MB)', 'Latency (ms)'],
    values: [200, 40, 500]
  }
]
chartOptions: {
  barDir: 'col',
  chartColors: ['2ECC71', 'FF8C00', 'E33737'],
  showTitle: true,
  title: 'Metrics tại các quy mô cụm khác nhau',
  showCatAxisTitle: true,
  catAxisTitle: 'Metric Type',
  showValAxisTitle: true,
  valAxisTitle: 'Value',
  showLegend: true,
  legendPos: 'b'
}
```

## Technical Notes

### HTML Compliance
- All slides use `width: 720pt; height: 405pt` body dimensions
- All text wrapped in semantic tags (`<p>`, `<h1>`, `<h2>`, `<ul>`, `<ol>`)
- No manual bullet symbols used (proper `<li>` elements)
- No CSS gradients (solid colors only)
- Only web-safe fonts (Arial, Helvetica, Courier New)
- All chart placeholders have `class="placeholder"` and unique IDs
- Vietnamese UTF-8 characters properly encoded

### Color Usage Pattern
- Red (E33737) - Current problems, high severity, polling approach
- Blue (4A90E2) - Solutions, streaming approach, positive outcomes
- Orange (FF8C00) - Medium severity, 10k pod warnings
- Green (2ECC71) - Positive indicators, low severity
- Charcoal (292929) - Primary text, professional grounding
- Gray variations - Supporting information, backgrounds

## Next Steps

After reviewing slides in preview.html:
1. Run `/presentation-kit/export-pptx` to generate PowerPoint file with charts
2. Charts will be added to placeholder positions during export
3. Thumbnails will be generated for validation
4. Any layout issues can be fixed by editing HTML slides and re-exporting

