import React, { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import POSTER1 from '../assets/DRESSUPposter-01.png'
import POSTER3 from '../assets/DRESSUPposter-03.jpeg'
import POSTER4 from '../assets/DRESSUPposter-04.jpg'
import POSTER5 from '../assets/DRESSUPposter-05.jpeg'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const data = [
    'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/315836189_5819513801420666_8844126337200792987_n.jpg?_nc_cat=109&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=DCK-T76rxcUAX-vf-Yb&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfDbnqY0N_E5xH7HbOHNn-lGXIb4uL4o9vOm_qdFzN_CAQ&oe=64AAB067',
    'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/275852637_5110167279021992_4702757106072420139_n.jpg?_nc_cat=104&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=OYBBm-qVONkAX-8Kv3T&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfBjYgTacnqbiah57ijMyjw1anjWYJAx6z4Lv5-tSf5RwA&oe=64AAB546',
    'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/273733237_5019553998083321_9047822980870471450_n.jpg?_nc_cat=107&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=A4WK9F53SfoAX-oY96j&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfADx_9yW42Qww2sp6J_96Dje4pGOXLPlrGTtp_io27JWg&oe=64A93192',
    'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/259086047_4711743872197670_6614253785920679731_n.jpg?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=e3f864&_nc_ohc=FrENhBTs8yMAX-hSUF4&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCaMvovjdygaQovIzXGokE1THoanz88s8sBvkh71uaUAA&oe=64A9FFF6'
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
