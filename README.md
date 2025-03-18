# NovaTech - Modern Tech Landing Page

![NovaTech Landing Page](https://iili.io/3o680gt.png)

A responsive, interactive landing page for a technology solutions company built with React, TypeScript, and TailwindCSS.

## Features

- ✨ Modern UI with glassmorphism and neumorphism design
- 🎨 Dynamic animations and transitions
- 🌐 Interactive 3D globe visualization
- ✅ Fully responsive design for all devices
- 🔍 Parallax scrolling effects
- 🌙 Animated particle background
- 📝 Contact form with validation
- 🚀 Optimized performance

## Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-gen frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Radix UI** - Accessible UI components
- **Shadcn UI** - High-quality reusable components
- **Lucide React** - Beautiful SVG icons

## Prerequisites

- Node.js 18+ and npm

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tech-landingpage.git
cd tech-landingpage
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build files will be located in the `dist` directory.

## Project Structure

```
tech-landingpage/
├── public/               # Static assets
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── ui/           # UI components (Shadcn)
│   │   └── ...           # Feature components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # TailwindCSS configuration
└── vite.config.ts        # Vite configuration
```

## Key Components

- `HeroSection` - The main landing section with 3D globe and particles
- `AboutSection` - Company information and values
- `FeaturesSection` - Product/service features with hover effects
- `ContactSection` - Contact form with validation
- `Navbar` - Responsive navigation with smooth scrolling
- `Footer` - Site footer with links and contact information
- `ParticleBackground` - Animated background particles

## Custom Hooks

- `useIsMobile` - Detects mobile devices for responsive behavior
- `useToast` - Toast notification management

## Development

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
