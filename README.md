# QurbaniHat

QurbaniHat is a modern livestock marketplace built with Next.js and Better Auth, where users can explore animals for Qurbani, view details, and place a booking after authentication.

## Features

- Responsive landing page with a hero section and featured animals
- Animal listing page with price-based sorting
- Detailed animal view for each listing
- Authentication with Better Auth email/password and Google login
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
- Better Auth
- MongoDB

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

## Authentication - Better Auth

This project uses Better Auth for all authentication: email/password login, registration, Google social login, logout, sessions, and profile updates. No custom or manual OAuth handling is used; every auth flow goes through Better Auth APIs.

### Server config

[src/lib/auth.js](src/lib/auth.js) initializes `betterAuth()` with the MongoDB adapter, email/password auth, and Google as a social provider.

```js
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  database: mongodbAdapter(db, {
    client,
    transaction: false,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
```

### API route handler

[src/app/api/auth/[...all]/route.js](src/app/api/auth/[...all]/route.js) is the single catch-all route that lets Better Auth handle every auth endpoint, including sign-in, sign-up, sign-out, session, and OAuth callback.

```js
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### Client

[src/lib/auth-client.js](src/lib/auth-client.js) creates the browser-side Better Auth client used across the app.

```js
export const authClient = createAuthClient({ baseURL });
```

### App-wide access

[src/providers/AuthProvider.jsx](src/providers/AuthProvider.jsx) wraps `authClient.useSession()` and exposes `login`, `register`, `googleLogin`, `logout`, and `updateUser` through a `useAuth()` hook.

### Auth flows

| Flow | Method |
| --- | --- |
| Email/password login | `authClient.signIn.email()` |
| Registration | `authClient.signUp.email()` |
| Google login | `authClient.signIn.social({ provider: "google" })` |
| Logout | `authClient.signOut()` |
| Update profile | `authClient.updateUser()` |

### Environment variables required

Create a file named `.env.local` in the project root and add the following values:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

### Google Cloud Console setup

Add this as an Authorized redirect URI for your OAuth client:

```text
http://localhost:3000/api/auth/callback/google
```

For production, add your deployed callback URL:

```text
https://your-live-site.vercel.app/api/auth/callback/google
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

## Main Routes

- Public routes: `/`, `/animals`, `/login`, `/register`
- Protected routes: `/animals/[id]`, `/my-profile`, `/update-profile`

## Author

Built as part of Assignment 8 - category-A8-Pineapple.
