# Presentation Plan: Giải pháp Tối ưu gRPC và Metadata Kubernetes

## Presentation Metadata

- **Title**: Giải pháp Tối ưu gRPC và Metadata Kubernetes
- **Subtitle**: Từ Polling đến Streaming Architecture
- **Author**: Technical Team
- **Total Slides**: 13
- **Aspect Ratio**: 16:9 (720pt × 405pt)
- **Design System**: Charcoal & Red palette with professional Arial typography

---

## Slide-by-Slide Breakdown

### Slide 1: Title Slide

**Purpose**: Introduce the presentation and establish professional, technical tone

**Layout Type**: Full-slide title layout with dark background

**Content**:
- **Title**: Giải pháp Tối ưu gRPC và Metadata Kubernetes
- **Subtitle**: Từ Polling đến Streaming Architecture
- **Author/Date**: Technical Team | October 2025

**Visual Elements**:
- Background: Dark charcoal `292929` covering entire slide
- Title text: White `FFFFFF`, Arial Bold 40pt
- Subtitle text: Light gray `CCCBCB`, Arial Regular 24pt
- Subtle blue accent line (3pt thick) below subtitle
- Date/author in light gray at bottom

**Design Notes**:
- High contrast with white text on dark background for impact
- Professional, serious tone appropriate for technical proposal
- Minimal decoration, focus on typography
- Blue accent line hints at solution-focused content

---

### Slide 2: Tổng quan

**Purpose**: Set context and present agenda for the presentation

**Layout Type**: Single column with icon-enhanced list

**Content**:

**Text Content**:
- **Heading**: Tổng quan
- **Body Text**:
  - Vấn đề hiện tại với gRPC message size
  - Phân tích nguyên nhân và tác động
  - Giải pháp ngắn hạn và dài hạn
  - Rủi ro với cụm K8s lớn (10k+, 20k+ pods)
  - Trade-offs khi thay đổi kiến trúc
  - Khuyến nghị và bước tiếp theo

**Visual Elements**:
- Simple bullet list with custom icons (small 20x20pt icons in blue `4A90E2` before each item)
- Light gray background box `F5F5F5` containing the agenda list
- Clean white slide background

**Layout Details**:
- **Margins**: 40pt all sides
- **Heading**: Top-left, 32pt
- **Content box**: Centered vertically, 580pt wide
- **Spacing**: 16pt between bullet items

**Design Notes**:
- Clean, straightforward agenda
- Blue icons provide visual interest without distraction
- Sets expectations for comprehensive coverage
- Professional, organized appearance

---

### Slide 3: Vấn đề Hiện tại

**Purpose**: Clearly define the current problem with concrete evidence

**Layout Type**: Two-column layout (50/50 split)

**Content**:

**Text Content**:
- **Heading**: Vấn đề Hiện tại
- **Left Column - Problem Statement**:
  - **Subheading**: Tình trạng
  - Agent gửi message kích thước ~12MB
  - Server cấu hình max size: 10MB
  - → Server không thể xử lý được dữ liệu
  
- **Left Column - Impact**:
  - **Subheading**: Tác động
  - Lỗi xử lý dữ liệu định kỳ
  - Mất mát thông tin metadata
  - Không thể triển khai tại Lotte

**Visual Elements**:
- Right column: Bar chart showing message size comparison
- Red warning icon (40x40pt) next to heading
- Red highlight box around the mismatch (12MB > 10MB)

**Layout Details**:
- **Column Structure**: 50% text (left) / 50% chart (right)
- **Positioning**: Text content starts 60pt from left, chart in right half
- **Spacing**: 20pt between subheadings and content

**Data Visualization**:
- **Chart Type**: Horizontal Bar Chart
- **Data**:
  ```
  Categories: Agent Message, Server Limit, Recommended Max
  Values: 12, 10, 25
  Colors: E33737, E33737, 4A90E2
  ```
- **Chart Configuration**:
  - Title: Message Size (MB)
  - Category Axis: Configuration Type
  - Value Axis: Size (MB)
  - Colors: E33737 for problem bars (Agent, Current Limit), 4A90E2 for solution (Recommended Max)
  - Data labels: Show values on bars
  - Highlight: Red border around Agent bar to emphasize it exceeds limit

