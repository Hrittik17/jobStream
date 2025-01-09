import User from "../models/userModel.js";
import Job from '../models/jobModel.js';
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import { hashPassword } from "../utils/passwordUtils.js";

// a function to get the current user i.e who is using the app
export async function httpGetCurrentUser(req, res) {
    try {
        const currentUser = await User.findOne({ _id: req.user.userId })
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "This is current users", currentUser })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}


// a function to get the stats for the admin ie no of users,no of jobs,etc.
export async function httpGetApplicationStats(req, res) {
    try {
        const usersCount = await User.countDocuments()
        const jobsCount = await Job.countDocuments()
        if (!usersCount || !jobsCount) {
            return res.json({ message: "There is no users or jobs" })
        }
        res.status(200).json({ usersCount, jobsCount })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}


// // a function to update the current user details
// export async function httpUpdateUserDetails(req, res) {
//     try {
//         if (!req.user || !req.user.userId) { // if the req.user is not present or req.user.userId is not present it will throw error
//             return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//         }
//         console.log(req.file)
//         console.log("Uploaded file:", req.file);

//         let userDetailsWithoutPassword = req.body;
//         delete userDetailsWithoutPassword.password;  // deleting the password in case it fetched

//         console.log(userDetailsWithoutPassword);

//         const updatedUserDetails = await User.findByIdAndUpdate(
//             req.user.userId,
//             userDetailsWithoutPassword,
//             { new: true, runValidators: true }
//         );

//         if (!updatedUserDetails) {
//             return res.status(404).json({ message: "User not found or invalid input data." });
//         }
//         res.status(200).json({ message: "User details updated successfully", updatedUserDetails });
//     }catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong while updating user details.' });
//     }
// }


// A function to update the current user details
export async function httpUpdateUserDetails(req, res) {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        console.log(req.file);
        console.log("Uploaded file:", req.file);

        // Extract user details from request body
        let userDetailsWithoutPassword = { ...req.body };
        delete userDetailsWithoutPassword.password;  // Avoid updating the password here

        // Add avatar path if a file is uploaded
        if (req.file) {
            userDetailsWithoutPassword.avatar = req.file.path.replace("public\\", "");
            // Clean up the path by removing "public\" or "public/" for consistency
        }

        if (req.file) {
            const response = await cloudinary.v2.uploader.upload(req.file.path)
            await fs.unlink(req.file.path)
            userDetailsWithoutPassword.avatar = response.secure_url
            userDetailsWithoutPassword.avatarPublicId = response.public_id

        }

        console.log("Updated Details:", userDetailsWithoutPassword);

        // Update user details in the database
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.userId,
            userDetailsWithoutPassword,
            { new: true, runValidators: true } // Return updated document and apply validation
        );

        // If no user found, return 404
        if (!updatedUserDetails) {
            return res.status(404).json({ message: "User not found or invalid input data." });
        }

        if (req.file && updatedUserDetails.avatarPublicId) {
            await cloudinary.v2.uploader.destroy(updatedUserDetails.avatarPublicId)
        }

        // Send the updated user details in the response
        res.status(200).json({
            message: "User details updated successfully",
            updatedUserDetails,
        });
    } catch (err) {
        console.error("Error updating user details:", err);
        res.status(500).json({ message: 'Something went wrong while updating user details.' });
    }
}

// export async function httpUserChangePassword(req, res) {
//     try {
//         const { updatedPassword, userEmail } = req.body
//         const isUserValid = await User.findOne({ _id: req.user.userId })
//         if (!isUserValid) {
//             return res.status(404).json({ message: "You are not authenticated." })
//         }

//         const isUserExists = await User.findOne({ email: userEmail })
//         if (!isUserExists) {
//             return res.status(404).json({ message: "User doesn't exist." })
//         }
//         // Hash the new password
//         const hashedPassword = await hashPassword(updatedPassword);
//         isUserExists.password = hashedPassword;

//         // Save the updated user
//         await isUserExists.save();

//         res.status(200).json({ message: "Password updated successfully." })

//     } catch (error) {
//         console.error(error.message)
//         res.status(500).json({ message: 'Something went wrong while updating user password.' });
//     }
// }


export async function httpUserChangePassword(req, res) {
    try {
        const {email,password } = req.body;
        console.log(email,password )

        // Validate the authenticated user
        const isUserValid = await User.findOne({ _id: req.user.userId });
        if (!isUserValid) {
            return res.status(404).json({ message: "You are not authenticated." });
        }

        // const isUserExists = await User.findOne({ email: userEmail });
        // if (!isUserExists || isUserExists.email !== isUserValid.email) {
            //     return res.status(403).json({ message: "You are not authorized to change this user's password." });
            // }
            
        // Validate the email
        const isUserExists = await User.findOne({ email: email })
        if (!isUserExists) {
            return res.status(404).json({ message: "User doesn't exist." })
        }

        // Hash the new password
        const hashedPassword = await hashPassword(password);
        isUserExists.password = hashedPassword;

        // Save the updated user
        await isUserExists.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Something went wrong while updating user password.' });
    }
}
