import express from 'express'
import {httpAcceptInvitation, httpGetClientAllRequests, httpGetContactRequests, httpInviteFriend, httpRejectInvitation } from '../controllers/contactInvitation.js'  //getClientAllRequests, getContactRequests,

const contactsRoutes = express.Router()

contactsRoutes.post('/invite-contact-request',httpInviteFriend)
contactsRoutes.post('/accept-contact-request',httpAcceptInvitation)
contactsRoutes.post('/reject-contact-request',httpRejectInvitation)
contactsRoutes.get('/all-requests',httpGetContactRequests)
contactsRoutes.get('/client-all-requests',httpGetClientAllRequests)

export default contactsRoutes