import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Tabs,
  Tag,
  Upload,
  message
} from 'antd'
import React, { useEffect, useState } from 'react'
import HeaderDark from '../components/HeaderDark'
import Footer from '../components/Footer'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import AxiosGet from '../config/axiosGet'
import { NotificationCustom } from '../components/Notification'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constants/common'
import AxiosPut from '../config/axiosPut'
import outfitIcon from '../assets/logo-tshirt.png'
import AxiosPost from '../config/axiosPost'
import axios from 'axios'

const { confirm } = Modal

const UploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)

const MyClosetPage = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const navigate = useNavigate()

  const fetchCloset = () => {
    AxiosGet('closets/me')
      .then((res) => setData(res.data))
      .catch((err) =>
        NotificationCustom({
          type: 'error',
          message: 'Error',
          description: err?.response?.data?.detail
        })
      )
  }

  useEffect(() => {
    fetchCloset()
  }, [])

  const handleRemoveCloset = (item) => {
    confirm({
      title: 'Confirm',
      content: 'Are you sure you want to remove this outfit?',
      onOk: () => {
        AxiosPut('/closets/me', {
          removedProductIds: [item.id]
        })
          .then(() => {
            NotificationCustom({
              type: 'success',
              message: 'Success',
              description: 'Remove out of closet successfully!'
            })
            fetchCloset()
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

  const columns = [
    {
      title: '',
      dataIndex: 'transparentBackgroundImage',
      key: 'transparentBackgroundImage',
      align: 'transparentBackgroundImage',
      render: (transparentBackgroundImage, record) => (
        <Image
          src={transparentBackgroundImage || record.imageUrls[0]}
          width={150}
        />
      )
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Categories',
      key: 'categories',
      dataIndex: 'categories',
      render: (categories) => categories.join(', ')
    },
    {
      title: 'Pattern',
      key: 'pattern',
      dataIndex: 'pattern'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, item) => (
        <Space size='middle'>
          <Button onClick={() => navigate(`/outfit-detail/${item?.id}`)}>
            View Details
          </Button>

          <Button
            danger
            className='flex items-center'
            onClick={() => handleRemoveCloset(item)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ]

  const onChangeUploadFile = (info) => {
    setFileList(info.fileList)
  }

  const handleUploadFile = async (options) => {
    const { onSuccess, onError, file, onProgress } = options
    try {
      let res = await AxiosPost('auth/presigned-urls/post', {
        object_name: file.name
      })
      const formData = new FormData()
      Object.entries(res.data.fields).forEach(([key, value]) => {
        formData.append(key, value)
      })
      formData.append('file', file)

      res = await axios.postForm(res.data.url, formData)

      if (res) {
        message.success(`${file.name} file uploaded successfully`)
      } else {
        message.error(`${file.name} file upload failed.`)
      }

      onSuccess('Ok')
      console.log('server res: ', res)
    } catch (error) {
      console.log('Eroor: ', error)
      onError({ error })
    }
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }

  const onFinish = (values) => {
    AxiosPost('/products', {
      ...values,
      imageUrls: fileList.map(
        (item) => process.env.REACT_APP_IMAGE_URI + item?.name
      )
    })
      .then(() => {
        form.resetFields()
        setFileList([])
        setOpenDrawer(false)
        fetchCloset()
        NotificationCustom({
          type: 'success',
          message: 'Success',
          description: 'Save outfit to your closet successfully!'
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

  return (
    <div>
      <HeaderDark />

      <div className='p-12'>
        <div style={{ marginBottom: 24, display: 'flex', gap: '10px' }}>
          <button
            className='text-white px-4 py-2 w-fit rounded-md text-sm bg-orange'
            onClick={() => navigate(PATH.OUTFIT_BUILDER)}
          >
            TRY MIX&MATCH
          </button>
          <div
            key='filepicker'
            className={`w-11 h-11 cursor-pointer rounded-4 border rounded-md hover:border-blue-400 duration-150`}
            // style={activeStyles}
            onClick={() => setOpenDrawer(true)}
          >
            <img
              src={outfitIcon}
              alt={'filepicker'}
              className={'object-contain'}
            />
          </div>
        </div>
        <Tabs
          type='card'
          items={[
            {
              label: 'Public Products',
              key: 'public',
              children: (
                <Table
                  columns={columns}
                  dataSource={data.publicProducts}
                  scroll={{ x: 1200 }}
                />
              )
            },
            {
              label: 'Owned Products',
              key: 'pwned',
              children: (
                <Table
                  columns={columns}
                  dataSource={data.ownedProducts}
                  scroll={{ x: 1200 }}
                />
              )
            }
          ]}
        />
      </div>

      <Drawer
        title='Upload Outfit'
        placement='right'
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={
          window.innerWidth <= 1024 ? window.innerWidth : window.innerWidth / 2
        }
      >
        <Form layout='vertical' form={form} name='outfit' onFinish={onFinish}>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please enter outfit's name."
              }
            ]}
            requiredMark
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <Input.TextArea rows={5} size='large' />
          </Form.Item>

          <Form.Item label='Images'>
            <Upload
              name='file'
              accept='image/*'
              onChange={onChangeUploadFile}
              customRequest={handleUploadFile}
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              multiple={true}
            >
              {UploadButton}
            </Upload>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt='preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>

          <Button
            type='primary'
            className='float-right'
            form='outfit'
            htmlType='submit'
          >
            Save To Closet
          </Button>
        </Form>
      </Drawer>

      <Footer />
    </div>
  )
}

export default MyClosetPage
