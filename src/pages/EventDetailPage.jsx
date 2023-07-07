import React from 'react'
import { useParams } from 'react-router-dom'
import { useEventById } from '../hooks/useEvent'
import Post from '../features/Post'
import { Spin } from 'antd'

const EventDetailPage = () => {
  const { id } = useParams()

  const { event, loading, fetchEvent } = useEventById(id)
  return (
    <Spin spinning={loading}>
      <div class='flex justify-between px-4 mx-auto max-w-screen-xl'>
        {/* <article class='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue'> */}
        <main class='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white'>
          <Post event={event} fetchEvent={fetchEvent} id={id} />
        </main>
        {/* </article> */}
      </div>
    </Spin>
  )
}

export default EventDetailPage
