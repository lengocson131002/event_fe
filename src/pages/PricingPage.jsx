import React from 'react'
import HeaderDark from '../components/HeaderDark'
import Footer from '../components/Footer'
import MOMO from '../assets/logo-momo.jpg'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constants/common'
import { useDispatch } from 'react-redux'
import { setDescriptionId, setPrice } from '../app/price.store'

const PricingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div>
      <HeaderDark />

      <section className='bg-white'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
          <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900'>
              Boost your styles with DressUp Premium
            </h2>
            <p className='mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400'>
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditiis repellendus etur quidem
              assumenda.
            </p>
          </div>
          <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
            <div className='flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8'>
              <h3 className='mb-4 text-2xl font-semibold'>Public</h3>
              <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
                Best option for personal use & for your next project.
              </p>
              <div className='flex justify-center items-baseline my-8'>
                <span className='mr-2 text-5xl font-extrabold'>Free</span>
                {/* <span className='text-gray-500 dark:text-gray-400'>/month</span> */}
              </div>
              <ul role='list' className='mb-8 space-y-4 text-left'>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>Individual configuration</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Team size:{' '}
                    <span className='font-semibold'>1 developer</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Premium support:{' '}
                    <span className='font-semibold'>6 months</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Free updates:{' '}
                    <span className='font-semibold'>6 months</span>
                  </span>
                </li>
              </ul>
              <button
                // onClick={() => {
                //   navigate(PATH.PRICING_INFO)
                //   dispatch(setPrice(29))
                // }}
                className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900'
              >
                Free
              </button>
            </div>
            <div className='flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8'>
              <h3 className='mb-4 text-2xl font-semibold'>Premium 1</h3>
              <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
                Relevant for multiple users, extended & premium support.
              </p>
              <div className='flex justify-center items-baseline my-8'>
                <span className='mr-2 text-5xl font-extrabold'>$9</span>
                <span className='text-gray-500 dark:text-gray-400'>/month</span>
              </div>
              <ul role='list' className='mb-8 space-y-4 text-left'>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>Individual configuration</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Team size:{' '}
                    <span className='font-semibold'>10 developers</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Premium support:{' '}
                    <span className='font-semibold'>24 months</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Free updates:{' '}
                    <span className='font-semibold'>24 months</span>
                  </span>
                </li>
              </ul>
              <button
                onClick={() => {
                  navigate(PATH.PRICING_INFO)
                  dispatch(setPrice(9))
                  dispatch(setDescriptionId(2))
                }}
                className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900'
              >
                Get started
              </button>
            </div>
            <div className='flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8'>
              <h3 className='mb-4 text-2xl font-semibold'>Premium 2</h3>
              <p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
                Best for large scale uses and extended redistribution rights.
              </p>
              <div className='flex justify-center items-baseline my-8'>
                <span className='mr-2 text-5xl font-extrabold'>$29</span>
                <span className='text-gray-500 dark:text-gray-400'>/month</span>
              </div>
              <ul role='list' className='mb-8 space-y-4 text-left'>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>Individual configuration</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Team size:{' '}
                    <span className='font-semibold'>100+ developers</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Premium support:{' '}
                    <span className='font-semibold'>36 months</span>
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>
                    Free updates:{' '}
                    <span className='font-semibold'>36 months</span>
                  </span>
                </li>
              </ul>
              <button
                onClick={() => {
                  navigate(PATH.PRICING_INFO)
                  dispatch(setPrice(29))
                  dispatch(setDescriptionId(3))
                }}
                className='bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900'
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Boost your styles with DressUp Premium
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
              quasi iusto modi velit ut non voluptas in. Explicabo id ut
              laborum.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
            <div className='p-8 sm:p-10 lg:flex-auto'>
              <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
                Lifetime membership
              </h3>
              <p className='mt-6 text-base leading-7 text-gray-600'>
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
                amet indis perferendis blanditiis repellendus etur quidem
                assumenda.
              </p>
              <div className='mt-10 flex items-center gap-x-4'>
                <h4 className='flex-none text-sm font-semibold leading-6 text-[#ff993a]'>
                  What’s included
                </h4>
                <div className='h-px flex-auto bg-gray-100'></div>
              </div>
              <ul
                role='list'
                className='mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6'
              >
                <li className='flex gap-x-3'>
                  <svg
                    className='h-6 w-5 flex-none text-[#ff993a]'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Private forum access
                </li>
                <li className='flex gap-x-3'>
                  <svg
                    className='h-6 w-5 flex-none text-[#ff993a]'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Member resources
                </li>
                <li className='flex gap-x-3'>
                  <svg
                    className='h-6 w-5 flex-none text-[#ff993a]'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Entry to annual conference
                </li>
                <li className='flex gap-x-3'>
                  <svg
                    className='h-6 w-5 flex-none text-[#ff993a]'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                      clip-rule='evenodd'
                    />
                  </svg>
                  Official member t-shirt
                </li>
              </ul>
            </div>
            <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0'>
              <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16'>
                <div className='mx-auto max-w-xs px-8'>
                  <p className='text-base font-semibold text-gray-600'>
                    Pay once, own it forever
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                    <span className='text-5xl font-bold tracking-tight text-gray-900'>
                      $349
                    </span>
                    <span className='text-sm font-semibold leading-6 tracking-wide text-gray-600'>
                      USD
                    </span>
                  </p>
                  <a
                    href='#'
                    className='mt-10 block w-full rounded-md bg-[#ff993a] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#f9aa61] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9aa61] flex items-center justify-between'
                  >
                    Get access
                    <img src={MOMO} alt='momo' className='w-8 h-8' />
                  </a>
                  <p className='mt-6 text-xs leading-5 text-gray-600'>
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  )
}

export default PricingPage
