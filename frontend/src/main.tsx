import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalView } from './pages/GlobalView.tsx'
import { DatabaseView } from './pages/DatabaseView.tsx'

// Tailwind & custom styles.
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalView />,
  },
  {
    path: "/database/:slug",
    element: <DatabaseView />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
