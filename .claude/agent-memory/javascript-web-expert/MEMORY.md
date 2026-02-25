# Project Memory - Craftsman Landing Page

## Project: German Craftsman Landing Page (Müller Bedachungen)
- **Location**: `C:\tmp\claude agent teams\frontend\`
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React icons
- **Font**: Source Sans 3 (via next/font/google)
- **Design System**: Muted green `#4A6741`, warm wood tones `#8B6F47`, warm neutral greys
- **Design tokens**: `C:\tmp\claude agent teams\design\design-tokens.css`

## Key File Structure
- `src/app/` - Pages (home, impressum, datenschutz, robots, sitemap)
- `src/components/sections/` - Hero, Services, WhyUs, ProjectGallery, Process, QuickContact, FAQ, DetailedQuote, Contact
- `src/components/layout/` - Header, Footer, CookieBanner
- `src/components/forms/` - QuickContactForm, DetailedQuoteForm
- `src/components/ui/` - Button, Container, SectionHeading
- `src/config/` - site.ts (business info), navigation.ts
- `src/types/` - TypeScript interfaces

## API Endpoints (Backend Integration)
- `POST /api/contact/quick` - Quick contact form
- `POST /api/contact/quote` - Detailed quote form

## Windows Environment Notes
- Backslash paths in Windows need careful quoting in bash
- `cp` with glob patterns can fail; list files explicitly instead
- `npx create-next-app` may prompt interactively; pipe input to bypass
