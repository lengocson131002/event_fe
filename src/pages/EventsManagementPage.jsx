import {
  Button,
  DatePicker,
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
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { useEventManagers } from '../hooks/useEventManager'
import { TIME_FORMAT } from '../constants/common'
import dayjs from 'dayjs'
import { useSubjects } from '../hooks/useSubject'
import { useEvents } from '../hooks/useEvent'
import { useSemester } from '../hooks/useSemester'
import { useNavigate } from 'react-router-dom'
import { useMajor } from '../hooks/useMajor'
import { toLowerCaseNonAccentVietnamese } from '../utils/compareStringNonVietnamese'

import utc from 'dayjs/plugin/utc'
import { CustomReactQuillComment } from '../components/Editor/Editor.style'
dayjs.extend(utc)

const { RangePicker } = DatePicker
const { Search } = Input

const rangePresets = [
  { label: 'Today', value: [dayjs().startOf('date'), dayjs().endOf('date')] },
  {
    label: 'Yesterday',
    value: [dayjs().add(-1, 'd').startOf('date'), dayjs().endOf('date')]
  },
  {
    label: 'Last 7 days',
    value: [dayjs().add(-7, 'd').startOf('date'), dayjs().endOf('date')]
  },
  {
    label: 'Last 30 days',
    value: [dayjs().add(-30, 'd').startOf('date'), dayjs().endOf('date')]
  },
  {
    label: 'This month',
    value: [dayjs().startOf('date'), dayjs().endOf('m').endOf('date')]
  },
  {
    label: 'This year',
    value: [dayjs().startOf('date'), dayjs().endOf('y').endOf('date')]
  },
  {
    label: 'Last year',
    value: [dayjs().add(-1, 'y').startOf('date'), dayjs().endOf('date')]
  }
]

const EventsManagementPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])
  const [selectedEventId, setSelectedEventId] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState()
  const [query, setQuery] = useState()
  const [paging, setPaging] = useState({ pageSize: 20, pageNum: 1 })
  const [rangePicker, setRangePicker] = useState()
  const [searchSemesterValue, setSearchSemesterValue] = useState()
  const [searchSubjectValue, setSearchSubjectValue] = useState()
  const [searchMajorValue, setSearchMajorValue] = useState()
  const [semesterId, setSemesterId] = useState()
  const [subjectId, setSubjectId] = useState()
  const [majorId, setMajorId] = useState()
  const { loading, events, fetchEvents } = useEvents()
  const { subjects } = useSubjects()
  const { semesters } = useSemester()
  const { majors } = useMajor()

  useEffect(() => {
    fetchEvents({
      query,
      subjectId,
      semesterId,
      majorId,
      pageNum: paging.pageNum,
      pageSize: paging.pageSize,
      ...(rangePicker?.from && { from: rangePicker.from }),
      ...(rangePicker?.to && { to: rangePicker.to })
    })
  }, [query, subjectId, semesterId, majorId, paging, rangePicker])

  const onRangeChange = (dates, dateStrings) => {
    setRangePicker({
      from: dates ? dates[0]?.utc().format() : null,
      to: dates ? dates[1]?.utc().format() : null
    })
  }

  const handlePaging = (page, pageSize) => {
    setPaging({
      pageNum: page,
      pageSize
    })
  }

  const UploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} alt='' width={120} height={120} />
    },
    {
      title: 'English Name',
      dataIndex: 'enName',
      key: 'enName'
    },
    {
      title: 'Vietnamese Name',
      key: 'vnName',
      dataIndex: 'vnName'
    },
    {
      title: 'Start Time',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (startTime) =>
        dayjs(startTime).format(TIME_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: 'End Time',
      key: 'endTime',
      dataIndex: 'endTime',
      render: (endTime) => dayjs(endTime).format(TIME_FORMAT.DATE_MONTH_YEAR)
    },
    {
      title: 'Semester',
      key: 'semester',
      dataIndex: 'semester',
      render: (_, record) =>
        record?.semester?.enName + ' - ' + record?.semester?.vnName
    },
    {
      title: 'Subjects',
      key: 'subjects',
      dataIndex: 'subjects',
      render: (_, record) =>
        record?.subjects
          ?.map((item) => item?.vnName + ` (${item?.enName})`)
          .join(', ')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type='dashed' onClick={() => navigate(`/event/${record?.id}`)}>
          Details
        </Button>
      )
    }
  ]

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        ...selectedEvent[0],
        startTime: dayjs(selectedEvent[0]?.startTime),
        endTime: dayjs(selectedEvent[0]?.endTime),
        semesterId: selectedEvent[0]?.semester?.id,
        subjectIds: selectedEvent[0]?.subjects?.map((subject) => subject?.id)
      })
      setFileList([
        { uuid: selectedEvent[0]?.id, url: selectedEvent[0]?.image }
      ])
    }
  }, [isUpdate, selectedEvent])

  const onFinish = (values) => {
    if (isUpdate) {
      AxiosPut(`/events/${selectedEventId[0]}`, values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Update Event Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchEvents()
          setSelectedEvent([])
          setSelectedEventId([])
        })
        .catch((err) => {
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.message || err.message
          })
        })
    } else {
      AxiosPost('/events', values)
        .then(() => {
          NotificationCustom({
            type: 'success',
            message: 'Success',
            description: 'Create Event Successfully!'
          })
          setOpenDrawer(false)
          form.resetFields()
          fetchEvents()
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
      form.setFieldValue('image', info?.file?.response?.fileUrl)
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const handleRemove = (file) => {
    form.resetFields(['image'])
    setFileList(null)
  }

  return (
    <div className='p-12'>
      <div style={{ marginBottom: 24, display: 'flex', gap: '10px' }}>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setSelectedEvent([])
            setOpenDrawer(true)
          }}
        >
          <PlusOutlined style={{ color: 'green' }} />
        </Button>
        <Button
          style={{ display: 'flex', alignItems: 'center' }}
          disabled={selectedEvent?.length !== 1}
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

          <div className='flex flex-col gap-2 mb-2'>
            <span className='text-sm mb-2 font-medium'>Học kì (Semester):</span>
            <Select
              allowClear
              style={{ minWidth: '200px' }}
              onSearch={(value) => setSearchSemesterValue(value)}
              showSearch
              searchValue={searchSemesterValue}
              filterOption={(input) =>
                toLowerCaseNonAccentVietnamese(searchSemesterValue).indexOf(
                  toLowerCaseNonAccentVietnamese(input)
                ) >= 0
              }
              onChange={(value) => setSemesterId(value)}
            >
              {semesters
                ?.filter((item) =>
                  searchSemesterValue
                    ? toLowerCaseNonAccentVietnamese(
                        `${item?.enName} - ${item?.vnName}`
                      ).indexOf(
                        toLowerCaseNonAccentVietnamese(searchSemesterValue)
                      ) >= 0
                    : true
                )
                ?.map((item) => (
                  <Select.Option value={item?.id}>
                    {item?.enName + ' - ' + item?.vnName}
                  </Select.Option>
                ))}
            </Select>
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

          <div className='flex flex-col gap-2 mb-2'>
            <span className='text-sm mb-2 font-medium'>Môn học (Subject):</span>
            <Select
              allowClear
              style={{ minWidth: '200px' }}
              onSearch={(value) => setSearchSubjectValue(value)}
              showSearch
              searchValue={searchSubjectValue}
              filterOption={(input) =>
                toLowerCaseNonAccentVietnamese(searchSubjectValue).indexOf(
                  toLowerCaseNonAccentVietnamese(input)
                ) >= 0
              }
              onChange={(value) => setSubjectId(value)}
            >
              {subjects
                ?.filter((item) =>
                  searchSubjectValue
                    ? toLowerCaseNonAccentVietnamese(
                        `${item?.enName} - ${item?.vnName}`
                      ).indexOf(
                        toLowerCaseNonAccentVietnamese(searchSubjectValue)
                      ) >= 0
                    : true
                )
                ?.map((item) => (
                  <Select.Option value={item?.id}>
                    {item?.enName + ' - ' + item?.vnName}
                  </Select.Option>
                ))}
            </Select>
          </div>

          <div className='flex flex-col gap-2 mb-2'>
            <span className='text-sm mb-2 font-medium'>Thời gian (Time):</span>
            <RangePicker
              allowClear
              presets={rangePresets}
              onChange={onRangeChange}
              style={{ marginBottom: 12 }}
            />
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
        dataSource={events?.data}
        scroll={{ x: 1200 }}
        rowKey={(record) => record?.id}
        rowSelection={{
          selectedRowKeys: selectedEventId,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedEvent(selectedRows)
            setSelectedEventId(selectedRowKeys)
          }
        }}
      />

      <Drawer
        title={`${isUpdate ? 'Update' : 'Add'} Event`}
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
            label='English Name'
            name='enName'
            rules={[
              {
                required: true,
                message: 'Please enter event English name.'
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
                message: 'Please enter event Vietnamese name.'
              }
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            label='Semester'
            name='semesterId'
            rules={[
              {
                required: true,
                message: 'Please select a semester.'
              }
            ]}
          >
            <Select
              size='large'
              allowClear
              style={{ minWidth: '200px' }}
              onSearch={(value) => setSearchSemesterValue(value)}
              showSearch
              searchValue={searchSemesterValue}
              filterOption={(input) =>
                toLowerCaseNonAccentVietnamese(searchSemesterValue).indexOf(
                  toLowerCaseNonAccentVietnamese(input)
                ) >= 0
              }
              onChange={(value) => setSemesterId(value)}
            >
              {semesters
                ?.filter((item) =>
                  searchSemesterValue
                    ? toLowerCaseNonAccentVietnamese(
                        `${item?.enName} - ${item?.vnName}`
                      ).indexOf(
                        toLowerCaseNonAccentVietnamese(searchSemesterValue)
                      ) >= 0
                    : true
                )
                ?.map((item) => (
                  <Select.Option value={item?.id}>
                    {item?.enName + ' - ' + item?.vnName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Subjects'
            name='subjectIds'
            rules={[
              {
                required: true,
                message: 'Please select a subject.'
              }
            ]}
          >
            <Select
              mode='multiple'
              size='large'
              allowClear
              style={{ minWidth: '200px' }}
              onSearch={(value) => setSearchSubjectValue(value)}
              showSearch
              searchValue={searchSubjectValue}
              filterOption={(input) =>
                toLowerCaseNonAccentVietnamese(searchSubjectValue).indexOf(
                  toLowerCaseNonAccentVietnamese(input)
                ) >= 0
              }
              onChange={(value) => setSubjectId(value)}
            >
              {subjects
                ?.filter((item) =>
                  searchSubjectValue
                    ? toLowerCaseNonAccentVietnamese(
                        `${item?.enName} - ${item?.vnName}`
                      ).indexOf(
                        toLowerCaseNonAccentVietnamese(searchSubjectValue)
                      ) >= 0
                    : true
                )
                ?.map((item) => (
                  <Select.Option value={item?.id}>
                    {item?.enName + ' - ' + item?.vnName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Start Time'
            name='startTime'
            rules={[
              {
                required: true,
                message: 'Please enter event start time.'
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
                message: 'Please enter event end time.'
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

          <Form.Item
            label='Image'
            rules={[
              {
                required: true,
                message: 'Please select an image.'
              }
            ]}
            name='image'
          >
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

          <Form.Item
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: 'Please enter description.'
              }
            ]}
          >
            <CustomReactQuillComment
              // modules={modules}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'list',
                'indent',
                'link',
                'color',
                'image',
                'mention'
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default EventsManagementPage
