# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
