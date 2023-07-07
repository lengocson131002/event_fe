import fileIcon from '../assets/file.png'
import ai from '../assets/ai.png'

export const LOCAL_STORAGE_ITEMS = Object.freeze({
  ACCESS_TOKEN: 'accessToken'
})

export const PATH = Object.freeze({
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/home',
  EXPLORE: '/',
  ABOUT_US: '/about-us',
  CONTACT: '/contact',
  OUTFIT_DETAIL: '/outfit-detail/:id',
  OUTFIT_BUILDER: '/outfit-builder',
  MY_CLOSET: '/my-closet',
  DISCOVER: '/discover',
  NOT_FOUND: '*',
  ACTIVATE: '/users/activate',
  FORBIDDEN: '/forbidden',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/users/reset-password',
  PROFILE: '/profile',
  PRICING: '/pricing',
  PRICING_INFO: '/pricing/info',
  BLOG: '/blog',
  EVENT_DETAIL: '/event/:id',
  STUDENTS_MANAGEMENT: '/students-management',
  EVENT_MANAGERS_MANAGEMENT: '/event-manager-management',
  SEMESTER_MANAGEMENT: '/semesters-management',
  EVENTS_MANAGEMENT: '/events',
  EVENT_MANAGER_DETAIL: '/event-manager/:id',
  STUDENT_DETAIL: '/student/:id'
})

export const TIME_FORMAT = Object.freeze({
  DATE_MONTH_YEAR: 'DD/MM/YYYY',
  FULL_DATE_TIME: 'HH:mm DD/MM/YYYY'
})
