import Express from 'express';
import {httpGetAllJobsPost, httpGetSingleJobPostsDetails} from '../controllers/jobControllers.js'
const allJobsRouter = Express.Router()

allJobsRouter.get('/all-jobs',httpGetAllJobsPost)
allJobsRouter.get('/all-jobs/:id',httpGetSingleJobPostsDetails)

export default allJobsRouter;