import express from 'express'
import { httpGetApplicationsForUserJobs, httpGetJobsResumesCount, httpGetRecruiterApplicationStats, httpGetRecruiterResumeStats } from '../controllers/applicationControllers.js'

const applicationRoutes = express.Router()

applicationRoutes.get('/all-users-applications',httpGetApplicationsForUserJobs)
applicationRoutes.get('/recruiter-applications-stats',httpGetRecruiterApplicationStats)
applicationRoutes.get('/recruiter-stats',httpGetRecruiterResumeStats)
applicationRoutes.get('/resumes-count',httpGetJobsResumesCount)

export default applicationRoutes