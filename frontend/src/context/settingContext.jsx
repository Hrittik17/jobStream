import { createContext, useState } from "react";

export const SettingContext = createContext({
    isSettingIconOpen : false,
    setIsSettingIconOpen:()=>{},
    isProfileIconOpen:false,
    setIsProfileIconOpen:()=>{},
})

export const SettingProvider = ({children})=>{
    const [isSettingIconOpen,setIsSettingIconOpen] = useState(false)
    const [isProfileIconOpen,setIsProfileIconOpen] = useState(false)
    const value = {isSettingIconOpen,setIsSettingIconOpen,isProfileIconOpen,setIsProfileIconOpen}
    return (<SettingContext.Provider value={value}>{children}</SettingContext.Provider>)
}
