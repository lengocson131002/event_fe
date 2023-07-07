import { Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomReactQuillComment } from './Editor.style'
import { LoadingOutlined } from '@ant-design/icons'
import { IoIosSend } from 'react-icons/io'
import AxiosPost from '../../config/axiosPost'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { NotificationCustom } from '../Notification'
import AxiosPut from '../../config/axiosPut'

const Editor = ({
  reviews,
  id,
  fetchReviews,
  fetchReviewsMe,
  item,
  setIsEdit
}) => {
  Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
  let Image = Quill.import('formats/image')
  Image.className = 'custom-class-to-image'
  Quill.register(Image, true)

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleImageComment = (value) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.onchange = () => {
      const file = input?.files[0]

      console.log(file)

      const data = new FormData()
      data.set('file', file)

      // const uploadImage = async () => {
      //   const res = await axios.post(
      //     `${process.env.REACT_APP_UPLOAD_FILE}Png`,
      //     data
      //   )
      //   const range = editorComment.current.getEditor().getSelection()
      //   // editorComment.current.getEditor().focus()
      //   editorComment.current
      //     .getEditor()
      //     .insertEmbed(
      //       range ? range.index : 0,
      //       'image',
      //       `${process.env.REACT_APP_LINK_IMAGE}${
      //         res.data.split('\\')[res.data.split('\\').length - 1]
      //       }`
      //     )
      //   editorComment.current
      //     .getEditor()
      //     .setSelection((range ? range.index : 0) + 1)
      // }

      // uploadImage()
    }
  }

  const imageHandlerComment = (imageDataUrl, type, imageData) => {
    const blob = imageData.toBlob()
    const file = imageData.toFile()

    const data = new FormData()

    data.append('file', blob)

    data.append('file', file)

    console.log(file)

    // const uploadImage = async () => {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_UPLOAD_FILE}Png`,
    //     data
    //   )

    //   const range = editorComment.current.getEditor().getSelection()
    //   // editorComment.current.getEditor().focus()
    //   editorComment.current
    //     .getEditor()
    //     .insertEmbed(
    //       range ? range.index : 0,
    //       'image',
    //       `${process.env.REACT_APP_LINK_IMAGE}${
    //         res.data.split('\\')[res.data.split('\\').length - 1]
    //       }`
    //     )
    //   editorComment.current
    //     .getEditor()
    //     .setSelection((range ? range.index : 0) + 1)
    // }

    // uploadImage()
  }

  const handleSubmitComment = (e, field) => {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
    } else if (e.key === 'Enter') {
      const contentValue = form.getFieldValue(field)
      // const submitValue = contentValue.substr(0, contentValue.length - 11)
      form.setFieldValue(field, contentValue)
      if (contentValue !== '<p><br></p>') {
        form.submit()
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            {
              header: [1, 2, 3, 4, 5, 6, false]
            }
          ],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean', { color: [] }]
        ],
        handlers: {
          image: handleImageComment
        }
      },
      imageDropAndPaste: {
        // add an custom image handler
        handler: imageHandlerComment
      }
    }),
    [reviews]
  )

  const onFinish = (values) => {
    if (item) {
      AxiosPut(`/products/${id}/reviews/me`, values)
        .then(() => {
          fetchReviews()
          fetchReviewsMe()
          form.resetFields()
          setIsEdit(false)
        })
        .catch((err) =>
          NotificationCustom({
            type: 'error',
            message: 'Error',
            description: err?.response?.data?.detail
          })
        )
    } else {
      AxiosPost(`/products/${id}/reviews`, values).then(() => {
        fetchReviews()
        fetchReviewsMe()
        form.resetFields()
      })
    }
  }

  useEffect(() => {
    item && form.setFieldValue('content', item?.content)
  }, [item])

  return (
    <Form form={form} onFinish={(values) => onFinish(values)}>
      <Form.Item
        name={'content'}
        required
        initialValue={null}
        style={{ width: '100%', margin: 0 }}
      >
        <CustomReactQuillComment
          // modules={modules}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'list',
            'indent',
            'link',
            'color',
            'image',
            'mention'
          ]}
          onKeyDown={(e) => {
            handleSubmitComment(e, 'content')
          }}
          placeholder='Enter your review...'
        />
      </Form.Item>
    </Form>
  )
}

export default Editor
