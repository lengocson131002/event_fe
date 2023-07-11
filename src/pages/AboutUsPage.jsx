import React from 'react'
import PEOPLE1 from '../assets/people1.png'
import PEOPLE from '../assets/people.png'
import FOUNDER1 from '../assets/founder1.png'
import FOUNDER2 from '../assets/founder2.png'
import FOUNDER3 from '../assets/founder3.png'
import FOUNDER4 from '../assets/founder4.png'
import TESTIMONIALS1 from '../assets/testimonials1.png'
import TESTIMONIALS2 from '../assets/testimonials2.png'
import QUOTE from '../assets/quote.png'

const AboutUsPage = () => {
  return (
    <div className='w-full'>
      {/* <HeaderDark /> */}
      <div className='w-full m-auto text-white relative'>
        <img
          src={
            'https://swp-event.s3.ap-southeast-1.amazonaws.com/1688894831560335599212_228776362854670_6254377344589252239_n.jpg'
          }
          className='w-full h-[300px] object-cover'
        />
        <span className='absolute top-1/2 -translate-y-1/2 left-24 text-2xl font-bold'>
          ABOUT EVENTSE
        </span>
      </div>

      <div className='w-full flex flex-col items-center'>
        <div className='p-8 md:p-20 flex items-center gap-5 md:flex-row flex-col w-full justify-around'>
          <div className='relative'>
            <img
              src={require('../assets/VuHoang.jpg')}
              alt=''
              className='w-[350px] h-[350px] object-cover'
            />
            {/* <button className='text-white px-8 py-2 text-base border border-orange shadow-md bg-orange hover:opacity-90 my-12 absolute bottom-0 left-1/2 -translate-x-1/2 duration-300'>
              SAVE
            </button> */}
          </div>
          <div className='relative'>
            <img
              src={require('../assets/HoangHuy.jpg')}
              alt=''
              className='w-[350px] h-[350px] object-cover'
            />
            {/* <button className='text-white px-8 py-2 text-base border border-orange shadow-md bg-orange hover:opacity-90 my-12 absolute bottom-0 left-1/2 -translate-x-1/2 duration-300'>
              SAVE
            </button> */}
          </div>
        </div>

        <div className='text-2xl mb-12 font-medium'>The Founders</div>

        <div className='flex flex-wrap items-center justify-between w-full'>
          <div className='flex flex-col items-center justify-start w-full sm:w-1/2 md:w-1/5'>
            <img
              src={require('../assets/VuHoang.jpg')}
              alt=''
              className='object-cover h-[265px]'
            />
            <span className='font-semibold my-3'>Vu Hoang</span>
          </div>
          <div className='flex flex-col items-center justify-start w-full sm:w-1/2 md:w-1/5'>
            <img
              src={require('../assets/HoangHuy.jpg')}
              alt=''
              className='object-cover h-[265px]'
            />
            <span className='font-semibold my-3'>Hoang Huy</span>
          </div>
          <div className='flex flex-col items-center justify-start w-full sm:w-1/2 md:w-1/5'>
            <img
              src={require('../assets/GiaHuy.jpg')}
              alt=''
              className='object-cover h-[265px]'
            />
            <span className='font-semibold my-3'>Gia Huy</span>
          </div>
          <div className='flex flex-col items-center justify-start w-full sm:w-1/2 md:w-1/5'>
            <img
              src={require('../assets/MaiTrung.jpg')}
              alt=''
              className='object-cover h-[265px]'
            />
            <span className='font-semibold my-3'>Mai Trung</span>
          </div>
          <div className='flex flex-col items-center justify-start w-full sm:w-1/2 md:w-1/5'>
            <img
              src={require('../assets/QuangVinh.jpg')}
              alt=''
              className='object-cover h-[265px]'
            />
            <span className='font-semibold my-3'>Quang Vinh</span>
          </div>
        </div>

        <div className='text-2xl my-12 font-medium'>The Founders</div>
        <div className='flex flex-col gap-16 w-2/3 h-full mb-12'>
          <div className='flex  md:flex-row flex-col gap-12 items-center'>
            <img
              src={require('../assets/QuangVinh.jpg')}
              className='w-[150px]'
            />
            <div className='h-full'>
              <img src={QUOTE} className='h-[50px] w-[50px]' />
              <p>
                EventSE is a convenient website to find all interesting events
                inside FPTU HCMC.
              </p>
              <span className='font-bold'>Quang Vinh</span>
            </div>
          </div>
          <div className='flex md:flex-row flex-col gap-12 items-center'>
            <img
              src={require('../assets/MaiTrung.jpg')}
              className='w-[150px]'
            />
            <div>
              <img src={QUOTE} className='h-[50px] w-[50px]' />
              <p>It's really easy to find, filter and register to an event!</p>
              <span className='font-bold'>Tiffany</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
