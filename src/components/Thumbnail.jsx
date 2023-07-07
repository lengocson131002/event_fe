import React from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Image } from 'antd'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime) // Extend Day.js with the relativeTime plugin

const Thumbnail = ({ item }) => {
  const navigate = useNavigate()

  return (
    <article className='p-6 bg-white rounded-lg border border-gray-200 shadow-md '>
      <div className='flex justify-center'>
        <Image src={item?.image} alt='' className='max-h-40 object-contain' />
      </div>
      <div className='flex justify-between items-center mb-5 text-gray-500'>
        <span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded '>
          <svg
            className='mr-1 w-3 h-3'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
              clip-rule='evenodd'
            ></path>
            <path d='M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z'></path>
          </svg>
          Sự kiện
        </span>
        <span className='text-sm'>
          {dayjs(item?.updatedAt).locale('vi').fromNow()}
        </span>
      </div>
      <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
        <div className='cursor-pointer' onClick={() => navigate(`/event/${1}`)}>
          {item?.vnName} ({item?.enName})
        </div>
      </h2>
      <p class='lead mb-2 italic'>
        Semester: {item?.semester?.vnName} ({item?.semester?.enName})
      </p>
      <p class='lead mb-4 italic'>
        Subjects:{' '}
        {item?.subjects
          ?.map((item) => item?.vnName + ` (${item?.enName})`)
          .join(', ')}
      </p>
      <p className='mb-5 font-light text-gray-500 lg:min-w-[300px] min-w-[80vw]'>
        {item?.description}
      </p>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <img
            className='w-7 h-7 rounded-full'
            src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
            alt='avatar'
          />
          <span className='font-medium'>Quản lý sự kiện</span>
        </div>
        <a
          onClick={() => navigate(`/event/${1}`)}
          className='inline-flex items-center font-medium text-primary-600 hover:underline cursor-pointer'
        >
          Chi tiết
          <svg
            className='ml-2 w-4 h-4'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
        </a>
      </div>
    </article>
  )
}

export default Thumbnail
