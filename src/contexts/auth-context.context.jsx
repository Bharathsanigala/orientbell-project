import { createContext,useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(null);

    function handleSetUser(user){
        setUser(user);
    }

    return(
        <AuthContext.Provider value={{user,handleSetUser}}>
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes={
    children:PropTypes.node,
}