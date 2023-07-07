import React, { useEffect, useState } from 'react'
import HeaderDark from '../components/HeaderDark'
import OUTFIT_DETAIL from '../assets/outfitDetail.png'
import { Image, List, Rate, Avatar, Dropdown, Modal } from 'antd'
import { TbBrandShopee } from 'react-icons/tb'
import { BiMessageDetail, BiEnvelope } from 'react-icons/bi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FiLink2 } from 'react-icons/fi'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from 'react-icons/ai'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import AxiosPut from '../config/axiosPut'
import { NotificationCustom } from '../components/Notification'
import AxiosGet from '../config/axiosGet'
import Editor from '../components/Editor/Editor'
import AxiosDelete from '../config/axiosDelete'
import shopeeIcon from '../assets/shopee.png'
import tiktokIcon from '../assets/tiktokIcon.png'
import lazadaIcon from '../assets/lazada.png'

const { confirm } = Modal

const OutfitDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [reviews, setReviews] = useState([])
  const [reviewsMe, setReviewsMe] = useState()
  const [profile, setProfile] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [closet, setCloset] = useState([])

  const handleFetchProfile = () => {
    AxiosGet('users/me')
      .then((res) => setProfile(res.data))
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
      .then((res) =>
        setCloset([...res.data.publicProducts, ...res.data.ownedProducts])
      )
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const fetchDetail = () => {
    AxiosGet(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const fetchReviews = () => {
    AxiosGet(`/products/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const fetchReviewsMe = () => {
    AxiosGet(`/products/${id}/reviews/me`).then((res) => setReviewsMe(res.data))
  }

  const handleAddToCloset = () => {
    AxiosPut('/closets/me', {
      addedProductIds: [id]
    })
      .then(() => {
        fetchCloset()
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Add to closet successfully!'
        })
      })
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  useEffect(() => {
    fetchDetail()
    fetchReviews()
    handleFetchProfile()
    fetchReviewsMe()
    fetchCloset()
  }, [])

  const handleRating = (value, product) => {
    AxiosPut(`/products/${product?.id}/rating`, {
      score: value
    })
      .then(() => {
        fetchDetail()
        fetchReviews()
        fetchReviewsMe()
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Rating successfully!'
        })
      })
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  const handleDeleteReview = () => {
    confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this review?',
      onOk: () => {
        AxiosDelete(`/products/${id}/reviews/me`)
          .then(() => {
            NotificationCustom({
              type: 'success',
              message: 'Success',
              description: 'Delete review successfully!'
            })
            fetchReviews()
            fetchReviewsMe()
          })
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

      <div className='flex flex-col gap-4'>
        <div className='flex md:flex-row flex-col p-10 md:p-20 object-cover gap-12'>
          <div className='flex flex-col gap-3'>
            <Image
              src={product?.transparentBackgroundImage}
              className='object-contain xl:w-[420px]'
              style={{
                maxWidth: '420px',
                width: 'fit-content',
                objectFit: 'contain'
              }}
            />
            <div className='flex flex-wrap '>
              {product?.imageUrls?.map((image) => (
                <Image
                  src={image}
                  style={{
                    objectFit: 'contain',
                    width: '100px',
                    marginRight: '4px',
                    marginBottom: '4px'
                  }}
                  className='object-contain w-[100px] mr-1 mb-1'
                />
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-between md:gap-0 gap-3 items-center md:items-start'>
            <div>
              <h1 className='font-bold text-3xl'>{product?.name}</h1>
              <Rate
                allowHalf
                defaultValue={product?.myRatingScore}
                value={product?.myRatingScore}
                onChange={(value) => handleRating(value, product)}
              />
            </div>
            <p>{product?.description}</p>
            {/* <Select placeholder='Select Size' className='w-[200px]'>
              <Select.Option>S</Select.Option>
              <Select.Option>M</Select.Option>
              <Select.Option>L</Select.Option>
              <Select.Option>XL</Select.Option>
              <Select.Option>XXL</Select.Option>
              <Select.Option>XXXL</Select.Option>
            </Select> */}
            <button
              className={`text-white px-4 py-2 w-fit rounded-full text-sm bg-orange my-12 ${
                closet.some((item) => item?.id === product?.id) &&
                'cursor-not-allowed'
              }`}
              onClick={handleAddToCloset}
              disabled={closet.some((item) => item?.id === product?.id)}
            >
              ADD TO CLOSET
            </button>
            {product?.categories?.length > 0 && (
              <span className='font-semibold mb-2'>
                Categories:{' '}
                <span className='font-normal'>
                  {product?.categories?.join(', ')}
                </span>
              </span>
            )}
            {product?.pattern && (
              <span className='font-semibold mb-2'>
                Pattern: <span className='font-normal'>{product?.pattern}</span>
              </span>
            )}
            {product?.style && (
              <span className='font-semibold mb-2'>
                Styles: <span className='font-normal'>{product?.style}</span>
              </span>
            )}
            {product?.hashtags?.length && (
              <span className='font-semibold'>
                Hashtag:{' '}
                <span className='font-normal'>
                  {product?.hashtags?.join(', ')}
                </span>
              </span>
            )}

            <div className='flex items-center gap-2 mt-10'>
              <span className='p-1 rounded-full'>
                <a
                  href={product?.shopeeAffiliateUrl || product?.originalUrl}
                  target='_blank'
                >
                  <img alt='shopee' src={shopeeIcon} className='w-10 h-10' />
                </a>
              </span>

              <span className='p-1 rounded-full '>
                <img
                  alt='tiki'
                  src={tiktokIcon}
                  className='w-10 h-10 opacity-50'
                />
              </span>

              <span className='p-1 rounded-full'>
                <img
                  alt='lazada'
                  src={lazadaIcon}
                  className='w-10 h-10 opacity-50'
                />
              </span>
            </div>
          </div>
        </div>

        <div className='px-10 md:px-20 mb-12'>
          <ul className='hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex  dark:text-gray-400'>
            <li className='w-fit'>
              <a
                href='#'
                className='inline-block w-fit p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none  dark:text-gray-900'
                aria-current='page'
              >
                Reviews
              </a>
            </li>
            {/* <li className='w-fit'>
              <a
                href='#'
                className='inline-block w-fit p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-gray-900 '
              >
                Reviewss
              </a>
            </li> */}
          </ul>

          <div className='p-10 leading-8 border border-gray-300 max-h-[600px] overflow-scroll'>
            {!reviewsMe && (
              <Editor
                reviews={reviews}
                id={id}
                fetchReviews={fetchReviews}
                fetchReviewsMe={fetchReviewsMe}
              />
            )}
            <List
              className='comment-list'
              header={`${reviews.length} reviews`}
              itemLayout='horizontal'
              dataSource={reviews}
              renderItem={(item) => (
                <List.Item
                  actions={
                    item?.id === reviewsMe?.id && [
                      <AiOutlineEdit
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={() => setIsEdit(!isEdit)}
                      />,
                      <AiOutlineDelete
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={handleDeleteReview}
                      />
                    ]
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item?.author.avatarUrl} />}
                    title={
                      item?.author.firstName + item?.author.lastName ||
                      item?.author.email
                    }
                    description={
                      isEdit && item?.id === reviewsMe?.id ? (
                        <Editor
                          reviews={reviews}
                          id={id}
                          fetchReviews={fetchReviews}
                          fetchReviewsMe={fetchReviewsMe}
                          item={item}
                          setIsEdit={setIsEdit}
                        />
                      ) : (
                        <>
                          <Rate
                            allowHalf
                            defaultValue={item?.ratingScore}
                            value={item?.ratingScore}
                            disabled
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: item?.content }}
                          />
                        </>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OutfitDetailPage
