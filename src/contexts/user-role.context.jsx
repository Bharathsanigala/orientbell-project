import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { auth,firestoreDatabase } from "../utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const UserRoleContext = createContext();

export const UserRoleProvider=({children})=>{

    const [fetchedUserRoleData,setFetchedUserRoleData]=useState(null);
    const [isRoleLoading,setIsRoleLoading]=useState(false);

    useEffect(()=>{
        let unsubscribeFromFirestore = null;
        const fetchUserRoleData=async(user)=>{
            try{
                setIsRoleLoading(true);
                const usersRef = doc(firestoreDatabase,'users',user.uid);
                unsubscribeFromFirestore = onSnapshot(usersRef,(userSnapshot)=>{
                    if(userSnapshot.exists()){
                        const data = userSnapshot.data();
                        setFetchedUserRoleData({
                            fetchedUserEmail:data.email,
                            fetchedUserName:data.name,
                            fetchedUserRole:data.role
                        });
                        console.log('set role context')
                    }
                    else{
                        setFetchedUserRoleData(null);
                    }
                })
                setIsRoleLoading(false);
            }catch(e){
                console.error('error occuered while fetching user role in user role context',e)
                setFetchedUserRoleData(null)
                setIsRoleLoading(false);
            }
        }
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user) {
                fetchUserRoleData(user)
            }else{
                setFetchedUserRoleData(null);
            }
        })
    return ()=>{
        if(unsubscribe)unsubscribe()
        if(unsubscribeFromFirestore)unsubscribeFromFirestore()
    }
    },[])
    

    return(
        <UserRoleContext.Provider value={{fetchedUserRoleData,isRoleLoading}}>
            {children}
        </UserRoleContext.Provider>
    )
}

UserRoleProvider.propTypes={
    children:PropTypes.node,
}

export const useUserRoleContext=()=>useContext(UserRoleContext);