import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Image,
  Input,
  Select,
  Table,
  Tag
} from 'antd'
import React, { useEffect, useState } from 'react'
import AxiosPost from '../config/axiosPost'
import AxiosPut from '../config/axiosPut'
import { NotificationCustom } from '../components/Notification'
import dayjs from 'dayjs'
import { useSemester } from '../hooks/useSemester'
import { TIME_FORMAT } from '../constants/common'
import utc from 'dayjs/plugin/utc'
import { useSelector } from 'react-redux'

const { Search } = Input

const SemestersManagementPage = () => {
  const [form] = Form.useForm()
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState([])
  const [selectedSemesterId, setSelectedSemesterId] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [query, setQuery] = useState()

  const { loading, semesters, fetchSemester } = useSemester()

  const userInfo = useSelector((state) => state.global.userInfo)

  const columns = [
    {
      title: 'English Name',
      dataIndex: 'enName',
      key: 'enName'
    },
    {
      title: 'Vietnamese Name',
      dataIndex: 'vnName',
      key: 'vnName'
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) =>
        dayjs(startTime).format(TIME_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => dayjs(endTime).format(TIME_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) =>
        dayjs(record.endTime).isBefore(dayjs()) ? (
          <Tag color='red'>Past</Tag>
        ) : dayjs(record?.startTime).isAfter(dayjs()) ? (
          <Tag color='blue'>In Coming</Tag>
        ) : (
          <Tag color='green'>In Progress</Tag>
        )
    }
  ]

  useEffect(() => {
    fetchSemester({ query })
  }, [query])

  useEffect(() => {
    isUpdate &&
      form.setFieldsValue({
        ...selectedSemester[0],
        startTime: dayjs(selectedSemester[0]?.startTime),
        endTime: dayjs(selectedSemester[0]?.endTime)
      })
  }, [isUpdate, selectedSemester[0]])

  const onFinish = (values) => {
    if (isUpdate) {
      AxiosPut(`/semesters/${selectedSemesterId[0]}`, {
        ...values,
        startTime: dayjs(values.startTime).startOf('date').utc(),
        endTime: dayjs(values.endTime).startOf('date').utc()
      })
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Update Semester Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchSemester()
          setSelectedSemester([])
          setSelectedSemesterId([])
        })
        .catch((err) => {
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.message || err.message
          })
        })
    } else {
      AxiosPost('/semesters', {
        ...values,
        startTime: dayjs(values.startTime).startOf('date').utc(),
        endTime: dayjs(values.endTime).startOf('date').utc()
      })
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Create Semester Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchSemester()
        })
        .catch((err) => {
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.message || err.message
          })
        })
    }
  }

  return (
    <div className='p-12'>
      <div style={{ marginBottom: 24, display: 'flex', gap: '10px' }}>
        {userInfo?.role === 'ADMIN' && (
          <>
            <Button
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => {
                setSelectedSemester([])
                setOpenDrawer(true)
              }}
            >
              <PlusOutlined style={{ color: 'green' }} />
            </Button>
            <Button
              style={{ display: 'flex', alignItems: 'center' }}
              disabled={selectedSemester?.length !== 1}
              onClick={() => {
                setIsUpdate(true)
                setOpenDrawer(true)
              }}
            >
              <EditOutlined style={{ color: 'blue' }} />
            </Button>
          </>
        )}
      </div>

      <section className='bg-white'>
        <div className='flex flex-col md:flex-row justify-between flex-wrap'>
          <div className='flex flex-col gap-2  mb-2'>
            <span className='text-sm mb-2 font-medium'>Tìm kiếm (Name):</span>
            <Search onSearch={(value) => setQuery(value)} />
          </div>
        </div>
      </section>

      <Table
        pagination={{
          hideOnSinglePage: true
        }}
        loading={loading}
        columns={columns}
        dataSource={semesters}
        scroll={{ x: 1200 }}
        rowKey={(record) => record?.id}
        rowSelection={{
          selectedRowKeys: selectedSemesterId,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedSemester(selectedRows)
            setSelectedSemesterId(selectedRowKeys)
          }
        }}
      />

      <Drawer
        title={`${isUpdate ? 'Update' : 'Add'} Semester`}
        placement='right'
        onClose={() => {
          setOpenDrawer(false)
          setIsUpdate(false)
        }}
        open={openDrawer}
        width={
          window.innerWidth <= 1024 ? window.innerWidth : window.innerWidth / 2
        }
        footer={
          <div className='flex justify-between items-center gap-2'>
            <Button
              onClick={() => setOpenDrawer(false)}
              size='large'
              style={{ flex: 1 }}
            >
              Close
            </Button>
            <Button
              type='primary'
              form='semester'
              htmlType='submit'
              size='large'
              style={{ flex: 1 }}
            >
              {isUpdate ? 'Update' : 'Add'}
            </Button>
          </div>
        }
      >
        <Form layout='vertical' form={form} name='semester' onFinish={onFinish}>
          <Form.Item
            label='English Name'
            name='enName'
            rules={[
              {
                required: true,
                message: 'Please enter semester English name.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Vietnamese Name'
            name='vnName'
            rules={[
              {
                required: true,
                message: 'Please enter semester Vietnamese name.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Start Time'
            name='startTime'
            rules={[
              {
                required: true,
                message: 'Please enter semester start time.'
              }
            ]}
          >
            <DatePicker size='large' />
          </Form.Item>

          <Form.Item
            label='End Time'
            name='endTime'
            rules={[
              {
                required: true,
                message: 'Please enter semester end time.'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    dayjs(value).isBefore(dayjs(getFieldValue('startTime')))
                  ) {
                    return Promise.reject(
                      new Error(
                        'End Time must be after or equal to Start Time!'
                      )
                    )
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <DatePicker size='large' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default SemestersManagementPage
