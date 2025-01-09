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
import { httpApplyToJob } from "../controllers/applicationControllers.js";
import upload from "../middleware/multerMiddleware.js";

const jobRouter = express.Router();

// GET requests
jobRouter.get("/", httpGetAllJobsPost);
jobRouter.get("/all-jobs", httpGetAllJobs);
jobRouter.route('/stats').get(httpGetJobsStats)
jobRouter.get("/:id",validateIdParam, httpGetSingleJobDetails);

// POST requests
jobRouter.post("/", validateJobInput, httpCreateJob);

// Apply for a job with resume upload
jobRouter.post("/:id/apply",upload.single("resume"),httpApplyToJob );  //validateApplicationInputs

// PATCH requests
jobRouter.patch("/:id", validateJobInput, httpEditJobDetails);

// DELETE requests
jobRouter.delete("/:id",validateIdParam, httpDeleteJob);

// Catch-all route
jobRouter.get("*", httpNotFoundPage);

export default jobRouter;
