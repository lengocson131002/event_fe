import React, { useEffect, useState } from 'react'
import { useEventManager } from '../hooks/useEventManager'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DatePicker, Image, Input, Select, Table } from 'antd'
import PROFILE from '../assets/defaultAvt.jpg'

import utc from 'dayjs/plugin/utc'
import { useSubjects } from '../hooks/useSubject'
import { useSemester } from '../hooks/useSemester'
import { useMajor } from '../hooks/useMajor'
import { useEvents } from '../hooks/useEvent'
import { TIME_FORMAT } from '../constants/common'
import dayjs from 'dayjs'
import { toLowerCaseNonAccentVietnamese } from '../utils/compareStringNonVietnamese'
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

const EventManagerDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { eventManager } = useEventManager(id)
  const [selectedEvent, setSelectedEvent] = useState([])
  const [selectedEventId, setSelectedEventId] = useState([])
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

  return (
    <div className='w-full'>
      <div className='flex md:flex-row flex-col p-20 gap-12 md:justify-around justify-center items-center relative'>
        <Image
          src={eventManager?.avatar ? eventManager?.avatar : PROFILE}
          className='max-w-[250px] object-contain'
        />

        <div className='flex flex-col gap-4 h-full'>
          <div>
            <h1 className='font-bold text-3xl flex items-center gap-2'>
              <>{eventManager?.name || eventManager?.userName || 'User'}</>
            </h1>
          </div>

          <span className='font-semibold'>
            <>
              Email: <span className='font-normal'>{eventManager?.email}</span>{' '}
            </>
          </span>
          <span className='font-semibold'>
            <>
              Phone: <span className='font-normal'>{eventManager?.phone}</span>
            </>
          </span>
          <span className='font-semibold'>
            <>
              Description:{' '}
              <span className='font-normal'>{eventManager?.description}</span>
            </>
          </span>
        </div>
      </div>
      <div className='p-20'>
        <h1 className='font-bold text-lg mb-4'>Events In Management</h1>
        <section className='bg-white'>
          <div className='flex flex-col md:flex-row justify-between flex-wrap'>
            <div className='flex flex-col gap-2  mb-2'>
              <span className='text-sm mb-2 font-medium'>Tìm kiếm (Name):</span>
              <Search onSearch={(value) => setQuery(value)} />
            </div>

            <div className='flex flex-col gap-2 mb-2'>
              <span className='text-sm mb-2 font-medium'>
                Học kì (Semester):
              </span>
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
              <span className='text-sm mb-2 font-medium'>
                Môn học (Subject):
              </span>
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
              <span className='text-sm mb-2 font-medium'>
                Thời gian (Time):
              </span>
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
      </div>
    </div>
  )
}

export default EventManagerDetailPage
