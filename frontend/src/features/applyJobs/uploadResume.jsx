import React from 'react'
import { useCurrentUser } from '../authentication/useCurrentUser'
import Loader from '../../ui/loader'

export default function UploadResume() {
  const {currentUser,currentUserLoading,currentUserError} = useCurrentUser()
  if(currentUserLoading){
    return <Loader/>
  }

  if(!currentUser){
    return
  }
  const { fullName, email, gender, status } = currentUser;

  return (
    <div>
      
      
    </div>
  )
}
