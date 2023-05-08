import {createContext, useState} from "react";
import {auth} from "../config/firebase.js";

export const AuthContext = createContext({
    isLoggedIn: undefined,
    setIsLoggedIn: undefined
})

export default function AuthContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // syncing auth state and isLoggedIn with this piece of code is genius
    if (Boolean(auth?.currentUser?.email) !== isLoggedIn){
        setIsLoggedIn(Boolean(auth?.currentUser?.email))
    }

    return<AuthContext.Provider  value={{isLoggedIn, setIsLoggedIn}}>{children}</AuthContext.Provider>
}