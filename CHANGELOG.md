# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2026-06-26
### Added
- **Infinite Scrolling**: Implemented a highly optimized `IntersectionObserver` to seamlessly lazy-load additional icons as you scroll, completely replacing the static 100-icon limit. The backend API was updated to support `start` and `limit` pagination.
- **Sidebar Filtering Engine**: Built a dynamic sidebar filter system. The app now fetches available packs and styles from `/api/filters` on load, allowing you to narrow down searches across 200,000+ icons instantly.
- **Premium Skeleton Loaders**: Introduced shimmering skeleton states for both the icon grid and the sidebar filters. These are hardcoded into the initial DOM to prevent violent layout shifts during API fetches.
- **Brand Polish**: Extracted the precise SVG star logo into a standalone Retina-ready `favicon.svg` with matching gradients.

### Changed
- **UI Architecture Refactoring**: Replaced the landing-page hero section with a native app-like layout. The search bar is now prominently centered in the header, bringing the icon grid and sidebar filters into immediate view on load.
- **Typography & Aesthetics**: Migrated to the 'Outfit' Google Font using a strict `fonts-loaded` pattern to completely eliminate Flash of Invisible Text (FOIT) without bloating the package size with local `.woff2` files.
- **Layout Shift Fixes**: 
  - Added a global custom scrollbar with `overflow-y: scroll` to lock layout width.
  - Implemented `scrollRestoration = 'manual'` and instant top-scrolling on filter changes to prevent browser scroll snaps.

## [1.1.0] - 2026-06-25
### Added
- **Modern Color Picker**: Integrated the Pickr library for a smoother, cross-browser consistent color selection experience.
- **Recent Colors**: Added support for saving and displaying the 5 most recently used colors. Your selections are now persisted across sessions.
- **Hex Input Enhancements**: The color hex input now automatically formats and correctly expands 3-digit hex codes (e.g., `#abc` expands to `#aabbcc`).

### Changed
- **Inherit Mode**: Replaced the previous `currentColor` button with a new "Inherit" switch to improve UI clarity.
- **Startup Behavior**: The application now loads a random theme upon initialization instead of a static search.
- **Dynamic Swatches**: Refactored the color swatches section to dynamically render your recent colors alongside standard presets.
- **Slider UI**: Improved the size slider with dynamic fill tracking as the value changes.

## [1.0.1] - 2026-06-24
### Fixed
- Fixed a strict TypeScript compilation error (`TS17001`) where generated SVG components were rendering duplicate `color` attributes when parsing premium SVGs that natively hardcoded `color="currentColor"`. The generator now aggressively strips existing color properties before injecting React props.
- Resolved a critical JavaScript DOM selector exception (`Cannot set properties of null`) that was completely preventing the icon customization modal from opening. 
- Corrected the `package.json` executable path to prevent `bin` resolution issues on Windows operating systems.

## [1.0.0] - 2026-06-24
### Added
- **Initial Release**
- **Visual Search Engine**: Launched the beautiful localhost UI to search over 200,000+ open-source icons.
- **Provider Architecture**: Implemented a highly scalable, decoupled backend engine.
- **Untitled UI Pro Integration**: Engineered the Reverse-Rendering backend to securely parse, compile, and serve premium private icon repositories locally without exposing authentication tokens.
- **Code Generator**: Added single-click `<svg>` React component code generation supporting both JavaScript and strict TypeScript outputs.
