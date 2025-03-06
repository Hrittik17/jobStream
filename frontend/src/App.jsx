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
const PostServices = lazy(()=> import('./pages/postServices'))
const ServicesLayout = lazy(()=> import('./features/freelancing/servicesLayout'))
const AnalysisService = lazy(()=>import('./features/freelancing/analysisService'))
const Loader = lazy(() => import('./ui/loader'))
const PageNotFound = lazy(()=> import('./pages/pageNotFound'))
const Subscriptions = lazy(()=> import('./pages/subscription'))
const AdminPage = lazy(()=> import('./pages/admin'))
const Profile = lazy(()=> import('./pages/profile'))
const Leaderboard = lazy(()=>import('./pages/leaderboard'))
const UserRegister = lazy(()=> import('./features/authentication/userRegister'))
const JobDetails = lazy(()=> import('./features/allJobs/jobDetails'))
const MyJobs = lazy(()=> import('./features/editJobs/myJobs'))
const EditJobs = lazy(()=> import('./features/editJobs/editJobs'))
const AllJobApplications = lazy(()=> import('./features/jobApplications/allJobApplications'))
const UserApplications = lazy(()=> import('./features/userApplications/userApplications'))
const ShortListedCandidates = lazy(()=> import('./features/userApplications/shortlistedCandidates'))
const ChangePassword = lazy(()=> import('./features/profile/changePassword'))
const ForgetPassword = lazy(()=> import('./ui/forgetPassword'))
const AllUserServices = lazy(()=>import('./features/user-services/allUserServices'))
const EditUserServices = lazy(()=>import("./features/user-services/editUserServices"))
const News = lazy(()=>import("./pages/news"))
const MySubscription = lazy(()=>import("./features/user-subscription/mySubscription"))
const IssueRaise = lazy(()=>import('./features/issueRaise/issueRaise'))
const ContactUs = lazy(()=> import('./features/contactUs/contactUs'))
const Issues = lazy(()=> import('./features/issueRaise/issues'))
const AllJobsResumes = lazy(()=> import('./features/allresumes/allJobsResumes'))
const ClientHireRequests = lazy(()=>import('./features/allServicesRequests/allServicesRequests'))


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
            <Route path="issues" element={<Issues />} />
            <Route path="postServices" element={<PostServices/>} />
            <Route path="postServices/all-services" element={<ServicesLayout/>} />
            <Route path="my-services" element={<AllUserServices/>} />
            <Route path="my-services/:id" element={<EditUserServices/>} />
            <Route path="all-services" element={<ServicesLayout/>} />
            <Route path="all-services/:id" element={<AnalysisService/>} />

            <Route path="profile" element={<Profile />} />
            <Route path="profile/change-password" element={<ChangePassword />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="my-jobs/:id" element={<EditJobs />} />
            <Route path="my-jobs/:id/all-applications" element={<UserApplications />} />
            <Route path="my-jobs/:id/all-applications/shortlisted-candidates" element={<ShortListedCandidates/>} />
            <Route path="my-applications" element={<AllJobApplications />} />
            <Route path="my-subscription" element={<MySubscription />} />
            <Route path="all-resumes" element={<AllJobsResumes />} />
            <Route path="my-requests" element={<ClientHireRequests />} />

            
            <Route path="raise-issue" element={<IssueRaise />} />
            <Route path="contact-us" element={<ContactUs />} />


            <Route path="leaderboard" element={<Leaderboard/>} />
            <Route path="news" element={<News/>} />
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

