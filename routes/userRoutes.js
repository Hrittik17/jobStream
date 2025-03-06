import Express from 'express'
import { httpGetApplicationStats, httpGetCurrentUser, httpGetUserMonthlyApplications, httpUpdateUserDetails, httpUserChangePassword } from '../controllers/userControllers.js'
import { validateUpdateUserDetails, validateUserChangePassword } from '../middleware/validationMiddleware.js'
import { authenticateAdmin } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
import { httpGetUserApplications, httpGetUserApplicationsStats } from '../controllers/applicationControllers.js'
const userRoutes = Express.Router()

// to get the current user
userRoutes.get('/current-user',httpGetCurrentUser)

// for who many jobs users has applied for 
userRoutes.get('/my-applications',httpGetUserApplications)
 
// stats for who many jobs users has applied for
userRoutes.get('/my-applications/stats',httpGetUserApplicationsStats)

userRoutes.get('/my-applications/montly-applications',httpGetUserMonthlyApplications)


// to get the application status (only for admin) authenticateAdmin is the middleware that allows only admin to access this route
userRoutes.get('/admin/app-status',[authenticateAdmin('admin'),httpGetApplicationStats])

// to patch the updates on the users details
userRoutes.patch('/update-user-details',upload.single('avatar'),validateUpdateUserDetails,httpUpdateUserDetails)

userRoutes.patch('/change-password',validateUserChangePassword,httpUserChangePassword)

export default userRoutes

