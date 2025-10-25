---
Description: create a comprehensive presentation plan with design specifications.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** review the user input before proceeding (if not empty).

## Overview

The text the user enters after `/persentation-kit.plan` in the activation message **is** the user request. Assume you always have this text available in this conversation even if `$ARGUMENTS` appears below. Do not ask the user to repeat unless they provide a blank command.

**Create a short name** (2-4 words) for <presentation_name>:
- Analyze the description and extract the most meaningful keywords
- Create a short name of 2-4 words that captures the essence of the requirement
- Keep the name short but descriptive enough to understand the meaning at first glance


## Design Principles

**CRITICAL**: Before creating presentations, analyze the content and choose appropriate design elements:

1. **Consider the subject matter**: What is this presentation about? What tone, industry, or mood does it suggest?
2. **Check for branding**: If the user mentions a company/organization, consider their brand colors and identity
3. **Match palette to content**: Select colors that reflect the subject
4. **State your approach**: Explain your design choices before writing code

**Requirements**:

- ✅ State your content-informed design approach BEFORE writing code
- ✅ Use web-safe fonts only: Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana, Tahoma, Trebuchet MS, Impact
- ✅ Create clear visual hierarchy through size, weight, and color
- ✅ Ensure readability: strong contrast, appropriately sized text, clean alignment
- ✅ Be consistent: repeat patterns, spacing, and visual language across slides

#### Color Palette Selection

**Choosing colors creatively**:

- **Think beyond defaults**: What colors genuinely match this specific topic? Avoid autopilot choices.
- **Consider multiple angles**: Topic, industry, mood, energy level, target audience, brand identity (if mentioned)
- **Be adventurous**: Try unexpected combinations - a healthcare presentation doesn't have to be green, finance doesn't have to be navy
- **Build your palette**: Pick 3-5 colors that work together (dominant colors + supporting tones + accent)
- **Ensure contrast**: Text must be clearly readable on backgrounds

**Example color palettes** (use these to spark creativity - choose one, adapt it, or create your own):

