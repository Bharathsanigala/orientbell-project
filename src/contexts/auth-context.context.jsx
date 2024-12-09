import { createContext,useState,useContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

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

export const useAuthContext = ()=> useContext(AuthContext);