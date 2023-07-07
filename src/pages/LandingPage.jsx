import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Thumbnail from '../components/Thumbnail'
import Footer from '../components/Footer'
import DECORE from '../assets/decore.png'
import MODEL from '../assets/model.png'
import { Link } from 'react-router-dom'
import { PATH } from '../constants/common'
import CarouselBanner from '../components/CarouselBanner'
import {
  Image,
  Input,
  Select,
  Skeleton,
  Spin,
  DatePicker,
  Empty,
  Pagination
} from 'antd'
import { useEvents, useEventsHot, useEventsUpComing } from '../hooks/useEvent'
import { toLowerCaseNonAccentVietnamese } from '../utils/compareStringNonVietnamese'
import { useSubjects } from '../hooks/useSubject'
import { useMajor } from '../hooks/useMajor'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

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

const LandingPage = () => {
  const { events, fetchEvents, loading } = useEvents()
  const { events: eventsHot, loading: loadingEventsHot } = useEventsHot()
  const { events: eventsUpComing, loading: loadingEventsUpComing } =
    useEventsUpComing()
  const [query, setQuery] = useState()
  const [paging, setPaging] = useState({ pageSize: 20, pageNum: 1 })
  const [rangePicker, setRangePicker] = useState()
  const [searchSubjectValue, setSearchSubjectValue] = useState()
  const [searchMajorValue, setSearchMajorValue] = useState()
  const [subjectId, setSubjectId] = useState()
  const [majorId, setMajorId] = useState()
  const { subjects } = useSubjects()
  const { majors } = useMajor()

  useEffect(() => {
    fetchEvents({
      query,
      subjectId,
      majorId,
      pageNum: paging.pageNum,
      pageSize: paging.pageSize,
      ...(rangePicker?.from && { from: rangePicker.from }),
      ...(rangePicker?.to && { to: rangePicker.to })
    })
  }, [query, subjectId, majorId, paging, rangePicker])

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
      <Header />

      <div className='md:px-64 md:py-6 mb-32'>
        <img
          src={DECORE}
          alt='decore'
          className='absolute right-0 top-0 -z-10'
        />

        <div className='pt-48 flex items-center px-4'>
          <div className='w-[450px]'>
            <div>
              <div className='grid gap-4 mb-3'>
                <span className='text-redText font-bold text-2xl'>
                  Global Citizen
                </span>
                <span className='font-bold text-3xl text-purpleText z-50 mb-3'>
                  FPTU - môi trường năng động, sáng tạo!
                </span>
              </div>
              <div>
                <span className='text-lightPurpleText'>
                  Tại đại học FPTU, mọi sinh viên đều có thể thỏa thích tham gia
                  các hoạt động ngoại khóa bổ ích, từ các workshop kỹ năng cho
                  tới các sự kiện giải trí.
                </span>
              </div>
              <div className='flex items-center space-x-6 mt-2'>
                <Link
                  to={PATH.LOGIN}
                  className='px-4 py-2.5 rounded-md bg-yellowColor text-textWhite'
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </div>
          <div className='absolute top-20 right-40 md:visible invisible'>
            <img src={MODEL} alt='model' />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center px-8'>
        <div className='text-2xl my-8 md:my-12 font-medium bg-black w-80 text-white py-2 text-center'>
          SỰ KIỆN HOT
        </div>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
          <div className='grid gap-8 lg:grid-cols-2'>
            {eventsHot?.map((item) => (
              <Spin spinning={loading}>
                <Thumbnail item={item} />
              </Spin>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center px-8'>
        <div className='text-2xl my-8 md:my-12 font-medium bg-black w-80 text-white py-2 text-center'>
          SỰ KIỆN SẮP DIỄN RA
        </div>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
          <div className='grid gap-8 lg:grid-cols-2'>
            {eventsUpComing?.map((item) => (
              <Spin spinning={loading}>
                <Thumbnail item={item} />
              </Spin>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-center px-8 mb-8'>
        <div className='text-2xl my-8 md:my-12 font-medium bg-black w-80 text-white py-2 text-center'>
          TẤT CẢ
        </div>

        <section className='bg-white'>
          <div className='px-4 max-w-screen-xl lg:px-6 flex flex-col md:flex-row justify-between flex-wrap'>
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
                style={{ width: '250px' }}
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
                style={{ width: '200px' }}
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

      <div className='w-full flex flex-col items-center px-8'>
        <CarouselBanner />
      </div>

      <div className='w-full h-[0px]'>
        <img
          src='https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/348562480_983723215970400_3113199875836967802_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=abSsbFq-xsMAX8zQHPM&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfB_pdJX0uT4dqnD7aEOTL_4VNwkno_9aLyaXcnH8hrNqQ&oe=64A9B18C'
          alt=''
        />
      </div>

      <div className='w-full flex flex-col items-center'>
        <div className='text-2xl my-8 md:my-12 font-medium bg-black w-80 text-white py-2 text-center'>
          KHÁM PHÁ
        </div>
        <div className='w-full max-w-5xl p-5 pb-10 mx-auto mb-10 gap-5 columns-3 space-y-5'>
          <img
            src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/356213111_656883989814778_2231285817942062020_n.jpg?_nc_cat=100&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1Lp9zcVyG5gAX8YFLOM&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCj6jaktn55KQR-zEv5r3Sk-lOHnz63Vjt75UpMPV9mkg&oe=64A92BE9'
            alt=''
          />
          <img
            src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/355281353_654413006728543_636684727483353825_n.jpg?_nc_cat=102&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=BPV1-fcz4_0AX_WtyFB&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDUw9kXB5BmdsCD26T5mRJRKo6eaCYA3-5XZXIld0aFMQ&oe=64A9405F'
            alt=''
          />

          <img
            src='https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/354452671_651195930383584_1956472082919072178_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7UMSNJ_T178AX-IsOVz&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfDlP74dMc635bzs2a4tCBzZMm4eEdHM7Ui1rDDO-rRXUQ&oe=64AA9650'
            alt=''
          />
          <img
            src='https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/357799868_662989422537568_6516230266412233255_n.jpg?_nc_cat=107&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=KFyyEHc6A2oAX-PRAB5&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfAB1-2MQBRKhLmXoD3CIpxvgOBpVaOEXOr2_7zwTs3acA&oe=64A98B64'
            alt=''
          />
          <img
            src='https://hcmuni.fpt.edu.vn/Data/Sites/1/media/zz2020file/halloween/halloween---hi%CC%80nh-2-(1)-(1).jpg'
            alt=''
          />
          <img
            src='https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/349119685_760307352307213_7507654074818927862_n.jpg?_nc_cat=111&cb=99be929b-59f725be&ccb=1-7&_nc_sid=730e14&_nc_ohc=bor-UDGT3S0AX8Vlgvy&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfDoSjELw8R9MtMbIFwvO8T-A8X8weHqTGbRgueFOzkA5Q&oe=64A9BA76'
            alt=''
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage
