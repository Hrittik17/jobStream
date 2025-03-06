import Express from 'express'
import { httpDeleteServices, httpEditServicesDetails, httpGetAllServices, httpGetSingleServiceDetails, httpGetUserServices, httpIncrementViews, httpPostServices } from '../controllers/servicesControllers.js'
import { postServicesValidation, validateServiceId } from '../middleware/servicesMiddleware.js'
const servicesRoutes = Express.Router()

servicesRoutes.get('/all-services',httpGetAllServices) 
servicesRoutes.get('/user-services',httpGetUserServices) 
servicesRoutes.get('/:id',validateServiceId,httpGetSingleServiceDetails)

servicesRoutes.post('/post-services',httpPostServices)  //postServicesValidation we will add validator

servicesRoutes.patch('/:id/update-services-details',httpEditServicesDetails)

servicesRoutes.patch('/:id/views',httpIncrementViews)

servicesRoutes.delete('/:id/delete-services',validateServiceId,httpDeleteServices)


export default servicesRoutes