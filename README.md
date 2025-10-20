# FLESHLINK LIVE SERVICES

A Next.js/TypeScript desktop OS experience running in the browser.

## Features

- **Splash Boot Screen**: Animated loading screen with progress bar
- **Desktop Environment**: Full desktop OS with taskbar and windowing system
- **Draggable & Resizable Windows**: AppWindow component supporting drag and resize
- **KAOS Flow**: Complete game flow with setup and run modes
  - `/` - Splash boot screen
  - `/desktop` - Desktop environment with taskbar
  - `/play/kaos` - KAOS setup (scenario seed + module selection)
  - `/play/kaos/run` - KAOS run with HUD shell

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Architecture

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Client-side rendering** for interactive components

### Key Components

- `src/components/desktop/AppWindow.tsx` - Draggable and resizable window component
- `src/app/page.tsx` - Splash boot screen
- `src/app/desktop/page.tsx` - Desktop environment
- `src/app/play/kaos/page.tsx` - KAOS setup page
- `src/app/play/kaos/run/page.tsx` - KAOS run page with HUD
