# Portfolio React Project

This portfolio site is built with React and Vite. It uses Supabase for managing dynamic content such as the Latest Project section.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Supabase credentials and RAWG API key:
   ```bash
   cp .env.example .env
   # edit .env with your SUPABASE_URL, SUPABASE_ANON_KEY and VITE_RAWG_API_KEY
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

If you encounter an error like `Failed to resolve import "chart.js/auto"`, make sure dependencies are installed with `npm install`.