**Design Notes**:
- Red color emphasizes problem severity
- Chart makes the mismatch immediately visible
- Quantified problem (not vague)
- Clear, undeniable issue

---

### Slide 4: Nguyên nhân Sâu xa

**Purpose**: Explain the root cause - inefficient polling architecture

**Layout Type**: Two-column layout (45/55 split)

**Content**:

**Text Content**:
- **Heading**: Nguyên nhân Sâu xa
- **Left Column**:
  - **Subheading**: Thu thập định kỳ (Polling)
  - Thu thập TẤT CẢ metadata mỗi 60 giây
  - 80-90% dữ liệu KHÔNG thay đổi
  - Lãng phí tài nguyên hệ thống
  - Tăng tải cho Backend và Agent
  
- **Key Insight** (callout box):
  - "Metadata K8s ít thay đổi nhưng đang thu thập như thể luôn thay đổi"

**Visual Elements**:
- Right column: Pie chart or stacked bar showing data waste
- Orange/red shading for wasted portion
- Callout box with light red background `FFE6E6` for key insight

**Layout Details**:
- **Column Structure**: 45% text (left) / 55% chart (right)
- **Callout box**: Below left column, 90% of column width
- **Spacing**: 24pt between sections

**Data Visualization**:
- **Chart Type**: Pie Chart or Stacked Bar Chart
- **Data**:
  ```
  Categories: Dữ liệu thay đổi, Dữ liệu không đổi
  Values: 15, 85
  Colors: 4A90E2, E33737
  ```
- **Chart Configuration**:
  - Title: Phân bổ Dữ liệu Metadata
  - Data labels: Show percentages (15%, 85%)
  - Colors: 4A90E2 for changed data (small), E33737 for unchanged/wasted (large)
  - Legend position: Bottom
  - Emphasis: Large red portion shows waste visually

**Design Notes**:
- Visualization immediately shows inefficiency
- Red dominates to emphasize waste
- Specific percentages add credibility
- Root cause clearly explained

---

### Slide 5: Giải pháp Ngắn hạn

**Purpose**: Present short-term fix with honest acknowledgment of limitations

**Layout Type**: Single column with prominent callout

**Content**:

**Text Content**:
- **Heading**: Giải pháp Ngắn hạn
- **Main Content**:
  - **Subheading**: Tăng giới hạn message size
  - Tăng max size từ 10MB lên 20-30MB
  - Cho phép xử lý message hiện tại (12MB)
  - Đáp ứng triển khai tại Lotte
  
- **Callout Box - Limitations**:
  - **Label**: ⚠️ Hạn chế
  - Chỉ là giải pháp TẠM THỜI
  - Không giải quyết vấn đề gốc rễ
  - Vẫn lãng phí tài nguyên
  - Không mở rộng tốt với cụm K8s lớn

**Visual Elements**:
- Large callout box with yellow/orange background `FFF9E6` for limitations section
- Warning icon (40x40pt) in callout
- Checkmark icons (20x20pt, blue) for benefits
- X-mark icons (20x20pt, red) for limitations

**Layout Details**:
- **Heading**: Top-left
- **Main content**: Centered, 580pt wide box with light blue background `EBF5FF`
- **Callout box**: Below main content, full width (640pt), yellow background
- **Spacing**: 20pt between sections

**Design Notes**:
- Blue box for solution conveys positive action
- Yellow callout clearly signals caution/limitations
- Honest assessment builds credibility
- Balances immediate need with long-term concern
- Icons provide quick visual scanning

---

### Slide 6: Giải pháp Dài hạn

**Purpose**: Introduce streaming architecture as the fundamental solution

**Layout Type**: Single column with key points

**Content**:

**Text Content**:
- **Heading**: Giải pháp Dài hạn: Streaming Architecture
- **Subheading**: Thay đổi kiến trúc thu thập metadata

**Main Content**:
- **Thay vì** (in red, left-aligned):
  - Thu thập TẤT CẢ metadata mỗi 60 giây
  - Gửi message lớn (12MB) định kỳ
  
