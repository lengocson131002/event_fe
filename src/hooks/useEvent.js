import { useEffect, useState } from 'react'
import AxiosGet from '../config/axiosGet'

export const useEvents = (params) => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()
  const [error, setError] = useState()
  const fetchEvents = (params) => {
    setLoading(true)
    AxiosGet('/events', params)
      .then((res) => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEvents(params)
  }, [params])

  return { loading, events, error, fetchEvents }
}

export const useEventById = (id) => {
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState()
  const [error, setError] = useState()
  const fetchEvent = (id) => {
    setLoading(true)
    AxiosGet(`/events/${id}`)
      .then((res) => {
        setEvent(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEvent(id)
  }, [id])

  return { loading, event, error, fetchEvent }
}

export const useEventsHot = (params) => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()
  const [error, setError] = useState()
  const fetchEvents = (params) => {
    setLoading(true)
    AxiosGet('/events/hot', params)
      .then((res) => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEvents(params)
  }, [params])

  return { loading, events, error, fetchEvents }
}

export const useEventsUpComing = (params) => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState()
  const [error, setError] = useState()
  const fetchEvents = (params) => {
    setLoading(true)
    AxiosGet('/events/up-coming', params)
      .then((res) => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchEvents(params)
  }, [params])

  return { loading, events, error, fetchEvents }
}
