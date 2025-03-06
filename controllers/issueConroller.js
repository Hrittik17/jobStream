import Issue from '../models/issueModel.js'

// export async function httpPostRaiseIssue(req,res){
//     try{
//         const {issueData} = req.body
//         const {email,issue} = issueData

//         console.log('email:',email,'issue: ',issue)

//         // post a issue
//         const newRaiseIssue = await Issue.create({email,issue})
//         if(!newRaiseIssue){
//             return res.status(401).json({message:'Unable to raise a issue'})
//         }
//         res.status(201).json({message:'Successfully raised a issue'})
//     }catch(error){
//         console.error(error)
//         res.status(500).json({ message: 'failed to raise issue' })
//     }
// }


export async function httpPostRaiseIssue(req, res) {
    try {
        const { issueData } = req.body;

        // Ensure issueData is present
        if (!issueData || !issueData.email || !issueData.issue) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const { email, issue } = issueData;

        console.log("email:", email, "issue:", issue);

        // Create a new issue entry
        const newRaiseIssue = await Issue.create({ email, issue });

        if (!newRaiseIssue) {
            return res.status(401).json({ message: "Unable to raise an issue" });
        }

        res.status(201).json({ message: "Successfully raised an issue" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to raise issue" });
    }
}



export async function httpGetRaisedIssues(req,res){
    try{
        const {role} = req.user

        if (role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to access this" });
        }

        const raisedIssues = await Issue.find({});

        if (!raisedIssues.length) {
            return res.status(404).json({ message: "No issues found" });
        }

        res.status(200).json(raisedIssues);

    }catch(error){
        console.error(error)
        res.status(500).json({message:'Unable to get raised issues'})
    }
}