- **→** (large arrow in center)

- **Áp dụng** (in blue, right-aligned):
  - Stream TẤT CẢ khi khởi động (lần đầu)
  - Chỉ gửi THAY ĐỔI khi có sự kiện
  - Message nhỏ (1-10KB) theo sự kiện

**Visual Elements**:
- Before/After comparison layout with arrow between
- Red background box for "Thay vì" section
- Blue background box for "Áp dụng" section
- Large arrow (→) in center

**Layout Details**:
- Three-column visual flow: Before (red) → Arrow → After (blue)
- Each section 200pt wide, 16pt gap between
- Vertically centered content

**Design Notes**:
- Side-by-side comparison makes change clear
- Color coding: red (old/problem) vs blue (new/solution)
- Arrow provides clear directional flow
- Simplified explanation suitable for all technical levels
- Sets up deeper explanation in following slides

---

### Slide 7: Streaming hoạt động như thế nào?

**Purpose**: Explain streaming mechanism in concrete, technical terms

**Layout Type**: Two-column layout (40/60 split)

**Content**:

**Text Content**:
- **Heading**: Streaming hoạt động như thế nào?
- **Left Column - Explanation**:
  - **1. Kết nối ban đầu**
  - Agent kết nối gRPC streaming
  - Gửi toàn bộ metadata hiện tại
  - Kích thước: 12MB (một lần duy nhất)
  
  - **2. Watch Kubernetes API**
  - Agent theo dõi K8s resources
  - Kubernetes gửi sự kiện khi có thay đổi
  
  - **3. Stream incremental updates**
  - Agent nhận sự kiện: Added, Modified, Deleted
  - Gửi từng sự kiện qua gRPC stream
  - Kích thước: 1-10KB mỗi event
  
  - **4. Backend xử lý**
  - Nhận stream liên tục
  - Cập nhật state tăng dần
  - Không cần load toàn bộ 12MB mỗi lần

**Visual Elements**:
- Right column: Sequence diagram or flow illustration
  - Agent → gRPC → Backend (initial sync)
  - K8s → Agent (watch events)
  - Agent → Backend (stream events)
- Icons for each step (40x40pt)
- Arrows showing data flow

**Layout Details**:
- **Column Structure**: 40% text (left) / 60% diagram (right)
- **Numbered steps**: Bold numbers in blue circles
- **Spacing**: 16pt between steps

**Design Notes**:
- Step-by-step explanation builds understanding
- Technical but accessible language
- Specific sizes (12MB, 1-10KB) make comparison concrete
- Flow diagram reinforces sequential understanding
- Blue color for solution elements

---

### Slide 8: Lợi ích của Streaming

**Purpose**: Quantify benefits with concrete metrics and visualization

**Layout Type**: Two-column layout (50/50 split)

**Content**:

**Text Content**:
- **Heading**: Lợi ích của Streaming
- **Left Column - Key Benefits**:
  - **Giảm kích thước message**
  - 12MB → 1-10KB mỗi event
  - Giảm 1000x
  
  - **Giảm băng thông**
  - 10MB/phút → 0.5MB/phút (sau sync)
  - Giảm 95%
  
  - **Giảm tải API server**
  - Request liên tục → Watch connection
  - Giảm 70-90%
  
  - **Real-time updates**
  - Độ trễ: 30s trung bình → <1s
  - Cải thiện 30x

**Visual Elements**:
- Right column: Line chart showing bandwidth usage over time
- Large bold numbers for percentages (1000x, 95%, etc.) in blue
- Icons for each benefit category

**Layout Details**:
- **Column Structure**: 50% benefits list (left) / 50% chart (right)
- **Benefit items**: Icon + metric + description
- **Number emphasis**: Very large font (36pt) for key metrics

**Data Visualization**:
- **Chart Type**: Line Chart (Time vs Bandwidth)
- **Data**:
  ```
  Time (minutes): 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  Polling (MB/min): 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
  Streaming (MB/min): 12, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5
  ```
