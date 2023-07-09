import React, { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const data = [
    'https://swp-event.s3.ap-southeast-1.amazonaws.com/1688894419693315836189_5819513801420666_8844126337200792987_n.jpg',
    'https://swp-event.s3.ap-southeast-1.amazonaws.com/1688894443207275852637_5110167279021992_4702757106072420139_n.jpg',
    'https://swp-event.s3.ap-southeast-1.amazonaws.com/1688894460324273733237_5019553998083321_9047822980870471450_n.jpg',
    'https://swp-event.s3.ap-southeast-1.amazonaws.com/1688894472913259086047_4711743872197670_6614253785920679731_n.jpg'
  ]

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1)
  }

  return (
    <div className='w-full h-auto overflow-hidden'>
      <div className='w-screen h-screen relative'>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className='w-[400vw] h-full flex transition-transform duration-1000'
        >
          <img
            className='w-screen h-full object-cover'
            src={data[0]}
            alt='img1'
          />
          <img
            className='w-screen h-full object-fill'
            src={data[1]}
            alt='img2'
          />
          <img
            className='w-screen h-full object-fill'
            src={data[2]}
            alt='img3'
          />
          <img
            className='w-screen h-full object-fill'
            src={data[3]}
            alt='img4'
          />
        </div>

        {/* <div className='absolute w-fit left-0 right-0 mx-auto flex justify-between gap-8 bottom-1/2'> */}
        <div
          onClick={prevSlide}
          className='absolute bottom-1/2 left-6 w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300'
        >
          <HiArrowLeft />
        </div>
        <div
          onClick={nextSlide}
          className='absolute bottom-1/2 right-8 w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300'
        >
          <HiArrowRight />
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Banner
