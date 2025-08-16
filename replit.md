# ProComercial - Commercial Real Estate Investment Platform

## Overview

ProComercial is a modern web application for commercial property investment in Chile. It provides investors with a comprehensive platform to browse, analyze, and invest in commercial properties including warehouses, parking spaces, offices, and property packages. The platform features real-time property data, investment calculations, portfolio management, and detailed property analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 2025)

### Page Structure Updates
- **Home Page (/)**: Main landing page with hero section, property showcase, calculator, and CTA
- **Properties Page (/properties)**: Dedicated property browsing with advanced filtering and market stats
- Navigation updated with proper routing between pages

### Background Design System
- Implemented organic luminous gradients using only brand colors (cyan #00d4ff, navy #1a2937)
- 6 moving light blooms that create fluid, Stripe-inspired effects
- Eliminated hard color divisions and geometric patterns for smooth transitions
- Navigation menu uses dark text without background interference

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: TailwindCSS with custom design system using CSS variables
- **State Management**: TanStack Query for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL storage
- **File Structure**: Monorepo structure with shared types and schemas

### Data Layer
- **Database**: PostgreSQL with Neon serverless integration
- **Schema**: Shared TypeScript schema definitions using Drizzle Zod
- **Core Entities**: Users, Properties, Investments, Communes
- **Storage Pattern**: Repository pattern with in-memory fallback for development

### Component Architecture
- **UI Components**: Modular component library following atomic design principles  
- **Layout**: Responsive design with mobile-first approach
- **Animations**: CSS-based animations with Tailwind utilities
- **Theming**: CSS custom properties for consistent design tokens

### Key Features
- **Home Page**: Hero section with organic gradients, property showcase, investment calculator, and CTA with YouTube integration
- **Properties Page**: Comprehensive property browser with advanced filtering, search, and market statistics
- **Investment Tools**: Real-time ROI calculations and portfolio management
- **Interactive Elements**: Property location visualization and responsive design
- **Modern UI**: Stripe-inspired organic luminous backgrounds with brand colors

## External Dependencies

### Core Technologies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **UI Framework**: Radix UI components, Tailwind CSS, class-variance-authority
- **Database**: Neon PostgreSQL, Drizzle ORM, connect-pg-simple for sessions
- **Development**: Vite, TypeScript, ESBuild for production builds
- **Utilities**: date-fns for date handling, Zod for schema validation

### Deployment & Infrastructure
- **Build System**: Vite for frontend, ESBuild for backend bundling
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Environment**: Configured for Replit deployment with development tooling