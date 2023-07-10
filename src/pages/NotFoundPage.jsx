import { Button, Result, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '../constants/common'
import { useState } from 'react'

const NotFoundPage = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [location])

  return isLoading ? (
    <Spin spinning={isLoading} />
  ) : (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={() => navigate(PATH.EXPLORE)}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFoundPage
