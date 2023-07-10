import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constants/common'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
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
