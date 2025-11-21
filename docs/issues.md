# Buggy UI Issues (Demo Dashboard)

| ID | Category | Description | Impact |
| --- | --- | --- | --- |
| ui-acc-001 | Accessibility | Navigation `<nav>` lacks `aria-label`; links have no focus indication | Screen reader users cannot identify nav purpose; keyboard users may lose context |
| ui-color-002 | Contrast | Primary button uses `#e8e8e8` bg with `#bdbdbd` text (~1.6:1) | Fails WCAG 1.4.3; hard to read in bright environments |
| ui-space-003 | Layout/Spacing | Uneven padding in main panel (12/18/6/10), inconsistent card padding and gaps | Visual hierarchy suffers; misalignment reduces scannability |
| ui-flow-004 | Usability | Action buttons scattered (primary at top, others separated) without grouping/labels | Users must hunt for actions; unclear relationships |
| ui-resp-005 | Responsive | Main content fixed width (620px); nav doesn’t wrap predictably | Breaks on <480px viewports; horizontal scroll/overflow |

**Additional findings**
- No skip link to main content (keyboard accessibility gap).
- Sidebar filters lack fieldset/legend semantics (minor).
- Buttons lack `type` attribute (submit by default in forms; here not critical but best practice).
