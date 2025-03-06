import jwt from 'jsonwebtoken';
import { verifyJWt } from '../utils/tokenUtils.js';

// export function verifyTokenSocket(socket, next) {
//     // Extract the token from the socket's handshake authentication object
//     // Extract cookies from socket's handshake headers
//     const cookieHeader = socket.handshake.headers.cookie;
//     // console.log("Cookies in handshake:", socket.handshake.headers.cookie);
//     // console.log(cookieHeader)

//     if (!cookieHeader) {
//         console.error("No cookies found in handshake headers.");
//         return next(new Error("Authentication error: No cookies found"));
//     }

//     // Parse the cookies to find the token
//     const cookies = Object.fromEntries(
//         cookieHeader
//             .split(";")
//             .map((cookie) => cookie.trim().split("="))
//     );
//     const token = cookies['token']; // Replace 'authToken' with your cookie key
//     // console.log(token)

//     if (!token) {
//         console.error("Token not found in cookies.");
//         return next(new Error("Authentication error: Token is missing"));
//     }

//     try {
//         // Verify the JWT token using the secret from the environment variables
//         const decoded = jwt.verify(token, process.env.JWT_Secret);

//         // Attach the decoded user information to the socket object for future use
//         socket.user = decoded;
//         next();  // If the token is valid, proceed to the next middleware or establish the connection

        
//     } catch (error) {
//         // If verification fails, create an error object with an appropriate message
//         const socketError = new Error("Not authorized");

//         // Pass the error to the next middleware, which handles the connection error
//         return next(socketError);
//     }

    
//     // next();
// }


// export function verifyTokenSocket(socket, next) {
//     console.log("🔍 Socket Authentication Middleware Triggered");
    
//     const cookieHeader = socket.handshake.headers.cookie;
//     console.log("📋 Handshake Headers:", socket.handshake.headers);
    
//     if (!cookieHeader) {
//         console.error("❌ No cookies found in handshake headers");
//         return next(new Error("Authentication error: No cookies found"));
//     }

//     try {
//         const cookies = Object.fromEntries(
//             cookieHeader
//                 .split(";")
//                 .map((cookie) => cookie.trim().split("="))
//         );
        
//         console.log("🍪 Parsed Cookies:", Object.keys(cookies));
        
//         const token = cookies['token']; 
        
//         if (!token) {
//             console.error("❌ Token not found in cookies");
//             return next(new Error("Authentication error: Token is missing"));
//         }

//         console.log("🔐 Token found, attempting verification");
        
//         const decoded = jwt.verify(token, process.env.JWT_Secret);
        
//         console.log("✅ Token Successfully Verified");
//         console.log("👤 Decoded User:", decoded);
        
//         socket.user = decoded;
//         next();
        
//     } catch (error) {
//         console.error("🚫 Token Verification Failed:", error.message);
//         return next(new Error("Authentication failed: " + error.message));
//     }
// }

// In verifyTokenSocket.js
// import { verifyJWt } from "../";

export function verifyTokenSocket(socket, next) {
//   console.log("🔍 Socket Authentication Middleware Triggered");
  
  const cookieHeader = socket.handshake.headers.cookie;
//   console.log("📋 Handshake Headers:", socket.handshake.headers);
  
  if (!cookieHeader) {
    console.error("❌ No cookies found in handshake headers");
    return next(new Error("Authentication error: No cookies found"));
  }

  try {
    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map((cookie) => cookie.trim().split("="))
    );
    
    const token = cookies['token']; 
    
    if (!token) {
      console.error("❌ Token not found in cookies");
      return next(new Error("Authentication error: Token is missing"));
    }

    // Use the same verification method as in HTTP requests
    const decoded = verifyJWt(token);
    socket.user = decoded;
    next();
    
  } catch (error) {
    console.error("🚫 Token Verification Failed:", error.message);
    return next(new Error("Authentication failed: " + error.message));
  }
}