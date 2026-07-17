# QurbaniHat

QurbaniHat is a modern Next.js web app for browsing and booking Qurbani animals such as cows and goats. The project provides a polished marketplace experience with featured listings, animal details, login and registration pages, profile management, and a clean responsive user interface.

## Features

- Responsive landing page with a hero section and featured animals
- Animal listing page with price-based sorting
- Detailed animal view for each listing
- Authentication flow for login, registration, and social-login-style actions
- Protected profile and update-profile pages
- Toast notifications for user feedback
- Local JSON-based animal data source
- Modern UI styling with custom CSS and Animate.css animations

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- CSS Modules / custom global styles
- Animate.css
- Better Auth and MongoDB libraries are included in the project setup

## Project Structure

- [src/app](src/app) — route-based pages for home, animals, auth, profile, and updates
- [src/components](src/components) — reusable UI components
- [src/providers](src/providers) — auth and toast context providers
- [src/lib](src/lib) — authentication and database helpers
- [src/utils](src/utils) — utility functions for animal data
- [src/data/animals.json](src/data/animals.json) — sample animal marketplace dataset

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a file named `.env.local` in the project root and add the following values:

```env
NEXT_PUBLIC_APP_NAME=QurbaniHat
NEXT_PUBLIC_DEMO_EMAIL=demo@qurbanihat.com
NEXT_PUBLIC_DEMO_PASSWORD=qurbani123
```

### 3. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev     # start the development server
npm run build   # build the production app
npm run start   # start the production build
npm run lint    # run ESLint checks
```

## Demo Credentials

You can test the authentication flow using:

- Email: demo@qurbanihat.com
- Password: qurbani123

## Main Routes

- Public routes: `/`, `/animals`, `/login`, `/register`
- Protected routes: `/animals/[id]`, `/my-profile`, `/update-profile`

## Notes

The current version uses local JSON data for animals. The app structure is ready for future backend or database integration, and authentication UI is already wired into the frontend flow.
