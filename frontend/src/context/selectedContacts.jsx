import { createContext, useState } from "react";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "../ui/loader";

export const ContactsContext = createContext({
    contacts:[],
    setContacts:()=>{},
   
})

export const ContactsProvider = ({children})=>{
    const [contacts,setContacts] = useState([])
    const [allMessages,setAllMessages] = useState([])
    const {currentUser,currentUserLoading} = useCurrentUser()
    if(currentUserLoading) return <Loader/>
    const value = {contacts,setContacts,currentUser}
    return (<ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>)
}
