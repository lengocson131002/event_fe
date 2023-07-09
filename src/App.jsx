import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import PublicRoutes from './components/PublicRoutes'
import { routes } from './routes/routes'

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        {routes
          .filter((item) => item.isPublic)
          .map((item) => (
            <Route exact path={item.path} element={item.element} />
          ))}
      </Route>
      <Route element={<PrivateRoutes />}>
        {routes
          .filter((item) => !item.isPublic)
          .map((item) => (
            <Route exact path={item.path} element={item.element} />
          ))}
      </Route>
    </Routes>
  )
}

export default App
