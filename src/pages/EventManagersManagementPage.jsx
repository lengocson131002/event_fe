import { Button, Drawer, Form, Image, Input, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AxiosPost from '../config/axiosPost'
import AxiosPut from '../config/axiosPut'
import { NotificationCustom } from '../components/Notification'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useEventManagers } from '../hooks/useEventManager'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const EventManagersManagementPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedEventManager, setSelectedEventManager] = useState([])
  const [selectedEventManagerId, setSelectedEventManagerId] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [query, setQuery] = useState()
  const [paging, setPaging] = useState({ pageSize: 20, pageNum: 1 })

  const { loading, eventManagers, fetchEventManagers } = useEventManagers()

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type='dashed'
          onClick={() => navigate(`/event-manager/${record?.id}`)}
        >
          Details
        </Button>
      )
    }
  ]

  useEffect(() => {
    fetchEventManagers({
      pageNum: paging.pageNum,
      pageSize: paging.pageSize,
      query
    })
  }, [query, paging])

  useEffect(() => {
    isUpdate &&
      form.setFieldsValue({
        ...selectedEventManager[0]
      })
  }, [isUpdate, selectedEventManager[0]])

  const handlePaging = (page, pageSize) => {
    setPaging({
      pageNum: page,
      pageSize
    })
  }

  const onFinish = (values) => {
    if (isUpdate) {
      AxiosPut(`/event-managers/${selectedEventManagerId[0]}`, values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Update Event Manager Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchEventManagers()
          setSelectedEventManager([])
          setSelectedEventManagerId([])
        })
        .catch((err) => {
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.message || err.message
          })
        })
    } else {
      AxiosPost('/event-managers', values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Create Event Manager Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchEventManagers()
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
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setSelectedEventManager([])
            setOpenDrawer(true)
          }}
        >
          <PlusOutlined style={{ color: 'green' }} />
        </Button>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          disabled={selectedEventManager?.length !== 1}
          onClick={() => {
            setIsUpdate(true)
            setOpenDrawer(true)
          }}
        >
          <EditOutlined style={{ color: 'blue' }} />
        </Button>
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
          onChange: handlePaging,
          hideOnSinglePage: true,
          pageSize: 20
        }}
        loading={loading}
        columns={columns}
        dataSource={eventManagers?.data}
        scroll={{ x: 1200 }}
        rowKey={(record) => record?.id}
        rowSelection={{
          selectedRowKeys: selectedEventManagerId,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedEventManager(selectedRows)
            setSelectedEventManagerId(selectedRowKeys)
          }
        }}
      />

      <Drawer
        title={`${isUpdate ? 'Update' : 'Add'} Event Manager`}
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
              form='event-manager'
              htmlType='submit'
              size='large'
              style={{ flex: 1 }}
            >
              {isUpdate ? 'Update' : 'Add'}
            </Button>
          </div>
        }
      >
        <Form
          layout='vertical'
          form={form}
          name='event-manager'
          onFinish={onFinish}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please enter event manager username.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                min: 8,
                max: 2147483647,
                message: 'Please enter valid event manager password.'
              }
            ]}
          >
            <Input.Password size='large' />
          </Form.Item>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter event manager name.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please enter event manager phone.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[A-Za-z0-9._%+-]+@fpt\.edu\.vn$/),
                message: 'Please enter valid event manager email.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <Input.TextArea rows={5} size='large' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default EventManagersManagementPage
