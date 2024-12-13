import { off, onChildAdded, onChildChanged, onChildRemoved,  ref } from "firebase/database";
import PropTypes from "prop-types";
import { createContext,useContext,useEffect,useState } from "react";
import { realtimeDatabase } from "../utils/firebase/firebase";

const MeetingRoomsContext = createContext();

export const MeetingRoomsProvider=({children})=>{

    const [offlineMeetingsArray,setOfflineMeetingsArray]=useState([]);
    const [isMeetingRoomsLoading,setIsMeetingRoomsLoading]=useState(false);
    const [isDbErrorOccured,setIsDbErrorOccured]=useState(false);

    useEffect(()=>{
        setIsMeetingRoomsLoading(true);
        const offlineMeetingsDataRef = ref(realtimeDatabase,'offlineMeetingRoomsData')
        
        const handleMeetingRoomAdd = (snapshot)=>{
            const data = snapshot.val();
            const key = snapshot.key;
            if(data){
                const {meetingRoomName,location,capacity,itemArray}=data;
                setOfflineMeetingsArray(prev=>[...prev,{key,meetingRoomName,location,capacity,itemArray}])
            }
        }

        const handleMeetingRoomChange=(snapshot)=>{
            const data = snapshot.val();
            const key = snapshot.key
            if(data){
                const {meetingRoomName,location,capacity,itemArray}=data;
                setOfflineMeetingsArray(prev=>prev.map(room=>{
                    return room.key === key ? {key,meetingRoomName,location,capacity,itemArray}:room
                }))
            }
        }

        const handleMeetingRoomRemoval= (snapshot)=>{
            const key = snapshot.key;
            setOfflineMeetingsArray(prev=>prev.filter(room=>room.key !== key))
        }
        
        try{
            onChildAdded(offlineMeetingsDataRef,handleMeetingRoomAdd);
            onChildChanged(offlineMeetingsDataRef,handleMeetingRoomChange);
            onChildRemoved(offlineMeetingsDataRef,handleMeetingRoomRemoval)
        }catch(e){
            console.error("Error occurred while fetching offline meeting rooms data", e)
            setIsDbErrorOccured(true);
        }finally{
            setIsMeetingRoomsLoading(false);
        }
    
    return ()=>{
        off(offlineMeetingsDataRef);
    }
    },[])
    
    return(
        <MeetingRoomsContext.Provider value={{offlineMeetingsArray,isMeetingRoomsLoading,isDbErrorOccured}}>
            {children}
        </MeetingRoomsContext.Provider>
    )
}
MeetingRoomsProvider.propTypes={
    children:PropTypes.node,
}


export const useMeetingRoomsContext=()=>useContext(MeetingRoomsContext)