import express from 'express'
import { httpCreateHireRequests, httpGetAllHireRequests, httpGetClientServicesRequest, httpUpdateHireRequestStatus } from '../controllers/hireRequests.js'

const hireRequestsRoutes = express.Router()

hireRequestsRoutes.post('/',httpCreateHireRequests)
hireRequestsRoutes.get('/get-hireFreelancer/',httpGetAllHireRequests)
hireRequestsRoutes.patch('/update-status',httpUpdateHireRequestStatus)
hireRequestsRoutes.get('/get-hireFreelancer/client',httpGetClientServicesRequest)

export default hireRequestsRoutes
