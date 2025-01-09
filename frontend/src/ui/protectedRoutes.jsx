import { useEffect } from "react"
import { useCurrentUser } from "../features/authentication/useCurrentUser"
import { useNavigate } from "react-router-dom"
import Loader from "./loader"

export default function ProtectedRoutes({children}) {
    const navigate = useNavigate()
    const {currentUser,currentUserLoading} = useCurrentUser()
    useEffect(()=>{
        if(!currentUser || !currentUserLoading){
            navigate('/login')
        }
    },[currentUser,currentUserLoading,navigate])

    if(currentUserLoading) return <Loader/>

  return (
    {children}
  )
}