1. **Classic Blue**: Deep navy (#1C2833), slate gray (#2E4053), silver (#AAB7B8), off-white (#F4F6F6)
2. **Teal & Coral**: Teal (#5EA8A7), deep teal (#277884), coral (#FE4447), white (#FFFFFF)
3. **Bold Red**: Red (#C0392B), bright red (#E74C3C), orange (#F39C12), yellow (#F1C40F), green (#2ECC71)
4. **Warm Blush**: Mauve (#A49393), blush (#EED6D3), rose (#E8B4B8), cream (#FAF7F2)
5. **Burgundy Luxury**: Burgundy (#5D1D2E), crimson (#951233), rust (#C15937), gold (#997929)
6. **Deep Purple & Emerald**: Purple (#B165FB), dark blue (#181B24), emerald (#40695B), white (#FFFFFF)
7. **Cream & Forest Green**: Cream (#FFE1C7), forest green (#40695B), white (#FCFCFC)
8. **Pink & Purple**: Pink (#F8275B), coral (#FF574A), rose (#FF737D), purple (#3D2F68)
9. **Lime & Plum**: Lime (#C5DE82), plum (#7C3A5F), coral (#FD8C6E), blue-gray (#98ACB5)
10. **Black & Gold**: Gold (#BF9A4A), black (#000000), cream (#F4F6F6)
11. **Sage & Terracotta**: Sage (#87A96B), terracotta (#E07A5F), cream (#F4F1DE), charcoal (#2C2C2C)
12. **Charcoal & Red**: Charcoal (#292929), red (#E33737), light gray (#CCCBCB)
13. **Vibrant Orange**: Orange (#F96D00), light gray (#F2F2F2), charcoal (#222831)
14. **Forest Green**: Black (#191A19), green (#4E9F3D), dark green (#1E5128), white (#FFFFFF)
15. **Retro Rainbow**: Purple (#722880), pink (#D72D51), orange (#EB5C18), amber (#F08800), gold (#DEB600)
16. **Vintage Earthy**: Mustard (#E3B448), sage (#CBD18F), forest green (#3A6B35), cream (#F4F1DE)
17. **Coastal Rose**: Old rose (#AD7670), beaver (#B49886), eggshell (#F3ECDC), ash gray (#BFD5BE)
18. **Orange & Turquoise**: Light orange (#FC993E), grayish turquoise (#667C6F), white (#FCFCFC)

#### Visual Details Options

**Geometric Patterns**:

- Diagonal section dividers instead of horizontal
- Asymmetric column widths (30/70, 40/60, 25/75)
- Rotated text headers at 90° or 270°
- Circular/hexagonal frames for images
- Triangular accent shapes in corners
- Overlapping shapes for depth

**Border & Frame Treatments**:

- Thick single-color borders (10-20pt) on one side only
- Double-line borders with contrasting colors
- Corner brackets instead of full frames
- L-shaped borders (top+left or bottom+right)
- Underline accents beneath headers (3-5pt thick)

**Typography Treatments**:

- Extreme size contrast (72pt headlines vs 11pt body)
- All-caps headers with wide letter spacing
- Numbered sections in oversized display type
- Monospace (Courier New) for data/stats/technical content
- Condensed fonts (Arial Narrow) for dense information
- Outlined text for emphasis

**Chart & Data Styling**:

- Monochrome charts with single accent color for key data
- Horizontal bar charts instead of vertical
- Dot plots instead of bar charts
- Minimal gridlines or none at all
- Data labels directly on elements (no legends)
- Oversized numbers for key metrics

**Layout Innovations**:

- Full-bleed images with text overlays
- Sidebar column (20-30% width) for navigation/context
- Modular grid systems (3×3, 4×4 blocks)
- Z-pattern or F-pattern content flow
- Floating text boxes over colored shapes
- Magazine-style multi-column layouts

**Background Treatments**:

- Solid color blocks occupying 40-60% of slide
- Gradient fills (vertical or diagonal only)
- Split backgrounds (two colors, diagonal or vertical)
- Edge-to-edge color bands
- Negative space as a design element

### Layout Tips

**When creating slides with charts or tables:**

- **Two-column layout (PREFERRED)**: Use a header spanning the full width, then two columns below - text/bullets in one column and the featured content in the other. This provides better balance and makes charts/tables more readable. Use flexbox with unequal column widths (e.g., 40%/60% split) to optimize space for each content type.
- **Full-slide layout**: Let the featured content (chart/table) take up the entire slide for maximum impact and readability
- **NEVER vertically stack**: Do not place charts/tables below text in a single column - this causes poor readability and layout issues


## Workflow Steps

### Step 1: Analyze User Requirements

**What to do:**
1. Extract and understand the user's request
2. Identify the presentation's purpose and target audience
3. Determine constraints (duration, slide count, tone, special requirements)
4. Ask clarifying questions if needed (audience level, specific data sources, branding requirements)

**Key Questions to Answer:**
- What is the main goal of this presentation?
- Who is the target audience?
- What should the audience learn or do after viewing?
- Are there any specific data sources or references to use?
- What is the expected presentation duration and slide count?

---

### Step 2: Create Presentation Directory Structure

**What to do:**
1. Generate a unique presentation name from the topic (lowercase, hyphenated)
2. Create directory: `decks/<presentation_name>/`
3. Prepare subdirectories for later use: `decks/<presentation_name>/slides/`

**Example:**
```bash
# For "AI in Healthcare" presentation
mkdir -p decks/ai-in-healthcare/slides
```

---

### Step 3: Develop Research Plan

**What to do:**
1. Break down the presentation topic into 3-5 key research areas
2. Identify specific questions to answer for each area
3. List potential information sources (web search terms, databases, reports)
4. Prioritize research based on presentation goals

**Research Areas Should Include:**
- Background/context information
- Current trends or statistics
- Key challenges or opportunities
- Case studies or examples
- Future outlook or recommendations

---

### Step 4: Conduct Research

**What to do:**
1. Use web search for each research area identified in Step 3
2. Gather quantitative data (statistics, numbers, percentages)
3. Collect qualitative insights (trends, expert opinions, case studies)
4. Identify data suitable for visualization (comparisons, trends, distributions)
5. Document all sources for citations

**Best Practices:**
- Search for recent information (prefer sources from last 1-2 years)
- Look for authoritative sources (research institutions, industry reports, gov data)
- Collect multiple data points for each key topic
- Note specific numbers and statistics that can become charts
- Save URLs and source names for references

**Example Search Queries:**
- "[Topic] statistics 2024"
- "[Topic] market trends current"
- "[Topic] industry report"
- "[Topic] case study examples"
- "[Topic] future predictions"

---

### Step 5: Organize Research Findings

**What to do:**
1. Group findings by research area/topic
2. Write 2-3 sentence summaries for each topic
3. List 3-5 key points with supporting data for each topic
4. Identify specific data for visualization (charts/graphs)
5. Document all sources properly

**Format for Each Topic:**
```markdown
### [Topic Name]

**Summary**: [2-3 sentence overview]

**Key Points**:
- [Finding with specific data/numbers]
- [Finding with specific data/numbers]
- [Finding with specific data/numbers]

**Data for Visualization**:
- [Chart-ready data: "Revenue growth: Q1: $1.2M, Q2: $1.5M, Q3: $1.8M, Q4: $2.1M"]
- [Comparison data: "Market share: Company A: 35%, B: 28%, C: 22%, Others: 15%"]

**Sources**: [URLs or citations]
```

---

### Step 6: Create Content Narrative

**What to do:**
1. Design the story arc from introduction to conclusion
2. Define the primary message and 2-3 supporting messages
3. Group content into logical sections (Introduction, 2-4 main sections, Conclusion)
4. Ensure smooth flow between topics

**Narrative Structure:**
- **Hook**: Start with attention-grabbing insight or question
- **Context**: Provide background and why topic matters
- **Core Content**: Present main findings organized logically
- **Implications**: Show what it means for the audience
- **Action**: End with clear takeaway or call-to-action

---

### Step 7: Design Visual Direction

**CRITICAL: Read Design Principles**

**What to do:**
1. **Analyze the subject matter**: What does this topic suggest visually?
   - Healthcare? Education? Finance? Technology? Environmental?
   - Serious/professional or creative/innovative tone?
   - Corporate, academic, or general audience?

2. **Choose appropriate color palette**:
   - Review color palettes
   - Select palette that matches topic, industry, and mood
   - OR create custom palette (3-5 colors with good contrast)
   - **State your reasoning**: Why does this palette fit the content?

3. **Select typography approach**:
   - **Web-safe fonts ONLY**: Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana, Tahoma, Trebuchet MS, Impact
   - Choose fonts for headings and body text
   - Plan size hierarchy (e.g., H1: 36pt, H2: 24pt, Body: 14pt)

4. **Choose visual treatments**:
   - Geometric patterns (diagonal sections, asymmetric columns, rotated elements)
   - Border treatments (thick borders, corner brackets, L-shaped frames)
   - Typography treatments (size contrast, all-caps, outlined text)
   - Background treatments (solid color blocks, gradients, split backgrounds)

5. **Plan chart styling approach**:
   - Colors for different chart series
   - Visual style (minimal gridlines, oversized numbers, etc.)

**Example Design Direction:**
```markdown
### Design Direction

**Subject Analysis**: This is a technology innovation presentation for executives - 
requires professional credibility with modern, forward-thinking visual language.

**Color Palette**: Deep Purple & Emerald 
- Rationale: Purple suggests innovation and creativity; emerald adds growth/sustainability; 
  dark blue provides corporate credibility. Creates modern, high-tech feel appropriate for 
  forward-looking tech topics.
- Primary: Purple (#B165FB) - headings, accent shapes
- Secondary: Dark Blue (#181B24) - backgrounds, grounding elements  
- Accent: Emerald (#40695B) - data highlights, call-to-actions
- Background: White (#FFFFFF) - clean, professional
- Text: Dark Blue (#181B24) - high contrast readability

**Typography**:
- Headings: Arial, bold, 32-36pt
- Body: Arial, regular, 14-16pt
- Data: Arial, bold, 18-24pt for emphasis

**Visual Treatments**:
- Asymmetric two-column layouts (40/60 split)
- Thick left borders (8pt) in accent colors for emphasis
- Oversized numbers for key statistics
- Minimal backgrounds with strategic color blocks

**Chart Styling**:
- Colors: B165FB, 40695B, 181B24 (no # prefix)
- Minimal gridlines
- Data labels directly on elements
```

---

### Step 8: Plan Data Visualizations

**What to do:**
1. Review all quantitative data collected
2. Select appropriate chart types for each dataset
3. Plan specific chart configurations

**Chart Type Selection Guide:**
- **Bar Chart**: Comparing categories, showing rankings
- **Line Chart**: Showing trends over time
- **Pie Chart**: Showing composition/parts of whole (use sparingly)
- **Scatter Plot**: Showing correlations between two variables
- **Table**: Precise values, multiple dimensions

**For Each Chart, Document:**
- Chart type
- Data to display (specific numbers)
- Axis labels
- Colors (hex codes without # prefix)
- Title

---

### Step 9: Create context.md File

**What to do:**
1. Use the template at `templates/context.md`
2. Fill in all sections with research findings and planning
3. Save to `decks/<presentation_name>/context.md`

**Sections to Complete:**
- User Requirements (from Step 1)
- Research Plan (from Step 3)
- Research Findings (from Steps 4-5)
- Content Organization (from Step 6)
- Design Direction (from Step 7)
- Data Visualization Strategy (from Step 8)

---

### Step 10: Create Detailed Slide Plan

**What to do:**
1. Use the template at `templates/plan.md`
2. Create detailed specifications for each slide
3. Save to `decks/<presentation_name>/plan.md`

**For Each Slide, Specify:**

**Slide Purpose**: What does this slide accomplish?

**Layout Type**: 
- Single column full-width
- Two-column (specify split ratio like 40/60)
- Full-bleed image with text overlay
- Three-column grid
- Title-only slide

**Content**:
- **Text Content**: All headings, body text, bullet points
  - Write actual content, not placeholders
  - Keep text concise (3-5 bullets maximum per slide)
  - Use action-oriented language
- **Visual Elements**: Describe any images, icons, shapes needed
- **Data Visualization**: Complete chart specifications if applicable

**Layout Details**:
- Column structure and widths
- Margins and spacing
- Element positioning

**Design Notes**:
- Specific color usage for this slide
- Typography treatments
- Special styling

**Chart Specifications (if applicable)**:
```markdown
**Data Visualization**:
- **Chart Type**: Bar Chart
- **Data Source**: Revenue data from research findings
- **Chart Configuration**:
  - Labels: Q1, Q2, Q3, Q4
  - Values: 1200, 1450, 1680, 1920
  - Colors: 4472C4 (note: no # prefix)
  - Category Axis: Quarter
  - Value Axis: Revenue ($000s)
  - Title: Quarterly Revenue Growth
```

**Typical Slide Structure:**
1. **Slide 1**: Title slide (presentation title, subtitle, author)
2. **Slide 2**: Agenda or context (what will be covered)
3. **Slides 3-N**: Main content slides
   - Use 2-column layouts for slides with charts/data
   - Mix layouts for visual variety
   - Include 1-2 slides with strong visuals for impact
4. **Slide N**: Conclusion/Thank You (key takeaways, call-to-action)

---

### Step 11: Create Design System Documentation

**What to do:**
1. In `plan.md`, document the complete design system
2. Include typography scale with specific sizes
3. List all colors with hex codes (WITHOUT # prefix)
4. Define spacing system
5. List visual patterns used

**Design System Includes:**
- Typography scale (H1, H2, body, captions with sizes)
- Color palette (all colors with hex codes, no #)
- Spacing system (margins, padding, gaps)
- Visual patterns (recurring design elements)

---

### Step 12: Identify Required Assets

**What to do:**
1. List all icons needed (with descriptions)
2. List all gradient backgrounds needed
3. List any images needed
4. List all charts/graphs to generate

**Format:**
```markdown
### Required Assets
- [ ] Icons: 
  - Chart icon (blue, 40x40pt)
  - User icon (green, 40x40pt)
- [ ] Gradients:
  - Header gradient (blue to purple, horizontal)
- [ ] Images:
  - Team photo (placeholder for client to provide)
- [ ] Charts:
  - Revenue bar chart (Slide 3)
  - Market share pie chart (Slide 5)
```

---

### Step 13: Final Review and Validation

**What to do:**
1. **Verify context.md completeness**:
   - All research sections filled
   - Data ready for visualization
   - Design direction clearly stated
   
2. **Verify plan.md completeness**:
   - All slides planned with specific content
   - Chart configurations complete
   - Layout specifications clear
   - Design system documented

3. **Check consistency**:
   - Slide count matches user requirements
   - Design choices align with subject matter
   - Data visualization supports key messages
   - Color palette appropriate for topic

4. **Technical validation**:
   - All hex colors listed WITHOUT # prefix
   - Only web-safe fonts specified
   - Chart types appropriate for data
   - Layout dimensions noted (720pt × 405pt)

---

## Quality Checklist

Before completing this step, ensure:

- [ ] Presentation directory created (`decks/<presentation_name>/`)
- [ ] `context.md` completed with all research and design direction
- [ ] `plan.md` completed with detailed slide-by-slide specifications
- [ ] Every slide has specific content (not placeholders like "add content here")
- [ ] All charts have complete data and configuration
- [ ] Color palette chosen and justified based on subject matter
- [ ] Only web-safe fonts specified
- [ ] Design direction stated BEFORE creating specifications
- [ ] Hex colors documented WITHOUT # prefix
- [ ] Required assets identified

---

## Common Mistakes to Avoid

❌ **DON'T**: Choose generic blue/gray colors without considering the topic
✅ **DO**: Analyze subject matter and choose colors that reflect the content

❌ **DON'T**: Use placeholder content like "Insert text here"
✅ **DO**: Write actual content based on research findings

❌ **DON'T**: Plan single-column layouts with chart below text
✅ **DO**: Use two-column layouts for slides with charts (text | chart)

❌ **DON'T**: Include hex colors with # prefix (#FF0000)
✅ **DO**: Use hex colors without prefix (FF0000)

❌ **DON'T**: Specify non-web-safe fonts like 'Segoe UI' or 'Roboto'
✅ **DO**: Use only web-safe fonts (Arial, Helvetica, Times New Roman, etc.)

❌ **DON'T**: Create vague chart specs like "add revenue chart"
✅ **DO**: Specify complete data, labels, colors, and configuration

---

## Output Format

After completing all steps, you should have:

```
decks/
└── <presentation_name>/
    ├── context.md          # Research findings and design direction
    ├── plan.md             # Detailed slide-by-slide specifications
    └── slides/             # Empty directory (for next step)
```

Inform the user that planning is complete and they can proceed with:
- `/presentation-kit.generate` to create HTML slides
- Or review/modify the plan files before generation

---

## Example Workflow Output

"Planning complete for **[Presentation Title]**!

Created files:
- `decks/ai-in-healthcare/context.md` - Research findings and design direction
- `decks/ai-in-healthcare/plan.md` - 12 slides with complete specifications

**Design Direction**: Using Deep Purple & Emerald palette (#6) to convey innovation and growth, appropriate for a forward-looking technology topic.

**Next Steps**:
1. Review the plan files to ensure content matches your expectations
2. Run `/presentation-kit.generate` to create HTML slides
3. Or provide feedback for plan adjustments

Ready to proceed?"


