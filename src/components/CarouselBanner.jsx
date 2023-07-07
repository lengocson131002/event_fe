import { Carousel } from 'antd'
import React from 'react'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

const CarouselBanner = () => {
  return (
    <Carousel autoplay className='md:max-w-[80vw] max-w-[100vw] mb-8'>
      <img
        src='https://hcmuni.fpt.edu.vn/Data/Sites/1/media/z2021/mellocee/%C4%91hfpthcm_nmmtblt_01.jpg'
        alt='top'
        className='object-contain h-96'
      />
      <img
        src='https://hcmuni.fpt.edu.vn/Data/Sites/1/media/zz2020file/halloween/halloween---hi%CC%80nh-1-(1).jpg'
        alt='top'
        className='object-contain  h-96'
      />
      <img
        src='https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/trich-dan/40-alumni-club/alumni-club-(3).jpg'
        alt='top'
        className='object-contain  h-96'
      />
      {/* <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div> */}
    </Carousel>
  )
}

export default CarouselBanner
