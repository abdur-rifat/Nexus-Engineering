# Project memory

## Product intent & audience

- Website for **NEXUS Engineering & Builders**, a premium architecture, engineering, and construction firm.
- Audience: clients seeking architectural design, structural engineering, and construction solutions.
- Must feel like a premium international architecture/engineering firm, not a real estate landing page.
- Includes: editorial architectural layouts, extensive service index, project portfolio, local consultation tools.

## Brand personality & voice

- Sophisticated, architectural, trustworthy, technical, premium.
- Not overly corporate or saturated.
- Restrained and elegant; avoids flashy, spinning, or complicated animations.

## Visual design & UX direction

- **Color palette (premium blue architectural):**
  - Primary Navy: `#102B4C` — header, footer, dark sections, selected backgrounds
  - Secondary Blue: `#2563A6`
  - Accent Blue: `#3B82C4` — buttons, links, nav highlights, subtle details
  - Background: `#F3F6FA` — cool off-white main content sections
  - White: `#FFFFFF`
  - Text: `#172435`
  - Muted Text: `#68788A`
- Avoid blue gradients everywhere; prefer solid colors, natural photography, subtle contrast.
- Hero is a full-width image slider (~85–100vh desktop) with:
  - Crossfade transitions, autoplay every ~5.5s
  - Left/right arrows, minimal pagination indicators
  - Pause on hover/touch interaction; mobile-friendly touch nav
  - Consistent content positioning across slides; strong text hierarchy over dark overlay
  - Images: contemporary residential, multi-story buildings, modern facades, 3D visualization, real construction projects
  - Prioritize uploaded real company project images when available
- Hero copy:
  - Label: `ARCHITECTURE • ENGINEERING • CONSTRUCTION`
  - Headline: "Engineering Vision. Building the Future."
  - Description: "Architectural design, structural engineering, and construction solutions built around precision, functionality, and your vision."
  - CTAs: "Start Your Project" (primary), "Explore Our Projects" (secondary)

## Decisions, constraints & rationale

- Framework: vite-react with Tailwind CSS, React hooks, Lucide React icons; `@/` path alias for imports.
- Existing page structure retained; changes focused on palette and hero slider.
- Production build passes.
- Uploaded project/architectural images are connected to the hero slider and should be preferred over stock imagery.

## Open questions & assumptions

- Additional sections beyond hero (service index, portfolio, consultation tools) content and layout not yet specified in detail.
- Real uploaded images may need to be expanded/updated as more project assets become available.
- Exact navigation structure and page routing (single-page vs multi-page) not yet confirmed.