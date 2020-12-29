import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useAuth()


    return (
    <Route {...rest} render={props => currentUser ? <Component {...props}></Component> : <Redirect to='/login' /> }>

    </Route>
    )
}
