import Services from '../models/servicesModel.js';

// a function to post a service
export async function httpPostServices(req, res) {
    try {
        const { serviceData } = req.body;
        console.log(serviceData)
        console.log(req.user.userId)
        const { title, description, skills, servicesAmount, userId, projectLink } = serviceData

        // Create new service
        const newService = new Services({
            title,
            description,
            skills,
            servicesAmount,
            userId,
            projectLink,
        });

        await newService.save();

        return res.status(201).json({ message: 'Service posted successfully!', service: newService });
    } catch (error) {
        console.error('Error in httpPostServices:', error);
        return res.status(500).json({ errorMessage: 'Internal server error',error:error });
    }
};


export async function httpGetAllServices(req, res) {
    try {
        const servicesPost = await Services.find({})
            .sort({ createdAt: -1 })
            .populate('userId', 'email fullName gender avatar points'); // Populating the userId field and selecting only the avatar

        if (!servicesPost) {
            return res.status(401).json({ message: 'Failed to get all services' })
        }
        res.status(200).json({ servicesPost });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error',error:error })
    }
}

export async function httpEditServicesDetails(req,res){
    try{
        const {id} = req.params
        const {data} = req.body
        const isServiceExists = await Services.findByIdAndUpdate(id,data,{ new: true })
        if(!isServiceExists){
            return res.status(404).json({message: 'Service does not exist'})
        }
        res.status(200).json({message:"Services successfully updated",service:isServiceExists})

    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to update services",error:error });
    }
}


export async function httpDeleteServices(req,res){
    try{
        const {id} = req.params

        const isServiceExists = await Services.findByIdAndDelete(id)
        if(!isServiceExists){
            return res.status(404).json({message: "Service does not exist"})
        }
        res.status(200).json({message:"Services successfully deleted"})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to delete services",error:error });
    }
}

export async function httpGetSingleServiceDetails(req,res){
    try{
        const {id} = req.params

        const isServiceExists = await Services.findById(id).populate('userId', 'email fullName gender avatar points');
        if(!isServiceExists){
            return res.status(404).json({message: "Service does not exist"})
        }
        res.status(200).json({message:"fetched services successfully",servicesDetails:isServiceExists})   
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to get details of services",error:error });
    }
}


export async function httpGetUserServices(req,res){
    try{
        const userServices = await Services.find({userId:req.user.userId})
        if(!userServices || userServices.length === 0){
            return res.status(404).json({message: "User doesnt created any services"})
        }
        res.status(200).json(userServices);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to get user of services",error:error });
    }
}


export async function httpIncrementViews(req, res) {
    try {
        const { id } = req.params; // Service ID
        const service = await Services.findById(id); // Find specific service by ID

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Prevent the owner of the service from incrementing views
        if (service.userId.toString() === req.user.userId) {
            return res.status(400).json({ message: "Cannot increment views for your own service" });
        }

        service.views += 1; // Increment views
        await service.save(); // Save the updated service

        return res.status(200).json({ message: "Views incremented", views: service.views });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to increment views", error });
    }
}
