import Express from 'express'
import { httpGetApplicationStats, httpGetCurrentUser, httpUpdateUserDetails, httpUserChangePassword } from '../controllers/userControllers.js'
import { validateUpdateUserDetails, validateUserChangePassword } from '../middleware/validationMiddleware.js'
import { authenticateAdmin } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
const userRoutes = Express.Router()

// to get the current user
userRoutes.get('/current-user',httpGetCurrentUser)


// to get the application status (only for admin) authenticateAdmin is the middleware that allows only admin to access this route
userRoutes.get('/admin/app-status',[authenticateAdmin('admin'),httpGetApplicationStats])

// to patch the updates on the users details
userRoutes.patch('/update-user-details',upload.single('avatar'),validateUpdateUserDetails,httpUpdateUserDetails)

userRoutes.patch('/change-password',validateUserChangePassword,httpUserChangePassword)

export default userRoutes

