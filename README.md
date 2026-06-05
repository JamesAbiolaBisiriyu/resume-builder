<<<<<<< HEAD
# Resume Builder — Client

This folder contains the React frontend for the Resume Builder application, built with Vite. It provides the UI for creating, previewing, and exporting resumes and communicates with the backend server for persistence, AI-assisted content, and file handling.
=======
# Resume Builder Frontend

A modern AI-powered Resume Builder application that enables users to create, edit, optimize, and share professional resumes with ease. The application provides an intuitive interface for building resumes, AI-assisted content enhancement, PDF resume parsing, template customization, and public resume sharing.
>>>>>>> 0d7ee80e881a33518a1e3240cf4b8b4ac8a39c52

---

<<<<<<< HEAD
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
=======
## Features

### Authentication

* User registration and login
* Secure JWT-based authentication
* Protected routes
* User session management

### Resume Management

* Create new resumes
* Edit existing resumes
* Delete resumes
* Save resume drafts
* Public/private resume visibility

### AI-Powered Enhancements

* Professional summary enhancement
* Job description enhancement
* Resume content optimization
* ATS-friendly resume suggestions

### Resume Builder

* Personal information management
* Professional summary section
* Work experience section
* Education section
* Skills section
* Projects section

### Resume Customization

* Multiple resume templates
* Accent color selection
* Real-time preview
* Print-ready formatting
* PDF export support

### Resume Sharing

* Public resume links
* Resume preview page
* Shareable URLs

### File Upload

* Resume PDF upload
* Automatic resume data extraction
* AI-assisted resume parsing

---

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* Tailwind CSS
* Lucide React Icons
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* OpenAI API
* ImageKit
* JWT Authentication

---

## Project Structure

```bash
src/
│
├── assets/
│
├── components/
│   ├── auth/
│   ├── common/
│   ├── dashboard/
│   └── home/
│
├── configs/
│   ├── api.js
│   └── constants.js
│
├── context/
│   ├── AppContext.jsx
│   └── hooks.js
│
├── pages/
│   ├── Auth.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── ResumeBuilder.jsx
│   └── ResumeView.jsx
│
├── redux/
│   ├── authSlice.js
│   └── store.js
│
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/resume-builder.git

cd resume-builder
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory.

```env
VITE_BASE_URL=https://your-backend-url.onrender.com
```

Example:

```env
VITE_BASE_URL=https://resume-builder-server-5apl.onrender.com
```

---

## Running Locally

Start development server:

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Backend API Integration

The frontend communicates with the backend using Axios.

Example:

```javascript
const response = await api.get("/api/resumes/get/:resumeId");
```

Base URL is configured using:

```env
VITE_BASE_URL
```

---

## Deployment

### Frontend Deployment (Vercel)

1. Push project to GitHub.
2. Import repository into Vercel.
3. Add environment variable:

```env
VITE_BASE_URL=https://resume-builder-server-5apl.onrender.com
```

4. Redeploy application.

### Backend Deployment (Render)

The backend is deployed on Render and provides API endpoints consumed by the frontend.

---

## Main Pages

### Home Page

Landing page introducing the application.

### Authentication

* Login
* Register

### Dashboard

Displays all user resumes.

### Resume Builder

Allows users to:

* Edit resume content
* Customize templates
* Save changes
* Share resumes

### Public Resume View

Allows public viewing of shared resumes.

---

## AI Features

The application integrates with OpenAI APIs to provide:

### Professional Summary Enhancement

Transforms basic summaries into:

* ATS-friendly summaries
* Professional language
* Better keyword optimization

### Job Description Enhancement

Improves:

* Achievement descriptions
* Action verbs
* Impact statements

---

## State Management

Redux Toolkit is used for:

### Authentication State

```javascript
auth.token
auth.user
```

### Resume Builder State

```javascript
builder.draftResume
builder.activeSectionIndex
builder.removeBackground
```

---

## Styling

The application uses:

* Tailwind CSS
* Responsive layouts
* Mobile-first design
* Modern UI components

---

## Security

* JWT authentication
* Protected routes
* Input validation
* Secure API communication
* Environment variable protection

---

## Future Enhancements

* Multiple resume templates
* Cover letter generator
* AI interview preparation
* Resume analytics
* Resume version history
* Cloud storage integration
* Multi-language support

---

## Author

### James Abiola Bisiriyu

Operations Manager | Software Developer

GitHub:
https://github.com/JamesAbiolaBisiriyu

---

## License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project in accordance with the license terms.
>>>>>>> 0d7ee80e881a33518a1e3240cf4b8b4ac8a39c52
