# Resume Builder — Client

This folder contains the React frontend for the Resume Builder application, built with Vite. It provides the UI for creating, previewing, and exporting resumes and communicates with the backend server for persistence, AI-assisted content, and file handling.

Currently, two official plugins are available:

## Quick overview

- Framework: React (functional components + hooks)
  -- Bundler: Vite

## Features (client)

- Create and edit personal information, experience, education, projects, skills, and summary
- Select from multiple resume templates and live preview
- Generate AI-assisted content (via server AI endpoints)
- Export preview as PDF / image (preview & export features)
- Auth-enabled dashboard and resume persistence

## Prerequisites

- Node.js 18+ (or compatible)
- npm (or yarn)

## Install

1. From the repository root, change to the client folder:

```
cd client
```

2. Install dependencies:

```
npm install
```

## Available scripts

- `npm run dev` — start Vite dev server (HMR)
- `npm run build` — build production bundle
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint over the source

Use these from the `client` folder. Example:

```
npm run dev
```

## Environment variables

Create a `.env` file in `client/` (not checked in) to configure the API base URL used by the client Axios instance. The client reads either variable if present:

- `VITE_BASE_URL` (preferred)
- `VITE_APP_BASE_URL` (fallback)

Example `.env` (development):

```
VITE_BASE_URL=http://localhost:5000/api
```

Note: The backend server lives in the `server/` folder. Start it separately when developing locally.

## How the client talks to the API

The Axios instance used by the app is defined at `src/configs/api.js`. It uses the Vite `import.meta.env` variables to set `baseURL`.

## Project structure (important files)

- `index.html` — Vite entry HTML
- `src/main.jsx` — app bootstrap
- `src/App.jsx` — top-level routes and providers
- `src/app/store.js` — Redux store configuration
- `src/app/features/authSlice.js` — authentication state slice
- `src/components/` — reusable UI components and page fragments
- `src/pages/` — route pages (Home, Dashboard, ResumeBuilder, Preview, Login)
- `src/assets/templates/` — resume template components used by the preview/export
- `src/configs/api.js` — Axios client configured with `VITE_BASE_URL`
- `public/` — static assets served by Vite (logos, etc.)

Refer to the components under `src/components/home/` for the form parts used by the resume builder (PersonalInfoForm, ExperienceForm, EducationForm, etc.).

## Editor & linting

- ESLint config is in `eslint.config.js` at the project root of the `client` folder.
- To run linter:

```
npm run lint
```

## Building & deploying

1. Build production assets with `npm run build` inside `client/`.
2. The build output is placed in `dist/` and can be served by any static host (Netlify, Vercel, Surge) or used by the backend server to serve static assets.

If you deploy the server and client together, ensure the `VITE_BASE_URL` used by the client points to the deployed API endpoint.

## Development tips

- Run the server concurrently while developing the client to enable full-stack flows (auth, AI, file uploads).
- Use the browser devtools to inspect network calls; the client uses `axios` and the shared instance at `src/configs/api.js`.

## Testing

There are no automated tests included in the `client` folder by default. Consider adding component tests with React Testing Library and unit tests for reducers and utilities.

## Contributing

- Please follow the coding style in existing files.
- Open a PR with a clear description and a screenshot of visual changes for UI work.

## License & contact
