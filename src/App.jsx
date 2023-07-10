import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import PublicRoutes from './components/PublicRoutes'
import { routes } from './routes/routes'
import { useSelector } from 'react-redux'
import { PATH } from './constants/common'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const userInfo = useSelector((state) => state.global.userInfo)

  console.log(
    userInfo,

    routes.filter(
      (item) => !item.isPublic && item?.allowed?.includes(userInfo?.role)
    )
  )

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
          .filter(
            (item) => !item.isPublic && item?.allowed?.includes(userInfo?.role)
          )
          .map((item) => (
            <Route exact path={item.path} element={item.element} />
          ))}
      </Route>
      <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
