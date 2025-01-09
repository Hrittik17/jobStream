import { verifyJWt } from "../utils/tokenUtils.js";

export function authenticatedUserRequests(req, res, next) {
    const { token } = req.cookies; // Ensure cookies middleware is in use
    // console.log("Cookies:", req.cookies);
    if (!token) {
        return res.status(401).json({ message: 'You are Unauthorized' });
    }
    try {
        const { userId, role } = verifyJWt(token); // Assuming JWT payload has userId and role
        req.user = { userId, role };  // creating a new user property into req ie we can access the userId and role from re.user
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Failed to authorize user' });
    }
}

export const authenticateAdmin = (...roles)=>{
    return (req,res,next)=>{
        // console.log(req.user.userId)
        if(!roles.includes(req.user.role)){
            throw new Error("You are not authorised to access this.")
        }
        next()
    }
}
