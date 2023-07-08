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
  NOT_FOUND: '*',
  ACTIVATE: '/users/activate',
  FORBIDDEN: '/forbidden',
  FORGET_PASSWORD: '/forget-password',
  RESET_PASSWORD: '/users/reset-password',
  PROFILE: '/profile',
  EVENT_DETAIL: '/event/:id',
  EVENT_DETAIL_CHECK_IN: '/event/:id/check-in',
  EVENT_DETAIL_CHECK_OUT: '/event/:id/check-out',
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
