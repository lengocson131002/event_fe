import React from 'react'
import HeaderDark from '../components/HeaderDark'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const BlogPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <HeaderDark />
      <section className='bg-white'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-sm text-center lg:mb-16 mb-8'>
            <h2 className='mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 '>
              Our Blog
            </h2>
            <p className='font-light text-gray-500 sm:text-xl'>
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div className='grid gap-8 lg:grid-cols-2'>
            <article className='p-6 bg-white rounded-lg border border-gray-200 shadow-md '>
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
                  Article
                </span>
                <span className='text-sm'>14 days ago</span>
              </div>
              <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                <div
                  className='cursor-pointer'
                  onClick={() => navigate(`/blog/${1}`)}
                >
                  Thời trang Hàn Quốc: Cập nhật 10 xu hướng hot nhất năm 2023
                </div>
              </h2>
              <p className='mb-5 font-light text-gray-500 '>
                Làng điện ảnh, gameshow và giới “idol” không chỉ mang đến nhiều
                nguồn cảm hứng trong lòng giới trẻ mà thời trang Hàn Quốc cũng
                có sức ảnh hưởng rất lớn. Hàn Quốc ngày càng khẳng định vị thế
                “thủ phủ thời trang” của châu Á và đang dần lan tỏa đến cả
                phương Tây. Nào, cùng Đẹp365 điểm danh những xu hướng mới nhất
                để “update” cho tủ đồ mùa Thu- Đông 2023 và Xuân Hè 2023 này
                nhé!
              </p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                  <img
                    className='w-7 h-7 rounded-full'
                    src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png'
                    alt='Jese Leos avatar'
                  />
                  <span className='font-medium '>Jese Leos</span>
                </div>
                <a
                  onClick={() => navigate(`/blog/${1}`)}
                  className='inline-flex items-center font-medium text-primary-600 hover:underline'
                >
                  Read more
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
            <article className='p-6 bg-white rounded-lg border border-gray-200 shadow-md '>
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
                  Article
                </span>
                <span className='text-sm'>14 days ago</span>
              </div>
              <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                <div
                  className='cursor-pointer'
                  onClick={() => navigate(`/blog/${2}`)}
                >
                  8 xu hướng thời trang Hàn Quốc đẹp
                </div>
              </h2>
              <p className='mb-5 font-light text-gray-500'>
                Hàn Quốc luôn là đất nước đi đầu trong các xu hướng làm đẹp cho
                toàn châu Á. Và các cô nàng diễn viên, ca sĩ hay Ulzzang Hàn
                luôn được mọi chị em phụ nữ quan tâm họ mặc gì, để tóc như thế
                nào.
              </p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                  <img
                    className='w-7 h-7 rounded-full'
                    src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png'
                    alt='Bonnie Green avatar'
                  />
                  <span className='font-medium '>Bonnie Green</span>
                </div>
                <a
                  onClick={() => navigate(`/blog/${1}`)}
                  className='inline-flex items-center font-medium text-primary-600 hover:underline'
                >
                  Read more
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default BlogPage
