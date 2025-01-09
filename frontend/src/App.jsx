import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const ProtectedRoutes = lazy(()=> import('./ui/protectedRoutes'))
const AppLayout = lazy(()=> import('./ui/appLayout'))
const Home = lazy(()=> import('./pages/home'))
const Login = lazy(()=> import('./pages/login'))
const Stats = lazy(() => import('./pages/stats'))
const DashBoard = lazy(() => import('./pages/dashBoard'))
const AddJobs = lazy(() => import('./pages/addJobs'))
const FindJobs = lazy(() => import('./pages/findJobs'))
const Loader = lazy(() => import('./ui/loader'))
const PageNotFound = lazy(()=> import('./pages/pageNotFound'))
const Subscriptions = lazy(()=> import('./pages/subscription'))
const AdminPage = lazy(()=> import('./pages/admin'))
const Profile = lazy(()=> import('./pages/profile'))
const UserRegister = lazy(()=> import('./features/authentication/userRegister'))
const JobDetails = lazy(()=> import('./features/allJobs/jobDetails'))
const MyJobs = lazy(()=> import('./features/editJobs/myJobs'))
const EditJobs = lazy(()=> import('./features/editJobs/editJobs'))
const ChangePassword = lazy(()=> import('./features/profile/changePassword'))
const ForgetPassword = lazy(()=> import('./ui/forgetPassword'))


export default function App() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to='home' />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="addJobs" element={<AddJobs />} />
            <Route path="stats" element={<Stats />} />
            <Route path="findJobs" element={<FindJobs />} />
            <Route path="findJobs/:id" element={<JobDetails />} />
            <Route path="subscription" element={<Subscriptions />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/change-password" element={<ChangePassword />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="my-jobs/:id" element={<EditJobs />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<UserRegister />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

