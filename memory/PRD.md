# PRD — A Coffee Date? ☕❤️

## Original Problem Statement
Premium single-page interactive website "A Coffee Date? ☕❤️". Elegant, dreamy, cinematic theme (cream, blush pink, warm brown, gold, Poppins font). Flow: animated opening screen → coffee-date question with dodging "Let Me Think" button → calendar date picker → time picker → multi-select coffee menu → special message box → summary card → funny café bill (Coffee ₹199, Dessert ₹149, Memories Priceless, Your Smile FREE, Total: one happy smile) → confirm → confetti celebration with typewriter message. Extras: smooth transitions, glassmorphism, mobile responsive, background music with mute/unmute, dark/light toggle, coffee-cup loading animation, cursor sparkles.

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + canvas-confetti. Multi-step wizard orchestrated in `src/App.js` with AnimatePresence; steps in `src/steps/`, shared components in `src/components/`.
- Backend: FastAPI + MongoDB (motor). `POST /api/dates` and `GET /api/dates` save/list confirmed dates (fire-and-forget from frontend; experience works fully offline of backend).
- Theme: CSS variables in `src/index.css` (light cream / dark mocha), Poppins + Caveat fonts via Google Fonts in `public/index.html`.
- Music: royalty-free lofi track from Pixabay CDN, starts on "Open It" click (autoplay-safe), toggle button bottom-right.

## User Personas
- The inviter: shares the link with someone special.
- The invitee: walks through the cinematic flow and confirms the date.

## Core Requirements (static)
All 10 flow steps, dodging button, particles, cursor sparkles, dark/light mode, music toggle, loader, mobile responsive, premium motion.

## Implemented (2026-08-05)
- Coffee-cup filling loader with steam animation
- Kinetic hero with masked line-by-line reveal, mouse parallax glow, editorial marquee
- Question card with Yes + dodging "Let Me Think" button (dodges 4x, then gives in)
- Custom calendar (past dates disabled), time-slot grid, 8-item multi-select menu bento grid
- Special message step, summary card + zigzag-edged rotated "Café Amour" receipt
- Confetti celebration with typewriter message and Caveat signature
- Floating hearts/beans particles, sparkle cursor, film grain overlay
- Dark/light toggle, lofi BGM with animated wave-bar mute button
- Backend persistence of confirmed dates (verified via curl)

## Backlog
- P1: Admin view page listing confirmed dates (GET /api/dates already exists)
- P1: Shareable link with invitee name personalization (e.g. ?to=Name)
- P2: Calendar invite (.ics) download after confirmation
- P2: Photo of the two people / custom message config via URL params
- P2: Sound effects on button interactions

## Next Tasks
1. Add /admin route to view saved confirmations
2. Personalize hero text via query param
3. Add .ics download on celebration step
