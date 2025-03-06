import express from "express";
import {
    httpGetHomePage,
    httpGetAllJobs,
    httpGetSingleJobDetails,
    httpCreateJob,
    httpEditJobDetails,
    httpDeleteJob,
    httpNotFoundPage,
    httpGetAllJobsPost,
    httpGetJobsStats,
} from "../controllers/jobControllers.js";
import { validateApplicationInputs, validateJobInput } from "../middleware/validationMiddleware.js";
import {validateIdParam} from '../middleware/validationMiddleware.js'
import { acceptJobApplication, httpApplyToJob, httpGetAcceptedApplications, httpGetApplicationsForUserJobs, httpGetJobApplications, pendingJobApplication, rejectJobApplication } from "../controllers/applicationControllers.js";
import upload from "../middleware/multerMiddleware.js";
import { httpGetSpecificJobApplicationsStats } from "../controllers/userControllers.js";

const jobRouter = express.Router();

// GET requests
jobRouter.get("/", httpGetAllJobsPost);
jobRouter.get("/all-jobs", httpGetAllJobs);
jobRouter.route('/stats').get(httpGetJobsStats)
jobRouter.get("/:id",validateIdParam, httpGetSingleJobDetails);

jobRouter.get("/:id/all-applications", httpGetJobApplications);
jobRouter.get('/:id/stats',httpGetSpecificJobApplicationsStats)
jobRouter.get("/:id/all-applications/shortlisted-candidates", httpGetAcceptedApplications);


jobRouter.patch("/:id/all-applications/accept", acceptJobApplication);
jobRouter.patch("/:id/all-applications/pending", pendingJobApplication);
jobRouter.patch("/:id/all-applications/reject", rejectJobApplication);

// POST requests
jobRouter.post("/", validateJobInput, httpCreateJob);

// Apply for a job with resume upload
jobRouter.post("/:id/apply",upload.single("resume"),httpApplyToJob );  //validateApplicationInputs

// PATCH requests
jobRouter.patch("/:id", validateJobInput, httpEditJobDetails);

// DELETE requests
jobRouter.delete("/:id",validateIdParam, httpDeleteJob);

//all applications for the recruiter
jobRouter.get('/all-applications-for-recruiter',httpGetApplicationsForUserJobs)

// Catch-all route
jobRouter.get("*", httpNotFoundPage);

export default jobRouter;