- **Chart Configuration**:
  - Title: Băng thông theo thời gian
  - X-axis: Thời gian (phút)
  - Y-axis: Băng thông (MB/phút)
  - Colors: E33737 for Polling (flat high line), 4A90E2 for Streaming (spike then low)
  - Legend: Top right
  - Annotation: Arrow pointing to streaming spike with label "Initial sync"

**Design Notes**:
- Quantified benefits add credibility
- Chart dramatically shows difference
- Numbers are concrete, not vague claims
- Blue color reinforces positive solution
- Visual + text reinforces message

---

### Slide 9: Rủi ro với Cụm K8s Lớn

**Purpose**: Address scalability risks at 10k+ and 20k+ pod scales

**Layout Type**: Two-column layout (45/55 split)

**Content**:

**Text Content**:
- **Heading**: Rủi ro với Cụm K8s Lớn
- **Left Column**:
  - **Với cụm 10,000+ pods** (orange label `FF8C00`):
  - API server trở thành bottleneck
  - Etcd database: 8-12GB
  - Network bandwidth: 50-100MB mỗi lần poll
  - CPU spikes khi mass polling
  
  - **Với cụm 20,000+ pods** (red label `E33737`):
  - Gần giới hạn K8s (tested max 150k pods)
  - Etcd latency: <100ms → 500ms+
  - API server cần horizontal scaling
  - Memory: 30-50MB mỗi agent
  - Nguy cơ cascading failures

**Visual Elements**:
- Right column: Grouped bar chart showing metrics at different scales
- Color gradient: green (1k) → orange (10k) → red (20k)
- Warning icon with severity levels

**Layout Details**:
- **Column Structure**: 45% text (left) / 55% chart (right)
- **Section boxes**: Light orange `FFF4E6` for 10k, light red `FFE6E6` for 20k
- **Spacing**: 20pt between sections

**Data Visualization**:
- **Chart Type**: Grouped Bar Chart
- **Data**:
  ```
  Scales: 1k pods, 10k pods, 20k pods
  Metrics:
    - API Requests/sec: 10, 100, 200
    - Metadata Size (MB): 2, 20, 40
    - Etcd Latency (ms): 50, 200, 500
  ```
- **Chart Configuration**:
  - Title: Metrics tại các quy mô cụm khác nhau
  - X-axis: Cluster Scale
  - Y-axis: Metric Value (normalized scale)
  - Colors: 2ECC71 (green) for 1k, FF8C00 (orange) for 10k, E33737 (red) for 20k
  - Legend: Bottom
  - Three grouped bars for each scale

**Design Notes**:
- Specific scales (10k, 20k) address user requirement
- Concrete numbers show real risks
- Color escalation (green → orange → red) shows increasing severity
- Technical details establish credibility
- Chart makes scale problem visual

---

### Slide 10: Trade-offs Kiến trúc

**Purpose**: Honest assessment of architectural trade-offs

**Layout Type**: Two-column comparison table layout

**Content**:

**Text Content**:
- **Heading**: Trade-offs Kiến trúc
- **Comparison Table**:

| **Tiêu chí** | **Polling (hiện tại)** | **Streaming (đề xuất)** |
|--------------|------------------------|-------------------------|
| **Hiệu quả tài nguyên** | ❌ Thấp (waste 80-90%) | ✅ Cao (chỉ gửi thay đổi) |
| **Độ phức tạp** | ✅ Đơn giản | ❌ Phức tạp hơn |
| **Khả năng mở rộng** | ❌ Kém (linear scale) | ✅ Tốt (constant overhead) |
| **Real-time** | ❌ Độ trễ 0-60s | ✅ Độ trễ <1s |
| **Tích hợp** | ✅ Đơn giản | ⚠️ Cần điều chỉnh CM/Alarm |
| **Operational** | ✅ Quen thuộc | ❌ Pattern mới, monitoring mới |

**Visual Elements**:
- Colored cells or icons for each rating
- Red (❌) for poor, yellow (⚠️) for moderate, green (✅) for good
- Clean table with alternating row backgrounds

**Layout Details**:
- **Table**: Centered, 640pt wide
- **Column widths**: 30% criteria, 35% polling, 35% streaming
- **Cell padding**: 12pt
- **Header row**: Dark charcoal `292929` background, white text

