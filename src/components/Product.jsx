import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constants/common'

const Product = ({ product, handleClick }) => {
  const navigate = useNavigate()

  return (
    <div className='group' onClick={handleClick}>
      <div className='w-full h-96 cursor-pointer overflow-hidden'>
        <img
          src={product?.transparentBackgroundImage || product?.image || product?.imageUrls[0]}
          alt='productImg'
          className='w-full h-full object-cover group-hover:scale-110 duration-500'
        />
      </div>

      <div className='w-full border-[1px] px-2 py-4'>
        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-base'>
              {product?.title?.substring(0, 15) ||
                product?.name?.substring(0, 15)}
            </h2>
          </div>

          <div className='flex gap-2 relative overflow-hidden w-28 text-sm'>
            <div className='text-sm relative w-28 flex gap-2 justify-end'></div>
            <p
              className='absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500'
              onClick={() =>
                navigate(`/outfit-detail/${product?._id || product?.id}`)
              }
            >
              View Details{' '}
              <span>
                <BsArrowRight />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
