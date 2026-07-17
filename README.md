# QurbaniHat

QurbaniHat is a modern livestock booking platform for Qurbani animals. Visitors can browse cows and goats, sort listings by price, inspect full animal details, and place a demo booking after login.

## Live URL

Live URL: Add your Vercel or Render deployment link here after hosting.

## Key Features

- Responsive navbar with logo, Home, All Animals, profile access, login/register, avatar, and logout states.
- Home page with farm-style hero, featured animals, Qurbani tips, and top breeds.
- JSON animal data source with 6 livestock listings.
- All Animals page with loading state and price sorting.
- Private animal details route with full details and booking form.
- Login, registration, and Google-style social login demo flow.
- My Profile page and Update Information route using an `updateUser({ image, name })` style client method.
- Toast notifications for auth, booking, and profile updates.
- Custom not-found page for unmatched routes.
- Animate.css powered entrance animation on animal cards and hero content.

## Demo Credentials

```env
NEXT_PUBLIC_DEMO_EMAIL=demo@qurbanihat.com
NEXT_PUBLIC_DEMO_PASSWORD=qurbani123
```

Registered users can also log in with the credentials they create during the same browser session.

## Environment Variables

Copy `.env.example` to `.env.local` and update values as needed:

```env
NEXT_PUBLIC_APP_NAME=QurbaniHat
NEXT_PUBLIC_DEMO_EMAIL=demo@qurbanihat.com
NEXT_PUBLIC_DEMO_PASSWORD=qurbani123
```

## NPM Packages Used

- `next`
- `react`
- `react-dom`
- `animate.css`
- `tailwindcss`
- `@tailwindcss/postcss`
- `eslint`
- `eslint-config-next`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- Public: `/`, `/animals`, `/login`, `/register`
- Private: `/animals/[id]`, `/my-profile`, `/update-profile`
