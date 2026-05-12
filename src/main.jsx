import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './Comopnents/Route.jsx'
import './index.css'
import { ThemeProvider } from './Comopnents/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <RouterProvider router={Router}>
            <App />
        </RouterProvider>
    </ThemeProvider>
)
