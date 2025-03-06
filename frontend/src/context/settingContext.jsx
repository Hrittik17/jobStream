import { createContext, useState } from "react";

export const SettingContext = createContext({
    isSettingIconOpen : false,
    setIsSettingIconOpen:()=>{},
    isProfileIconOpen:false,
    setIsProfileIconOpen:()=>{},
    isNotificationOpen:false,
    setIsNotificationOpen:()=>{},
})

export const SettingProvider = ({children})=>{
    const [isSettingIconOpen,setIsSettingIconOpen] = useState(false)
    const [isProfileIconOpen,setIsProfileIconOpen] = useState(false)
    const [isNotificationOpen,setIsNotificationOpen] = useState(false)
    const value = {isSettingIconOpen,setIsSettingIconOpen,isProfileIconOpen,setIsProfileIconOpen,isNotificationOpen,setIsNotificationOpen}
    return (<SettingContext.Provider value={value}>{children}</SettingContext.Provider>)
}
