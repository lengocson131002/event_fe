import React, { useState } from 'react'
import POSTER2 from '../assets/DRESSUPposter-02.jpg'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

const DiscoverBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const data = [POSTER2]

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1)
  }

  return (
    <div className='w-full h-auto overflow-hidden sticky md:top-[130px] xl:top-[72px] -z-10'>
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
            className='w-screen h-full object-cover'
            src={data[1]}
            alt='img2'
          />
          <img
            className='w-screen h-full object-cover'
            src={data[2]}
            alt='img3'
          />
          <img
            className='w-screen h-full object-cover'
            src={data[3]}
            alt='img4'
          />
        </div>
      </div>
    </div>
  )
}

export default DiscoverBanner
