import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { auth,firestoreDatabase } from "../utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserRoleContext = createContext();

export const UserRoleProvider=({children})=>{

    const [fetchedUserRoleData,setFetchedUserRoleData]=useState(null);

    useEffect(()=>{
        const fetchUserRoleData=async(user)=>{
            try{
                const usersRef = doc(firestoreDatabase,'users',user.uid);
                const userDoc = await getDoc(usersRef);
                if(userDoc.exists()){
                    const data = userDoc.data();
                    setFetchedUserRoleData({fetchedUserEmail:data.email,fetchedUserName:data.name,fetchedUserRole:data.role});
                }else{
                    setFetchedUserRoleData(null);
                }
            }catch(e){
                console.error('error occuered while fetching user role in user role context',e)
                setFetchedUserRoleData(null)
            }
        }
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user) {
                fetchUserRoleData(user)
            }else{
                setFetchedUserRoleData(null);
            }
        })
    return ()=>unsubscribe();
    },[])
    

    return(
        <UserRoleContext.Provider value={{fetchedUserRoleData}}>
            {children}
        </UserRoleContext.Provider>
    )
}

UserRoleProvider.propTypes={
    children:PropTypes.node,
}

export const useUserRoleContext=()=>useContext(UserRoleContext);