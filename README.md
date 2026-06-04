# Resume Builder Frontend

A modern AI-powered Resume Builder application that enables users to create, edit, optimize, and share professional resumes with ease. The application provides an intuitive interface for building resumes, AI-assisted content enhancement, PDF resume parsing, template customization, and public resume sharing.

---

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
