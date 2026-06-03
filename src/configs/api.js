// File Purpose: Shared Axios client configured with the app's API base URL.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? import.meta.env.VITE_APP_BASE_URL,
})

export default api;