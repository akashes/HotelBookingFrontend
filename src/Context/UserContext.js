import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider =({children})=>{
    const[user,setUser]=useState(null)
    const[ready,setReady]=useState(false)
    useEffect(()=>{
         axios.get('/profile').then((res)=>{
            console.log(res.data);
            setUser(res.data)
            setReady(true)
         }).catch((err)=>{
            console.log(err);
         })

    },[])
    return <UserContext.Provider value={{user,setUser,ready}}>
        {children}

    </UserContext.Provider>
}
