import express from 'express';
import {httpGetRaisedIssues,httpPostRaiseIssue} from '../controllers/issueConroller.js'
import { postRaiseIssueValidation } from '../middleware/issueMiddleware.js';

const issueRoutes = express.Router()

issueRoutes.get('/',httpGetRaisedIssues)

issueRoutes.post('/raise-issue',httpPostRaiseIssue)  //postRaiseIssueValidation

export default issueRoutes;