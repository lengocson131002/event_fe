import React, { useEffect, useState } from 'react'
import HeaderDark from '../components/HeaderDark'
import Footer from '../components/Footer'
import {
  Alert,
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Pagination,
  Select
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Product from '../components/Product'
import AxiosGet from '../config/axiosGet'
import { NotificationCustom } from '../components/Notification'
import DiscoverBanner from '../components/DiscorverBanner'
import { IoIosOptions } from 'react-icons/io'
import aiIcon from '../assets/ai.png'
import refreshIcon from '../assets/refresh.png'
import Lottie from 'lottie-react'
import aiAnimated from '../assets/ai-animated.json'

const { Search } = Input

const DiscoverPage = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [closet, setCloset] = useState([])
  const [filterOptions, setFilterOptions] = useState({})
  const [paging, setPaging] = useState({ size: 20, offset: 0 })
  const [categoriesSelect, setCategoriesSelect] = useState([])
  const [stylesSelect, setStylesSelect] = useState([])
  const [patternsSelect, setPatternsSelect] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [text, setText] = useState('')
  const [fullText, setFullText] = useState(
    'Our sophisticated artificial intelligence proffers fashion recommendations derived from garments you have meticulously uploaded onto your virtual wardrobe...'
  )
  const [index, setIndex] = useState(0)

  const fetchData = () => {
    const params = new URLSearchParams()
    params.append('offset', paging.offset)
    params.append('size', paging.size)
    searchKeyword && params.append('search_keyword', searchKeyword)
    categoriesSelect.length > 0 &&
      categoriesSelect.map((category) => params.append('categories', category))

    stylesSelect.length > 0 &&
      stylesSelect.map((style) => params.append('styles', style))

    patternsSelect.length > 0 &&
      patternsSelect.map((pattern) => params.append('patterns', pattern))

    AxiosGet('products', params)
      .then((res) => setData(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const fetchRecommend = (isPublic) => {
    AxiosGet('/products/recommendation', {
      include_public_products: isPublic
    }).then((res) => {
      setData(res.data)
      setOpenModal(false)
    })
  }

  const fetchFilterOptions = () => {
    AxiosGet('products/filter-options')
      .then((res) => setFilterOptions(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const fetchCloset = () => {
    AxiosGet('closets/me')
      .then((res) => setCloset(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  useEffect(() => {
    fetchFilterOptions()
    fetchCloset()
  }, [])

  useEffect(() => {
    fetchData()
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: 'smooth'
    })
  }, [paging, categoriesSelect, stylesSelect, patternsSelect])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData()
    }, 300)

    return () => {
      clearTimeout(timeOut)
    }
  }, [searchKeyword])

  const handlePaging = (page, pageSize) => {
    setPaging({
      offset: (page - 1) * pageSize,
      size: pageSize
    })
  }

  const onSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(() => {
    if (openModal && index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index])
        setIndex(index + 1)
      }, 20)
    }

    if (!openModal) {
      setIndex(0)
      setText('')
    }
  }, [index, openModal])

  return (
    <div className='w-full'>
      <Modal
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <Lottie animationData={aiAnimated} loop={true} />
        <div className='flex items-center justify-around mb-4'>
          <Button
            type='primary'
            onClick={() => {
              fetchRecommend(false)
            }}
          >
            Recommend without public
          </Button>
          <Button
            onClick={() => {
              fetchRecommend(true)
            }}
          >
            Recommend with public
          </Button>
        </div>
        {data?.products?.length === 0 && (
          <Alert
            message={`${"There's no products in discover, the result might be incorrect!"}`}
            type='warning'
          />
        )}

        {closet?.ownedProducts?.length === 0 && (
          <Alert
            message={`${"There's no products in your closet, the result might be incorrect!"}`}
            type='warning'
          />
        )}

        <div class='text-base font-medium mt-5 tracking-wider'>{text}</div>
      </Modal>

      <Drawer
        title='Filters'
        placement='left'
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout='vertical'>
          <Form.Item
            label='Categories'
            name='categories'
            className='min-w-[200px] font-medium'
          >
            <Select
              mode='multiple'
              maxTagCount={'responsive'}
              placeholder='Jeans'
              className='w-[200px]'
              onChange={(value) => setCategoriesSelect(value)}
            >
              {filterOptions?.categories?.map((item) => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Styles'
            name='styles'
            className='min-w-[200px] font-semibold'
          >
            <Select
              mode='multiple'
              maxTagCount={'responsive'}
              placeholder='Retro'
              className='w-[200px]'
              onChange={(value) => setStylesSelect(value)}
            >
              {filterOptions?.styles?.map((item) => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Patterns'
            name='patterns'
            className='min-w-[200px] font-semibold'
          >
            <Select
              mode='multiple'
              maxTagCount={'responsive'}
              placeholder='In'
              className='w-[200px]'
              onChange={(value) => setPatternsSelect(value)}
            >
              {filterOptions?.patterns?.map((item) => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>

      <HeaderDark />
      <DiscoverBanner />
      <div className='py-10 bg-white'>
        {/* <Form layout='horizontal' className='mt-8'> */}
        <div className='flex flex-wrap gap-4 px-10 md:px-24 mt-10 items-center'>
          <button
            className='px-4 py-2 rounded-md bg-[#f2f3f5] hover:bg-[#dcdfe2] flex items-center gap-3 transition-all duration-150'
            onClick={() => setOpenDrawer(true)}
          >
            <IoIosOptions />
            <span>All Filters</span>
          </button>
          <div
            className={`w-11 h-11 cursor-pointer rounded-4 border rounded-md hover:border-blue-400 duration-150`}
            // style={activeStyles}
            onClick={() => setOpenModal(true)}
          >
            <img src={aiIcon} alt={'aipicker'} className={'object-contain'} />
          </div>
          <div
            className={`w-11 h-11 p-1 cursor-pointer rounded-4 border rounded-md hover:border-blue-400  duration-150`}
            // style={activeStyles}
            onClick={() => fetchData()}
          >
            <img
              src={refreshIcon}
              alt={'aipicker'}
              className={'object-contain'}
            />
          </div>
          <Search
            placeholder='input search text'
            // onSearch={onSearch}
            onChange={onSearch}
            style={{ width: 200 }}
            size='large'
          />
        </div>
        {/* </Form> */}
      </div>

      <div className='w-full flex flex-col items-center gap-4 bg-white'>
        <div className='text-2xl  font-medium bg-black w-80 text-white py-2 text-center'>
          Discover NEW TREND
        </div>
        <span className='w-20 h-[3px] bg-black'></span>
        <div className='text-base font-light mb-12'>Recently added shirts</div>

        <div className='max-w-screen-xl mx-auto py-10 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10'>
          {data?.products?.map((item) => (
            <Product
              key={item?.id}
              product={item}
              handleClick={() => navigate(`/outfit-detail/${item?.id}`)}
            />
          ))}
        </div>

        {/* <button className='text-white px-4 py-2 text-base bg-orange my-12'>
          <Link to={PATH.DISCOVER} onClick={handlePaging}>
            FIND OUT MORE
          </Link>
        </button> */}

        <div className='mt-4 mb-6'>
          <Pagination
            defaultCurrent={1}
            total={data.totalRows}
            showSizeChanger={false}
            onChange={handlePaging}
            pageSize={20}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DiscoverPage
