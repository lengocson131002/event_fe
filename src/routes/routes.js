import { PATH } from '../constants/common'
import { ROLE } from '../constants/role'
import AboutUsPage from '../pages/AboutUsPage'
import EventDetailPage from '../pages/EventDetailPage'
import ContactPage from '../pages/ContactPage'
import EventManagersManagementPage from '../pages/EventManagersManagementPage'
import EventsManagementPage from '../pages/EventsManagementPage'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import SemestersManagementPage from '../pages/SemestersManagementPage'
import SignUpPage from '../pages/SignUpPage'
import StudentsManagementPage from '../pages/StudentsManagementPage'
import StudentDetailPage from '../pages/StudentDetailPage'
import EventManagerDetailPage from '../pages/EventManagerDetailPage'
import EventCheckInPage from '../pages/EventCheckInPage'
import EventCheckOutPage from '../pages/EventCheckOutPage'
import NotFoundPage from '../pages/NotFoundPage'

export const routes = [
  {
    path: PATH.EXPLORE,
    element: <LandingPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    title: 'HOME',
    path: PATH.HOME,
    element: <HomePage />,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    path: PATH.SIGNUP,
    element: <SignUpPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    title: 'ABOUT US',
    path: PATH.ABOUT_US,
    element: <AboutUsPage />,
    allowed: [ROLE.STUDENT]
  },
  {
    title: 'CONTACT',
    path: PATH.CONTACT,
    element: <ContactPage />,
    allowed: [ROLE.STUDENT]
  },
  {
    path: PATH.PROFILE,
    element: <ProfilePage />,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    path: PATH.EVENT_DETAIL,
    element: <EventDetailPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    path: PATH.EVENT_DETAIL_CHECK_IN,
    element: <EventCheckInPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    path: PATH.EVENT_DETAIL_CHECK_OUT,
    element: <EventCheckOutPage />,
    isPublic: true,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    title: 'STUDENTS',
    path: PATH.STUDENTS_MANAGEMENT,
    element: <StudentsManagementPage />,
    allowed: [ROLE.ADMIN]
  },
  {
    title: 'EVENT MANAGERS',
    path: PATH.EVENT_MANAGERS_MANAGEMENT,
    element: <EventManagersManagementPage />,
    allowed: [ROLE.ADMIN]
  },
  {
    title: 'EVENTS',
    path: PATH.EVENTS_MANAGEMENT,
    element: <EventsManagementPage />,
    allowed: [ROLE.EVENT_MANAGER, ROLE.ADMIN]
  },
  {
    path: PATH.EVENT_MANAGER_DETAIL,
    element: <EventManagerDetailPage />,
    allowed: [ROLE.ADMIN]
  },
  {
    path: PATH.STUDENT_DETAIL,
    element: <StudentDetailPage />,
    allowed: [ROLE.ADMIN, ROLE.EVENT_MANAGER]
  },
  {
    title: 'SEMESTERS',
    path: PATH.SEMESTER_MANAGEMENT,
    element: <SemestersManagementPage />,
    allowed: [ROLE.ADMIN]
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFoundPage />,
    allowed: [ROLE.STUDENT, ROLE.ADMIN, ROLE.EVENT_MANAGER]
  }
]
