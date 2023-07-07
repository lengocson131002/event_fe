import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'
import AxiosPost from '../config/axiosPost'
import AxiosPut from '../config/axiosPut'
import { NotificationCustom } from '../components/Notification'
import { useMajor } from '../hooks/useMajor'
import { useStudents } from '../hooks/useStudent'
import { toLowerCaseNonAccentVietnamese } from '../utils/compareStringNonVietnamese'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const StudentsManagementPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState(null)
  const [query, setQuery] = useState()
  const [paging, setPaging] = useState({ pageSize: 20, pageNum: 1 })

  const [searchMajorValue, setSearchMajorValue] = useState()

  const [majorId, setMajorId] = useState()

  const { majors } = useMajor()
  const { loading, students, fetchStudents } = useStudents()

  useEffect(() => {
    fetchStudents({
      query,
      majorId,
      pageNum: paging.pageNum,
      pageSize: paging.pageSize
    })
  }, [query, paging, majorId])

  const UploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        <Image
          src={avatar}
          alt=''
          width={100}
          height={100}
          className='object-contain'
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code'
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
      title: 'Major',
      key: 'major',
      dataIndex: 'major',
      render: (_, record) => (
        <div className='flex items-center gap-4'>
          <Image src={record?.major?.image} width={100} height={100} />
          <span>
            {record?.major?.code} - {record?.major?.name}
          </span>
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type='dashed'
          onClick={() => navigate(`/student/${record?.id}`)}
        >
          Details
        </Button>
      )
    }
  ]

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...selectedStudent[0],
        majorId: selectedStudent[0]?.major?.id
      })
      selectedStudent[0]?.avatar &&
        setFileList([
          { uuid: selectedStudent[0]?.id, url: selectedStudent[0]?.avatar }
        ])
    }
  }, [isUpdate, selectedStudent[0]])

  const onFinish = (values) => {
    if (isUpdate) {
      AxiosPut(`/students/${selectedStudentId[0]}`, values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Update Student Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchStudents()
          setSelectedStudent([])
          setSelectedStudentId([])
        })
        .catch((err) => {
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.message || err.message
          })
        })
    } else {
      AxiosPost('/students', values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Create Student Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchStudents()
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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }

  const onChangeUploadFile = (info) => {
    setFileList(info.fileList)
    if (info.file.status === 'done') {
      form.setFieldValue('avatar', info?.file?.response?.fileUrl)
      console.log(info.fileList)
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const handleRemove = (file) => {
    form.resetFields(['avatar'])
    setFileList(null)
  }

  const handlePaging = (page, pageSize) => {
    setPaging({
      pageNum: page,
      pageSize
    })
  }

  return (
    <div className='p-12'>
      <div style={{ marginBottom: 24, display: 'flex', gap: '10px' }}>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setSelectedStudent([])
            setOpenDrawer(true)
          }}
        >
          <PlusOutlined style={{ color: 'green' }} />
        </Button>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          disabled={selectedStudent?.length !== 1}
          onClick={() => {
            setIsUpdate(true)
            setOpenDrawer(true)
          }}
        >
          <EditOutlined style={{ color: 'blue' }} />
        </Button>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          disabled={selectedStudent?.length === 0}
        >
          <DeleteOutlined style={{ color: 'red' }} />
        </Button>
      </div>

      <section className='bg-white'>
        <div className='flex flex-col md:flex-row gap-4 flex-wrap'>
          <div className='flex flex-col gap-2  mb-2'>
            <span className='text-sm mb-2 font-medium'>Tìm kiếm (Name):</span>
            <Search onSearch={(value) => setQuery(value)} />
          </div>

          <div className='flex flex-col gap-2 mb-2'>
            <span className='text-sm mb-2 font-medium'>
              Chuyên ngành (Major):
            </span>
            <Select
              allowClear
              style={{ minWidth: '200px' }}
              onSearch={(value) => setSearchMajorValue(value)}
              showSearch
              searchValue={searchMajorValue}
              filterOption={(input) =>
                toLowerCaseNonAccentVietnamese(searchMajorValue).indexOf(
                  toLowerCaseNonAccentVietnamese(input)
                ) >= 0
              }
              onChange={(value) => setMajorId(value)}
            >
              {majors
                ?.filter((item) =>
                  searchMajorValue
                    ? toLowerCaseNonAccentVietnamese(
                        `${item?.code} - ${item?.name}`
                      ).indexOf(
                        toLowerCaseNonAccentVietnamese(searchMajorValue)
                      ) >= 0
                    : true
                )
                ?.map((item) => (
                  <Select.Option value={item.id}>
                    <div className='flex items-center gap-4'>
                      <Image src={item?.image} width={40} height={40} />
                      <span>
                        {item?.code} - {item?.name}
                      </span>
                    </div>
                  </Select.Option>
                ))}
            </Select>
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
        dataSource={students?.data}
        scroll={{ x: 1200 }}
        rowKey={(record) => record?.id}
        rowSelection={{
          selectedRowKeys: selectedStudentId,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedStudent(selectedRows)
            setSelectedStudentId(selectedRowKeys)
          }
        }}
      />

      <Drawer
        title={`${isUpdate ? 'Update' : 'Add'} Student`}
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
              form='student'
              htmlType='submit'
              size='large'
              style={{ flex: 1 }}
            >
              {isUpdate ? 'Update' : 'Add'}
            </Button>
          </div>
        }
      >
        <Form layout='vertical' form={form} name='student' onFinish={onFinish}>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter student name.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='Code'
            name='code'
            rules={[
              {
                required: true,
                message: 'Please enter student code.'
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
                message: 'Please enter student phone.'
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
                message: 'Please enter valid student email.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            label='Major'
            name='majorId'
            rules={[
              {
                required: true,
                message: 'Please select a major.'
              }
            ]}
          >
            <Select size='large'>
              {majors?.map((item) => (
                <Select.Option value={item.id}>
                  <div className='flex items-center gap-4'>
                    <Image src={item?.image} width={40} height={40} />
                    <span>
                      {item?.code} - {item?.name}
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Address' name='address'>
            <Input size='large' />
          </Form.Item>

          <Form.Item label='Avatar' name='avatar'>
            <Upload
              name='file'
              accept='image/*'
              action={`${process.env.REACT_APP_API}media`}
              listType='picture-card'
              onChange={onChangeUploadFile}
              onPreview={handlePreview}
              multiple={true}
              maxCount={1}
              onRemove={handleRemove}
              fileList={fileList}
            >
              {UploadButton}
            </Upload>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt='preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <Input.TextArea rows={5} size='large' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default StudentsManagementPage
