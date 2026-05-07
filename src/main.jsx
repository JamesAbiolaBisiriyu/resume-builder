// File Purpose: Application entry point that mounts the React app and global providers.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppStateProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <AppStateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppStateProvider>
)
