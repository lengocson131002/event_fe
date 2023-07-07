import { notification } from 'antd'

export const NotificationCustom = (values) => {
  const { type, message, description } = values
  return notification[type]({
    message,
    description
  })
}
