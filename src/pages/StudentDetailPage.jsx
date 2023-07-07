import React, { useEffect, useState } from 'react'
import PROFILE from '../assets/defaultAvt.jpg'

import { Empty, Image, Input, Spin } from 'antd'

import { useStudentRegistrations } from '../hooks/useStudentRegistration'
import Thumbnail from '../components/Thumbnail'
import { useStudent } from '../hooks/useStudent'
import { useParams } from 'react-router-dom'

const { Search } = Input

const StudentDetailPage = () => {
  const { id } = useParams()

  const [query, setQuery] = useState()

  const { student } = useStudent(id)

  const { studentRegistrations, loading, fetchStudentRegistrations } =
    useStudentRegistrations(student?.studentId)

  useEffect(() => {
    fetchStudentRegistrations({ query })
  }, [query])

  useEffect(() => {
    fetchStudentRegistrations(student?.id)
  }, [student])

  return (
    <div className='w-full'>
      <div className='flex md:flex-row flex-col p-20 gap-12 md:justify-around justify-center items-center relative'>
        <Image
          src={student?.avatar ? student?.avatar : PROFILE}
          className='max-w-[250px] object-contain'
        />

        <div className='flex flex-col gap-4 h-full'>
          <div>
            <h1 className='font-bold text-3xl flex items-center gap-2'>
              <>{student?.name || student?.userName || 'User'}</>
            </h1>
          </div>

          <span className='font-semibold'>
            <>
              Email: <span className='font-normal'>{student?.email}</span>{' '}
            </>
          </span>
          <span className='font-semibold'>
            <>
              Phone: <span className='font-normal'>{student?.phone}</span>
            </>
          </span>
          <span className='font-semibold'>
            <>
              Description:{' '}
              <span className='font-normal'>{student?.description}</span>
            </>
          </span>
        </div>
      </div>

      <div className='w-full flex flex-col items-center gap-4 bg-white'>
        <div className='text-2xl mt-10  font-medium bg-black w-80 text-white py-2 text-center'>
          SỰ KIỆN ĐÃ ĐĂNG KÝ
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
            </div>

            <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
              <div className='grid gap-8 lg:grid-cols-2'>
                {studentRegistrations?.length ? (
                  studentRegistrations
                    ?.filter((item) => !item?.canceled)
                    ?.map((item) => (
                      <Spin spinning={loading}>
                        <Thumbnail item={item?.event} />
                      </Spin>
                    ))
                ) : (
                  <Empty
                    description='Không có sự kiện nào'
                    style={{ minWidth: '80vw' }}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default StudentDetailPage
