import { PATH } from '../constants/common'
import { ROLE } from '../constants/role'
import AboutUsPage from '../pages/AboutUsPage'
import ActivatePage from '../pages/ActivatePage'
import EventDetailPage from '../pages/EventDetailPage'
import BlogPage from '../pages/BlogPage'
import ContactPage from '../pages/ContactPage'
import DiscoverPage from '../pages/DiscoverPage'
import EventManagersManagementPage from '../pages/EventManagersManagementPage'
import EventsManagementPage from '../pages/EventsManagementPage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import OutfitBuilderPage from '../pages/OutfitBuilderPage'
import OutfitDetailPage from '../pages/OutfitDetailPage'
import ProfilePage from '../pages/ProfilePage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import SemestersManagementPage from '../pages/SemestersManagementPage'
import SignUpPage from '../pages/SignUpPage'
import StudentsManagementPage from '../pages/StudentsManagementPage'
import StudentDetailPage from '../pages/StudentDetailPage'
import EventManagerDetailPage from '../pages/EventManagerDetailPage'

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
    isPublic: true
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
    isPublic: true
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
    isPublic: true
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
    element: <ProfilePage />
  },
  {
    path: PATH.EVENT_DETAIL,
    element: <EventDetailPage />,
    isPublic: true
  },
  { path: PATH.ACTIVATE, element: <ActivatePage /> },
  {
    path: PATH.FORGET_PASSWORD,
    element: <ForgetPasswordPage />,
    isPublic: true
  },
  {
    path: PATH.RESET_PASSWORD,
    element: <ResetPasswordPage />,
    isPublic: true
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
    title: 'EVENT MANAGER',
    path: PATH.EVENT_MANAGER_DETAIL,
    element: <EventManagerDetailPage />
  },
  {
    title: 'STUDENT',
    path: PATH.STUDENT_DETAIL,
    element: <StudentDetailPage />
  },
  {
    title: 'SEMESTERS',
    path: PATH.SEMESTER_MANAGEMENT,
    element: <SemestersManagementPage />,
    allowed: [ROLE.ADMIN]
  }
]
