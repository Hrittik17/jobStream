import Express from 'express'
import { httpGetAllUsersForLeaderboard } from '../controllers/leaderboardControllers.js'
const leaderboardRoutes = Express.Router()

leaderboardRoutes.get('',httpGetAllUsersForLeaderboard)

export default leaderboardRoutes