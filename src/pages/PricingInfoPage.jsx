import React from 'react'
import HeaderDark from '../components/HeaderDark'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import MOMO_QR from '../assets/momoQR.jpg'
import { Modal } from 'antd'
import AxiosPost from '../config/axiosPost'
import { NotificationCustom } from '../components/Notification'

const { confirm } = Modal

const PricingInfoPage = () => {
  const price = useSelector((state) => state.price?.price)
  const subscriptionId = useSelector((state) => state.price?.subscriptionId)

  const handleConfirm = () => {
    confirm({
      title: 'Confirm',
      content: (
        <>
          <div>
            Thank you for your payment! Our staff will check and your
            subscription will be applied if it's valid! If things don't go well,
            please contact us at:
          </div>
          <span className='text-blue-500'>
            dressup.customerservice@gmail.com
          </span>
        </>
      ),
      onOk: () => {
        AxiosPost('payments/request', {
          price,
          subscriptionId
        })
          .then(() =>
            NotificationCustom({
              type: 'success',
              message: 'Success',
              description: 'We have received you payment!'
            })
          )
          .catch((err) =>
            NotificationCustom({
              type: 'error',
              message: 'Error',
              description: err?.response?.data?.detail
            })
          )
      }
    })
  }

  return (
    <div>
      <HeaderDark />

      <div className='bg-white py-24 sm:py-32'>
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
                  <p className='text-sm text-orange'>
                    Make sure you send the exact amount!
                  </p>
                  <p className='mt-6 flex items-baseline justify-center gap-x-2 mb-3'>
                    <span className='text-5xl font-bold tracking-tight text-gray-900'>
                      ${price}
                    </span>
                    <span className='text-sm font-semibold leading-6 tracking-wide text-gray-600'>
                      USD
                    </span>
                  </p>
                  <img alt='qr' src={MOMO_QR} />
                  <button
                    onClick={handleConfirm}
                    className='mt-10 block w-full rounded-md bg-[#ff993a] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#f9aa61] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9aa61]'
                  >
                    Confirm Transaction
                  </button>
                  <p className='mt-6 text-xs leading-5 text-gray-600'>
                    Invoices and receipts available for easy company
                    reimbursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PricingInfoPage
