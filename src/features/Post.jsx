import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PATH, TIME_FORMAT } from '../constants/common'
import {
  Button,
  Image,
  Input,
  Modal,
  Popover,
  QRCode,
  Steps,
  Table,
  Tag,
  Typography
} from 'antd'
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
import { AiFillEye, AiFillIdcard } from 'react-icons/ai'
import AxiosGet from '../config/axiosGet'

const { confirm } = Modal
const { Search } = Input
const { Text } = Typography

dayjs.extend(relativeTime)

const Post = ({ event }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state?.global?.userInfo)
  const [query, setQuery] = useState()

  const { studentRegistrations, fetchStudentRegistrations } =
    useStudentRegistrations(userInfo?.studentId, {
      eventId: event?.id
    })

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

  const isCheckInOut = studentRegistrations?.find((regis) =>
    regis?.activities?.find((act) => act?.completedAt)
  )

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
      title: 'Check-in Time',
      key: 'checkInTime',
      dataIndex: 'checkInTime',
      render: (_, record) =>
        record?.activities?.find((item) => item.type === 'CHECKIN')
          ?.completedAt &&
        dayjs(
          record?.activities?.find((item) => item.type === 'CHECKIN')
            ?.completedAt
        ).format(TIME_FORMAT.FULL_DATE_TIME)
    },
    {
      title: 'Check-out Time',
      key: 'checkInTime',
      dataIndex: 'checkInTime',
      render: (_, record) =>
        record?.activities?.find((item) => item.type === 'CHECKOUT')
          ?.completedAt &&
        dayjs(
          record?.activities?.find((item) => item.type === 'CHECKOUT')
            ?.completedAt
        ).format(TIME_FORMAT.FULL_DATE_TIME)
    },
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
            onClick={() =>
              handleCheckIn(
                record?.activities?.find((item) => item.type === 'CHECKIN')
              )
            }
          >
            Check In
          </Button>
          <Button
            disabled={
              record?.activities?.find((item) => item.type === 'CHECKOUT')
                ?.completedAt
            }
            onClick={() =>
              handleCheckOut(
                record?.activities?.find((item) => item.type === 'CHECKOUT')
              )
            }
          >
            Check Out
          </Button>
        </div>
      )
    }
  ]

  const handleDownloadExcel = async () => {
    const res = await AxiosGet(
      `/events/${event?.id}/registrations/excel`,
      {},
      {},
      { 'Content-Type': 'blob' },
      'arraybuffer'
    )
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')

    link.href = url
    link.setAttribute('download', 'event-registration.xlsx')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

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

  const activeRegistration =
    studentRegistrations && studentRegistrations?.length !== 0
      ? studentRegistrations?.find((item) => !item?.canceled)
      : undefined

  const registered = activeRegistration !== undefined

  return (
    <>
      <header class='mb-4 lg:mb-6 not-format'>
        <address class='flex items-center mb-6 not-italic'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex justify-between items-center w-full'>
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
                    {dayjs(event?.startTime).format(TIME_FORMAT.FULL_DATE_TIME)}{' '}
                    - {dayjs(event?.endTime).format(TIME_FORMAT.FULL_DATE_TIME)}
                  </p>
                </div>
              </div>

              {auth && userInfo?.role !== ROLE.STUDENT && (
                <div className='flex gap-4'>
                  <Popover
                    trigger={'click'}
                    overlayInnerStyle={{ padding: 0 }}
                    content={
                      <QRCode
                        size={500}
                        value={`${process.env.REACT_APP_EVENT_URL}event/${event?.id}/check-in`}
                        bordered={false}
                      />
                    }
                  >
                    <Button>QR Check-in</Button>
                  </Popover>
                  <Popover
                    trigger={'click'}
                    overlayInnerStyle={{ padding: 0 }}
                    content={
                      <QRCode
                        size={500}
                        value={`${process.env.REACT_APP_EVENT_URL}event/${event?.id}/check-out`}
                        bordered={false}
                      />
                    }
                  >
                    <Button>QR Check-out</Button>
                  </Popover>
                </div>
              )}
            </div>
            {!userInfo ? (
              <Button
                type='primary'
                size='large'
                onClick={handleRegisterEvent}
                style={{ marginLeft: '4px' }}
              >
                Register
              </Button>
            ) : (
              <></>
            )}
            {userInfo?.role === ROLE.STUDENT &&
              !isCheckInOut &&
              (!registered ? (
                <Button
                  type='primary'
                  size='large'
                  onClick={handleRegisterEvent}
                  style={{ marginLeft: '4px' }}
                >
                  Register
                </Button>
              ) : (
                <Button
                  danger
                  size='large'
                  onClick={handleCancelRegisterEvent}
                  style={{ marginLeft: '4px' }}
                >
                  Cancel
                </Button>
              ))}
          </div>
        </address>
        <h1 class='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl'>
          {event?.vnName} ({event?.enName})
        </h1>
      </header>

      <div className='my-5'>
        <Image src={event?.image} alt='' />
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <p class='lead mb-2 italic'>
            Semester: {event?.semester?.vnName} ({event?.semester?.enName})
          </p>
          <p class='lead mb-4 italic'>
            Subjects:{' '}
            {event?.subjects?.map((item) => (
              <Tag color='orange'>{item?.code}</Tag>
            ))}
          </p>
        </div>
        <div className='ml-5'>
          <QRCode
            value={`${process.env.REACT_APP_EVENT_URL}event/${event?.id}`}
          />
        </div>
      </div>

      <h1 className='mt-8 mb-5 text-xl font-bold'> DESCRIPTION</h1>

      <div
        class='mb-4'
        dangerouslySetInnerHTML={{ __html: event?.description }}
      ></div>

      {userInfo?.role === ROLE.STUDENT && registered && (
        <>
          <h1 className='mt-8 mb-5 text-xl font-bold'> ACTIVITIES</h1>
          <Steps
            current={
              activeRegistration?.activities?.find(
                (item) => item?.type === 'CHECKIN'
              )?.completedAt
                ? 1
                : studentRegistrations[
                    studentRegistrations?.length - 1
                  ]?.activities?.find((item) => item?.type === 'CHECKOUT')
                    ?.completedAt
                ? 2
                : null
            }
            items={[
              {
                title: 'Check In',
                description: activeRegistration?.activities?.find(
                  (item) => item?.type === 'CHECKIN'
                )?.completedAt
                  ? dayjs(
                      activeRegistration?.activities?.find(
                        (item) => item?.type === 'CHECKIN'
                      )?.completedAt
                    ).format(TIME_FORMAT.FULL_DATE_TIME)
                  : '',
                status: activeRegistration?.activities?.find(
                  (item) => item?.type === 'CHECKIN'
                )?.completedAt
                  ? 'finish'
                  : 'wait'
              },
              {
                title: 'Check Out',
                description: activeRegistration?.activities?.find(
                  (item) => item?.type === 'CHECKOUT'
                )?.completedAt
                  ? dayjs(
                      activeRegistration?.activities?.find(
                        (item) => item?.type === 'CHECKOUT'
                      )?.completedAt
                    ).format(TIME_FORMAT.FULL_DATE_TIME)
                  : '',
                status: activeRegistration?.activities?.find(
                  (item) => item?.type === 'CHECKOUT'
                )?.completedAt
                  ? 'finish'
                  : 'wait'
              }
            ]}
          />
        </>
      )}

      {(userInfo?.role === ROLE.EVENT_MANAGER ||
        userInfo?.role === ROLE.ADMIN) && (
        <div style={{ marginTop: '2rem' }}>
          <h1 className='font-bold text-lg mb-4'>Students Registered</h1>
          <div className='text-sm mb-2 font-medium'>Tìm kiếm (Name):</div>
          <Search
            onSearch={(value) => setQuery(value)}
            className='md:max-w-[300px] mb-4'
          />
          <Button className='ml-2' type='primary' onClick={handleDownloadExcel}>
            Download Excel
          </Button>
          <Table
            loading={loading}
            dataSource={dataEventRegistrationSuccess || []}
            columns={columnEventRegistrationSuccess}
            scroll={{ x: 1200 }}
            pagination={{ hideOnSinglePage: true }}
            summary={(dataEventRegistrationSuccess) => {
              const total = dataEventRegistrationSuccess?.length
              const totalCheckIn = dataEventRegistrationSuccess?.filter(
                (item) =>
                  item?.activities?.find((item) => item.type === 'CHECKIN')
                    ?.completedAt
              )?.length
              const totalCheckOut = dataEventRegistrationSuccess?.filter(
                (item) =>
                  item?.activities?.find((item) => item.type === 'CHECKOUT')
                    ?.completedAt
              )?.length

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type='danger'>{total}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      Total Check-in
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2}>
                      <Text type='danger'>{totalCheckIn}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      Total Check-out
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2}>
                      <Text type='danger'>{totalCheckOut}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )
            }}
          />
        </div>
      )}
    </>
  )
}

export default Post
