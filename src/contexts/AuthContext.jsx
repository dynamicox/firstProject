import React, {useContext, useState, useEffect} from 'react'
import { appAuth } from "../firebase";

const AuthContext = React.createContext()

export const useAuth = () =>{
    return useContext(AuthContext);
}



export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signUp(email, password){
        return appAuth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return appAuth.signInWithEmailAndPassword(email, password)
    }
    function resetPass(email) {
        return appAuth.sendPasswordResetEmail(email)
    }

    function logOut() {
        return appAuth.signOut()
    }

    useEffect(() => {
        const unsuscribe = appAuth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsuscribe
    }, [])


    const value={
        currentUser,
        resetPass,
        signUp,
        logIn,
        logOut
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
