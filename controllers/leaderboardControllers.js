import User from '../models/userModel.js'

export async function httpGetAllUsersForLeaderboard(req,res){
    try{
        const allUsers = await User.find({})
        if(!allUsers){
            return res.status(404).json({message: 'No users found'})
        }
        const usersCount = await User.countDocuments()
        if(!usersCount){
            return res.status(404).json({message:'No users count found'})
        }
        res.status(200).json({"usersCount":usersCount,allUsers})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to get users for leaderboard",error:error });
    }
}