**Design Notes**:
- Honest comparison builds trust
- Shows streaming isn't perfect - acknowledges complexity
- Visual symbols (✅❌⚠️) enable quick scanning
- Color coding reinforces positive/negative
- Balanced view: both pros and cons
- Table format allows easy comparison

---

### Slide 11: Thách thức Tích hợp

**Purpose**: Address integration challenges and mitigation strategies

**Layout Type**: Single column with subsections

**Content**:

**Text Content**:
- **Heading**: Thách thức Tích hợp và Giảm thiểu Rủi ro

**Challenges Section**:
- **Subheading**: ⚠️ Thách thức
- **CM Service**: Có thể expect periodic snapshots → cần adapt cho event stream
- **Alarm Service**: Cần xử lý streaming events thay vì periodic state checks
- **Events Service**: Potential overlap với K8s event streaming
- **Database**: Schema cần hỗ trợ incremental updates hiệu quả

**Mitigation Section**:
- **Subheading**: ✅ Giảm thiểu Rủi ro
- **Hybrid mode**: Hỗ trợ cả polling (fallback) và streaming ban đầu
- **Phased rollout**: Test với cụm nhỏ trước, sau đó scale dần
- **Monitoring**: Track stream health, event lag, missing updates
- **State reconciliation**: Periodic full sync (24h) để catch missed events

**Visual Elements**:
- Two-section layout with different background colors
- Orange/yellow background `FFF9E6` for challenges
- Blue/green background `EBF5FF` for mitigation
- Icons: Warning icon for challenges, checkmark for mitigation

**Layout Details**:
- **Section boxes**: Full width (640pt), separate colored backgrounds
- **Spacing**: 24pt between challenge and mitigation sections
- **Lists**: Bullet points with 16pt spacing

**Design Notes**:
- Acknowledges concerns transparently
- Provides concrete mitigation for each challenge
- Two-section structure: problem → solution
- Color coding: yellow (caution) → blue (solution)
- Builds confidence that risks are manageable
- Specific strategies (not vague "we'll handle it")

---

### Slide 12: Khuyến nghị

**Purpose**: Present clear recommendations and path forward

**Layout Type**: Single column with phased approach

**Content**:

**Text Content**:
- **Heading**: Khuyến nghị và Bước tiếp theo

**Immediate (Ngay lập tức)**:
- **Phase 0**: Tăng message size lên 20-30MB
- Timeline: 1 tuần
- Risk: Thấp
- Goal: Cho phép triển khai Lotte

**Short-term (3-6 tháng)**:
- **Phase 1**: Implement streaming architecture
- Design and prototype streaming pattern
- Test với dev/test clusters
- Timeline: 3-4 tháng
- Risk: Trung bình

**Medium-term (6-12 tháng)**:
- **Phase 2**: Phased rollout
- Deploy to small production clusters (< 1k pods)
- Monitor and refine
- Gradual expansion to larger clusters
- Timeline: 4-6 tháng
- Risk: Thấp-Trung bình

**Long-term (12+ tháng)**:
- **Phase 3**: Full migration
- All clusters on streaming
- Deprecate polling mode
- Timeline: 2-4 tháng
- Risk: Thấp

**Visual Elements**:
- Timeline visualization or phase boxes
- Color coding: Red (immediate), Orange (short-term), Yellow (medium-term), Green (long-term)
- Progress arrows between phases
- Risk indicators (low/medium badges)

**Layout Details**:
- **Phase boxes**: Stacked vertically or horizontal timeline
- **Each phase**: 600pt wide box with colored left border (8pt)
- **Content**: Phase name, timeline, risk, key activities
- **Spacing**: 16pt between phases

**Design Notes**:
- Clear, actionable roadmap
- Phased approach reduces risk
- Timelines set realistic expectations
- Risk assessment for each phase
- Shows both quick fix and long-term solution
- Blue color dominates (solution-focused)

---

### Slide 13: Kết luận

**Purpose**: Summarize key messages and call to action

**Layout Type**: Single column with summary points

**Content**:

**Text Content**:
- **Heading**: Kết luận

