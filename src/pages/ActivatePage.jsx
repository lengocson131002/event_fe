import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NotificationCustom } from '../components/Notification'
import AxiosPost from '../config/axiosPost'
import { PATH } from '../constants/common'

const ActivatePage = () => {
  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    AxiosPost('auth/users/activate', { token: search.split('token=')[1] })
      .then(() =>
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Activate Account Successfully!'
        })
      )
      .then(() => navigate(PATH.LOGIN))
  }, [search])

  return (
    <div className='flex items-center justify-center h-screen'>
      <Spin spinning={true} />
    </div>
  )
}

export default ActivatePage
