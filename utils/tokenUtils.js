import jwt from 'jsonwebtoken';

export function createJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_Secret, {
        expiresIn: process.env.JWT_expires, // Use the correct variable name
    });
    return token;
}

export function verifyJWt(token){
    try{
        const validToken = jwt.verify(token,process.env.JWT_Secret)
        if(!validToken){
            console.error("No token provided in cookies");
            throw new Error("Invalid token. You cannot exccess the application ")
        }
        return validToken;
    }catch(error){
        console.error(error)
        throw new Error("Failed to authenticate. Please try again")
    }
}

         