**Key Takeaways**:
1. **Vấn đề hiện tại**: Message 12MB > 10MB limit, polling không hiệu quả
2. **Ngắn hạn**: Tăng limit lên 20-30MB cho Lotte deployment
3. **Dài hạn**: Streaming architecture giải quyết gốc rễ
4. **Lợi ích**: Giảm 1000x message size, 95% bandwidth, real-time <1s
5. **Trade-offs**: Tăng complexity nhưng scalability và efficiency tốt hơn nhiều
6. **Rủi ro K8s lớn**: Polling không sustainable ở 10k+, 20k+ pods
7. **Path forward**: Phased approach với mitigation rõ ràng

**Call to Action**:
- Approve immediate message size increase
- Commit resources for streaming architecture development
- Align on phased rollout timeline

**Visual Elements**:
- Numbered list with large blue numbers
- Blue callout box for call to action
- Clean, summarizing layout

**Layout Details**:
- **Takeaways**: Numbered list, 600pt wide, centered
- **Call to action box**: Blue background `EBF5FF`, full width, bottom of slide
- **Spacing**: 16pt between items

**Design Notes**:
- Concise summary of entire presentation
- Numbered list makes it scannable
- Blue dominates (forward-looking, solution-focused)
- Clear call to action
- Leaves audience with concrete next steps
- Professional, confident close

---

## Design System Reference

### Typography Scale

- **H1 (Slide Titles)**: Arial Bold, 32-36pt, Charcoal `292929`
- **H2 (Section Headers)**: Arial Bold, 24-26pt, Charcoal `292929` or Red `E33737` for emphasis
- **H3 (Subheadings)**: Arial Bold, 18-20pt, Charcoal `292929`
- **Body Text**: Arial Regular, 16-18pt, Charcoal `292929`
- **Data Labels**: Arial Regular, 14pt, Charcoal `292929`
- **Large Numbers/Stats**: Arial Bold, 36-48pt, Red `E33737` (problems) or Blue `4A90E2` (solutions)
- **Captions**: Arial Regular, 12-14pt, Gray `666666`
- **Technical Values**: Courier New, 16pt, Charcoal `292929`

### Color Palette

- **Primary Red**: E33737 - Problems, current issues, critical points, high severity
- **Secondary Charcoal**: 292929 - Main text, backgrounds for emphasis, professional grounding
- **Accent Blue**: 4A90E2 - Solutions, streaming architecture, positive outcomes
- **Supporting Gray**: CCCBCB - Secondary information, subtle backgrounds, gridlines
- **Light Gray**: F5F5F5 - Background boxes, section dividers
- **Orange Warning**: FF8C00 - Medium severity, 10k pod scale warnings
- **Yellow Caution**: FFF9E6 - Caution boxes, limitation callouts
- **Light Red**: FFE6E6 - Problem callouts, high severity backgrounds
- **Light Blue**: EBF5FF - Solution boxes, positive callouts
- **White**: FFFFFF - Primary slide backgrounds, text on dark backgrounds
- **Text Dark**: 292929 - Primary text on light backgrounds
- **Text Light**: F4F4F4 - Text on dark charcoal backgrounds
- **Text Gray**: 666666 - Secondary text, captions

### Spacing System

- **Slide Margins**: 40pt all sides (consistent breathing room)
- **Content Padding**: 20pt inside boxes and panels
- **Element Spacing**: 16pt between list items, 24pt between sections
- **Column Gaps**: 20pt between columns in two-column layouts
- **Header Spacing**: 24pt below slide titles

### Visual Patterns

**Borders and Dividers**:
- Thick left border (8pt) in appropriate color for emphasis slides
- Horizontal divider lines (3pt) in gray `CCCBCB` for section separation
- Subtle borders (1pt) on data boxes and tables

**Background Treatments**:
- White `FFFFFF` for standard content slides
- Dark charcoal `292929` for title slide
- Light gray `F5F5F5` for section transition slides
- Colored callout boxes: yellow `FFF9E6` (caution), light red `FFE6E6` (problems), light blue `EBF5FF` (solutions)

