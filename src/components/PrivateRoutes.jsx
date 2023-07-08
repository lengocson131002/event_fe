import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATH } from '../constants/common'
import { useAuth } from '../hooks/useAuth'
import HeaderDark from './HeaderDark'
import Footer from './Footer'

const PrivateRoutes = () => {
  const location = useLocation()
  const auth = useAuth()

  console.log(location)

  return (
    <>
      {auth ? (
        <>
          <HeaderDark />
          <div style={{ minHeight: '60vh' }}>
            <Outlet />
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
      )}
    </>
  )
}

export default PrivateRoutes
