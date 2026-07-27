# V-Mart: Neo-Brutalist eCommerce

V-Mart is an eCommerce application built with a strict Neo-Brutalism design system. It avoids soft drop shadows, rounded corners, and gradients in favor of high-contrast solid colors, bold typography, hard outlines, and raw aesthetic appeal.

## Tech Stack
- **React 18**
- **TypeScript** (Strict mode)
- **Vite** (Build tool & dev server)
- **Tailwind CSS** (Styling & Design Tokens)
- **React Router v6** (Client-side routing)
- **Context API** (State management, no Redux or external state libs)

## Folder Structure
- `src/components/ui/` - Reusable, atomic components styled with strict brutalist rules (Button, Input, Card, Modal, Badge).
- `src/components/layout/` - Global layout components (Navbar, Footer, MainLayout).
- `src/components/cart/` - Cart drawer logic and UI.
- `src/components/shop/` - Sub-components specifically for the Shop page.
- `src/context/` - React Context providers (`AuthContext`, `CartContext`) handling global state and `localStorage` persistence.
- `src/data/` - Mock data arrays for products and categories.
- `src/pages/` - Full page components mapping directly to routes.
- `src/hooks/` - Custom React hooks (e.g., `useDebounce`).
- `src/utils/` - Pure function utilities (e.g., product filtering, time-based greetings).
- `src/types/` - TypeScript interface definitions.

## Design Philosophy
- **Colors**: Strictly uses design tokens defined in `tailwind.config.js` (`ink`, `paper`, `neon-pink`, `neon-blue`, `lemon`, `lime-green`).
- **Borders**: Thick, hard borders (`border-4 border-ink`).
- **Shadows**: Hard, solid-color drop shadows mimicking isometric depth (`shadow-brutal`, `shadow-brutal-lg`).
- **Typography**: Uppercase, bold fonts for headings and key interactive elements.

## Setup Instructions

1. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

3. **Build for Production**
   ```bash
   npm run build
   ```