**Icons and Symbols**:
- Size: 40x40pt for major icons, 20x20pt for list icons
- Style: Simple, monochromatic, line-style icons
- Colors: Match context (red for problems, blue for solutions, orange for warnings)
- Common icons: Warning (⚠️), Checkmark (✅), X-mark (❌), Arrow (→)

**Chart Styling**:
- Minimal gridlines (light gray `CCCBCB` at 50% opacity)
- Direct data labels on elements (minimize legends)
- Clear axis titles and units
- Consistent color usage: red for problems/current, blue for solutions/proposed
- Clean, professional chart backgrounds (white or light gray)

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
font-family: Arial, Helvetica, sans-serif;
```

### Required Assets

#### Icons
- [ ] Warning icon (40x40pt, orange `FF8C00`)
- [ ] Checkmark icon (40x40pt, blue `4A90E2`)
- [ ] X-mark icon (40x40pt, red `E33737`)
- [ ] Arrow right icon (40x40pt, charcoal `292929`)
- [ ] Bullet point icons (20x20pt, blue `4A90E2`) for agenda
- [ ] Flow icons for streaming diagram (40x40pt each): server, agent, kubernetes

#### Charts
- [ ] Slide 3: Message size comparison (Horizontal bar chart)
- [ ] Slide 4: Data waste visualization (Pie chart or stacked bar)
- [ ] Slide 8: Bandwidth over time (Line chart)
- [ ] Slide 9: Scalability metrics (Grouped bar chart)

#### Diagrams
- [ ] Slide 7: Streaming sequence flow diagram (custom graphic)

#### Background Elements
- [ ] Colored callout boxes (various colors with transparency)
- [ ] Section divider lines
- [ ] Table cell backgrounds

---

## Implementation Checklist

### Pre-Generation
- [x] All data for charts is collected and validated
- [x] Color palette hex codes verified (no # prefix)
- [x] Font choices are web-safe fonts only (Arial, Helvetica)
- [x] Image/icon requirements identified
- [x] Content narrative flows logically
- [x] Technical terms explained appropriately for audience

### During Generation
- [ ] Each slide saved as `slide-{number}.html` (01, 02, 03, etc.)
- [ ] All text wrapped in proper semantic tags (`<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`)
- [ ] No manual bullet symbols used (•, -, *)
- [ ] Icons created as PNG before HTML creation
- [ ] Layout uses flexbox for proper positioning
- [ ] Placeholders created with `class="placeholder"` for charts
- [ ] Consistent 720pt × 405pt body dimensions
- [ ] Margins and spacing follow design system
- [ ] Color codes used without # prefix

### Post-Generation
- [ ] Preview file created with all slides
- [ ] Visual validation performed for each slide
- [ ] Text overflow and positioning checked
- [ ] Chart placeholders correctly positioned
- [ ] Two-column layouts properly balanced
- [ ] Ready for PowerPoint export with charts

---

## Notes

### Special Considerations

- **Vietnamese language**: Ensure proper UTF-8 encoding for all Vietnamese characters (ă, â, đ, ê, ô, ơ, ư and tones)
- **Technical terminology**: Mix of English technical terms (gRPC, streaming, polling, K8s) and Vietnamese explanations
- **Code/technical values**: Use monospace Courier New for: 12MB, 10MB, 1-10KB, 10,000 pods, etc.
- **Slide 7 diagram**: Custom flow diagram will need manual creation or simplified representation
- **Table on Slide 10**: HTML table with proper styling, alternating row backgrounds
- **Chart colors**: Ensure consistent use of red (current/problem) vs blue (proposed/solution) across all charts

### Alternative Approaches

- **Slide 7 alternative**: If sequence diagram is too complex, could use simplified bullet-point timeline instead
- **Slide 9 alternative**: Could use table instead of chart if grouped bars are too complex
- **Slide 10 alternative**: Could split trade-offs into two slides (pros vs cons) if table feels too dense

### Content Adjustments Based on Feedback

- If audience prefers more technical depth: Expand Slide 7 with code examples or API details
- If time is limited: Combine Slides 10-11 into single trade-offs slide
- If demo is possible: Add live comparison slide showing polling vs streaming in action
- If integration concerns dominate: Expand Slide 11 with more detailed migration strategy per service

