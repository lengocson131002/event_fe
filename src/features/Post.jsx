import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PATH, TIME_FORMAT } from '../constants/common'
import { Button, Image, Input, Modal, QRCode, Steps, Table } from 'antd'
import AxiosPost from '../config/axiosPost'
import { NotificationCustom } from '../components/Notification'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSelector } from 'react-redux'
import { useStudentRegistrations } from '../hooks/useStudentRegistration'
import AxiosDelete from '../config/axiosDelete'
import { useEventRegistrations } from '../hooks/useEventRegistration'
import { ROLE } from '../constants/role'
import AxiosPut from '../config/axiosPut'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const { confirm } = Modal
const { Search } = Input

dayjs.extend(relativeTime)

const Post = ({ event }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state?.global?.userInfo)
  const [query, setQuery] = useState()

  const { studentRegistrations, fetchStudentRegistrations } =
    useStudentRegistrations(userInfo?.studentId)

  const { eventRegistrations, fetchEventRegistrations, loading } =
    useEventRegistrations(event?.id)

  useEffect(() => {
    fetchStudentRegistrations(userInfo?.studentId, { eventId: event?.id })
  }, [event])

  useEffect(() => {
    fetchEventRegistrations({ query })
  }, [query])

  const dataEventRegistrationSuccess = eventRegistrations
    ?.filter((item) => !item?.canceled)
    ?.map((item) => ({ ...item?.student, activities: item?.activities }))

  const handleCheckIn = (activity) => {
    AxiosPut(`/events/${event?.id}/activities/${activity?.id}/complete`)
      .then(() => {
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Check In Successfully!'
        })
        fetchEventRegistrations()
      })
      .catch((err) => {
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.message || err.message
        })
      })
  }

  const handleCheckOut = (activity) => {
    AxiosPut(`/events/${event?.id}/activities/${activity?.id}/complete`)
      .then(() => {
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Check In Successfully!'
        })
        fetchEventRegistrations()
      })
      .catch((err) => {
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.message || err.message
        })
      })
  }

  const columnEventRegistrationSuccess = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name'
    },
    { title: 'Code', key: 'code', dataIndex: 'code' },
    { title: 'Email', key: 'email', dataIndex: 'email' },
    { title: 'Phone', key: 'phone', dataIndex: 'phone' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className='flex gap-4'>
          <Button
            type='dashed'
            disabled={
              record?.activities?.find((item) => item.type === 'CHECKIN')
                ?.completedAt
            }
            onClick={() => handleCheckIn(record?.activities[0])}
          >
            Check In
          </Button>
          <Button
            disabled={
              record?.activities?.find((item) => item.type === 'CHECKOUT')
                ?.completedAt
            }
            onClick={() => handleCheckOut(record?.activities[1])}
          >
            Check Out
          </Button>
        </div>
      )
    }
  ]

  const handleRegisterEvent = () => {
    if (!auth) {
      navigate(PATH.LOGIN)
    } else {
      confirm({
        title: 'Confirm',
        content: 'Are you sure to register this event?',
        onOk: () => {
          AxiosPost(`events/${event?.id}/registrations`)
            .then(() => {
              fetchStudentRegistrations(userInfo?.studentId, {
                eventId: event?.id
              })
              NotificationCustom({
                type: 'success',
                message: 'Success',
                description: 'Register Successfully!'
              })
            })
            .catch((err) => {
              NotificationCustom({
                type: 'error',
                message: 'Error',
                description: err?.response?.data?.message || err.message
              })
            })
        }
      })
    }
  }

  const handleCancelRegisterEvent = () => {
    if (!auth) {
      navigate(PATH.LOGIN)
    } else {
      confirm({
        title: 'Confirm',
        content: 'Are you sure to cancel register this event?',
        onOk: () => {
          AxiosDelete(`events/${event?.id}/registrations`)
            .then(() => {
              fetchStudentRegistrations(userInfo?.studentId, {
                eventId: event?.id
              })
              NotificationCustom({
                type: 'success',
                message: 'Success',
                description: 'Cancel register Successfully!'
              })
            })
            .catch((err) => {
              NotificationCustom({
                type: 'error',
                message: 'Error',
                description: err?.response?.data?.message || err.message
              })
            })
        }
      })
    }
  }

  return (
    <>
      <header class='mb-4 lg:mb-6 not-format'>
        <address class='flex items-center mb-6 not-italic'>
          <div className='flex items-center justify-between w-full'>
            <div class='inline-flex items-center mr-3 text-sm text-gray-900'>
              <img
                class='mr-4 w-16 h-16 rounded-full'
                src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                alt='Jese Leos'
              />
              <div>
                <span class='text-xl font-bold text-gray-900'>
                  Quản lý sự kiện (
                  {dayjs(event?.updatedAt).locale('vi').fromNow()})
                </span>

                <p class='text-base font-light text-gray-500'>
                  {dayjs(event?.startTime).format(TIME_FORMAT.DATE_MONTH_YEAR)}{' '}
                  - {dayjs(event?.endTime).format(TIME_FORMAT.DATE_MONTH_YEAR)}
                </p>
              </div>
            </div>
            {userInfo?.role === ROLE.STUDENT ? (
              studentRegistrations?.length &&
              studentRegistrations[studentRegistrations?.length - 1]
                ?.canceled ? (
                <Button
                  type='primary'
                  size='large'
                  onClick={handleRegisterEvent}
                >
                  Đăng ký
                </Button>
              ) : (
                <Button danger size='large' onClick={handleCancelRegisterEvent}>
                  Hủy đăng ký
                </Button>
              )
            ) : (
              <></>
            )}
          </div>
        </address>
        <h1 class='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl'>
          {event?.vnName} ({event?.enName})
        </h1>
      </header>
      <div className='flex items-center justify-between'>
        <div>
          <p class='lead mb-2 italic'>
            Semester: {event?.semester?.vnName} ({event?.semester?.enName})
          </p>
          <p class='lead mb-4 italic'>
            Subjects:{' '}
            {event?.subjects
              ?.map((event) => event?.vnName + ` (${event?.enName})`)
              .join(', ')}
          </p>
        </div>
        <QRCode
          value={`${process.env.REACT_APP_EVENT_URL}event/${event?.id}`}
        />
      </div>
      <div
        class='mb-4'
        dangerouslySetInnerHTML={{ __html: event?.description }}
      ></div>
      <Image src={event?.image} alt='' />

      {studentRegistrations?.length &&
        !studentRegistrations[studentRegistrations?.length - 1]?.canceled && (
          <Steps
            style={{ marginTop: '4rem' }}
            current={
              studentRegistrations[
                studentRegistrations?.length - 1
              ]?.activities?.find((item) => item?.type === 'CHECKIN')
                ?.completedAt
                ? 1
                : studentRegistrations[
                    studentRegistrations?.length - 1
                  ]?.activities?.find((item) => item?.type === 'CHECKOUT')
                    ?.completedAt
                ? 2
                : 0
            }
            items={[
              {
                title: 'Check In',
                description: studentRegistrations[
                  studentRegistrations?.length - 1
                ]?.activities?.find((item) => item?.type === 'CHECKIN')
                  ?.completedAt
                  ? dayjs(
                      studentRegistrations[
                        studentRegistrations?.length - 1
                      ]?.activities?.find((item) => item?.type === 'CHECKIN')
                        ?.completedAt
                    ).format(TIME_FORMAT.FULL_DATE_TIME)
                  : '',
                status: studentRegistrations[
                  studentRegistrations?.length - 1
                ]?.activities?.find((item) => item?.type === 'CHECKIN')
                  ?.completedAt
                  ? 'finish'
                  : 'wait'
              },
              {
                title: 'Check Out',
                description: studentRegistrations[
                  studentRegistrations?.length - 1
                ]?.activities?.find((item) => item?.type === 'CHECKOUT')
                  ?.completedAt
                  ? dayjs(
                      studentRegistrations[
                        studentRegistrations?.length - 1
                      ]?.activities?.find((item) => item?.type === 'CHECKOUT')
                        ?.completedAt
                    ).format(TIME_FORMAT.FULL_DATE_TIME)
                  : '',
                status: studentRegistrations[
                  studentRegistrations?.length - 1
                ]?.activities?.find((item) => item?.type === 'CHECKOUT')
                  ?.completedAt
                  ? 'finish'
                  : 'wait'
              }
            ]}
          />
        )}

      {userInfo?.role === ROLE.EVENT_MANAGER && (
        <div style={{ marginTop: '2rem' }}>
          <h1 className='font-bold text-lg mb-4'>Students Registered</h1>
          <div className='text-sm mb-2 font-medium'>Tìm kiếm (Name):</div>
          <Search
            onSearch={(value) => setQuery(value)}
            className='md:max-w-[300px] mb-4'
          />
          <Table
            loading={loading}
            dataSource={dataEventRegistrationSuccess || []}
            columns={columnEventRegistrationSuccess}
            scroll={{ x: 1200 }}
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
      )}
    </>
  )
}

export default Post
