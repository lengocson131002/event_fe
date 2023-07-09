import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useStudentRegistrations } from '../hooks/useStudentRegistration'
import { Alert, Button, Result, Spin } from 'antd'
import { NotificationCustom } from '../components/Notification'
import AxiosPut from '../config/axiosPut'
import { useAuth } from '../hooks/useAuth'
import { PATH } from '../constants/common'
import { useEventById } from '../hooks/useEvent'
import Post from '../features/Post'

const EventCheckInPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const userInfo = useSelector((state) => state?.global?.userInfo)
  const [errorActivity, setErrorActivity] = useState()
  const auth = useAuth()

  const { event, fetchEvent, loading } = useEventById(id)

  const { studentRegistrations, fetchStudentRegistrations } =
    useStudentRegistrations(userInfo?.studentId, {
      eventId: Number(id)
    })

  const handleCheckIn = (activity) => {
    AxiosPut(`/events/${id}/activities/${activity?.id}/complete`)
      .then(() => {
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Check In Successfully!'
        })
        navigate(`/event/${id}`)
      })
      .catch((err) => {
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.message || err.message
        })
        setErrorActivity(err?.response?.data?.message || err.message)
      })
  }

  useEffect(() => {
    if (
      studentRegistrations?.length &&
      !studentRegistrations[studentRegistrations?.length - 1]?.canceled
    ) {
      handleCheckIn(
        studentRegistrations[
          studentRegistrations?.length - 1
        ]?.activities?.find((item) => item.type === 'CHECKIN')
      )
    }
  }, [studentRegistrations])

  // useEffect(() => {
  //   if (!auth) {
  //     navigate(PATH.LOGIN)
  //   }
  // }, [auth])

  return (
    <>
      {
        <Spin spinning={loading}>
          <div class='flex flex-col justify-between px-4 mx-auto max-w-screen-xl'>
            {!auth && (
              <Alert
                message='Please login and register to event before check-in'
                type='warning'
                showIcon
                style={{ marginTop: '1rem' }}
              />
            )}
            {/* <article class='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue'> */}
            <main class='w-full pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white'>
              {!loading ? (
                <Post event={event} fetchEvent={fetchEvent} id={id} />
              ) : (
                <></>
              )}
            </main>
            {/* </article> */}
          </div>
        </Spin>
      }
    </>
  )
}

export default EventCheckInPage
