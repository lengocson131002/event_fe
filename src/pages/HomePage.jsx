import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { DatePicker, Empty, Image, Input, Pagination, Select, Spin } from 'antd'
import Thumbnail from '../components/Thumbnail'
import { useEvents } from '../hooks/useEvent'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useSemester } from '../hooks/useSemester'
import { useSubjects } from '../hooks/useSubject'
import { toLowerCaseNonAccentVietnamese } from '../utils/compareStringNonVietnamese'
import { useMajor } from '../hooks/useMajor'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc) // Extend Day.js with the UTC plugin

const { Search } = Input
const { RangePicker } = DatePicker

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

const HomePage = () => {
  const [query, setQuery] = useState()
  const [paging, setPaging] = useState({ pageSize: 20, pageNum: 1 })
  const [rangePicker, setRangePicker] = useState()
  const [searchSemesterValue, setSearchSemesterValue] = useState()
  const [searchSubjectValue, setSearchSubjectValue] = useState()
  const [searchMajorValue, setSearchMajorValue] = useState()
  const [semesterId, setSemesterId] = useState()
  const [subjectId, setSubjectId] = useState()
  const [majorId, setMajorId] = useState()
  const { events, fetchEvents, loading } = useEvents()
  const { semesters } = useSemester()
  const { subjects } = useSubjects()
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

  const handlePaging = (page, pageSize) => {
    setPaging({
      pageNum: page,
      pageSize
    })
  }

  const onRangeChange = (dates, dateStrings) => {
    setRangePicker({
      from: dates ? dates[0]?.utc().format() : null,
      to: dates ? dates[1]?.utc().format() : null
    })
  }

  return (
    <div className='w-full'>
      <Banner />

      <div className='w-full flex flex-col items-center gap-4 bg-white'>
        <div className='text-2xl mt-10  font-medium bg-black w-80 text-white py-2 text-center'>
          KHÁM PHÁ SỰ KIỆN
        </div>
        <span className='w-20 h-[3px] bg-black'></span>

        <div className='w-full flex flex-col items-center px-8 mb-8'>
          <section className='bg-white'>
            <div className='px-4 max-w-screen-xl lg:px-6 flex flex-col md:flex-row justify-between flex-wrap'>
              <div className='flex flex-col gap-2  mb-2'>
                <span className='text-sm mb-2 font-medium'>
                  Tìm kiếm (Name):
                </span>
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

            <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
              <div className='grid gap-8 lg:grid-cols-2'>
                {events?.data?.length ? (
                  events?.data?.map((item) => (
                    <Spin spinning={loading}>
                      <Thumbnail item={item} />
                    </Spin>
                  ))
                ) : (
                  <Empty
                    description='Không có sự kiện nào'
                    style={{ minWidth: '80vw' }}
                  />
                )}
              </div>

              <Pagination
                className='mt-8 w-full flex justify-center'
                defaultCurrent={1}
                total={events?.total}
                showSizeChanger={false}
                onChange={handlePaging}
                pageSize={20}
                current={events?.pageNum}
                hideOnSinglePage
              />
            </div>
          </section>
        </div>

        <div className='flex md:flex-row flex-col gap-5 mb-12 px-6 md:px-20 w-full'>
          <div className='bg-advertise1 bg-no-repeat bg-cover bg-center w-full md:w-1/2 min-h-[300px] text-white p-12 md:p-24 flex flex-col items-center gap-5 flex-1'>
            <h1 className='text-2xl font-semibold'></h1>
            <p className='text-center'></p>
            <button className='text-orange py-2 px-4  rounded-full text-xs bg-white border border-orange hover:bg-orange hover:text-white duration-300'>
              ĐĂNG KÝ NGAY
            </button>
          </div>

          <div
            className={`bg-advertise2 bg-no-repeat bg-cover bg-center w-full md:w-1/2 min-h-[300px] text-white p-12 md:p-24 flex flex-col items-center gap-5 flex-1`}
          >
            <h1 className='text-2xl font-semibold'></h1>
            <p className='text-center'></p>
            <button className='text-orange py-2 px-4 rounded-full text-xs bg-white border border-orange border-orange hover:bg-orange hover:text-white duration-300'>
              ĐĂNG KÝ NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
