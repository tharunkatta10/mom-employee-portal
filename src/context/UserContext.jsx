import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserProvider = ({children})=>{

  

    const [user  , setUser] = useState(null);
    const [error , setError] = useState(false);
    const [jwtToken , setJwtToken] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("jwt_token")
        setJwtToken(token)
        if(token){
           const decoded =  jwtDecode(token)           
            setUser(decoded)
        }
    } , [])

    const setLogin = (token , userData)=>{
       localStorage.setItem("jwt_token" , token)
             const LocalToken = localStorage.getItem("jwt_token")
             setUser(userData)
             setJwtToken(token)  
    }
    

    return <UserContext.Provider value={{user , error , setLogin , jwtToken }}>
        {children}
    </UserContext.Provider>

}

export const useUser = ()=>{
    return useContext(UserContext)
}

export {UserContext , UserProvider}