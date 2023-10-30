import {createContext, useState} from "react";

export const AuthContext = createContext({
    isLoggedIn: undefined,
    setIsLoggedIn: undefined
})

export default function AuthContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return<AuthContext.Provider  value={{isLoggedIn, setIsLoggedIn}}>{children}</AuthContext.Provider>
}