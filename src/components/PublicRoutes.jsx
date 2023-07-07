import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATH } from '../constants/common'
import { useAuth } from '../hooks/useAuth'
import HeaderDark from './HeaderDark'
import Footer from './Footer'

const PublicRoutes = () => {
  const location = useLocation()
  const auth = useAuth()

  return (
    <>
      {auth && location.pathname.split('/')[1] !== 'event' ? (
        <Navigate to={PATH.HOME} state={{ from: location }} />
      ) : (
        <>
          {location.pathname.split('/')[1] === 'event' ? (
            <>
              <HeaderDark />
              <Outlet />
              <Footer />
            </>
          ) : (
            <Outlet />
          )}
        </>
      )}
    </>
  )
}

export default PublicRoutes
