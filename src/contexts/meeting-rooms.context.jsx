import { off, onValue, ref } from "firebase/database";
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
        const offMeetingsDataRef = ref(realtimeDatabase,'offlineMeetingRoomsData')
         onValue(offMeetingsDataRef,(snapshot)=>{
            const data = snapshot.val();
            if(data){
                const dataArray = Object.entries(data).map(([key,{meetingRoomName,location,capacity,itemArray}])=>({
                    key,meetingRoomName,location,capacity,itemArray
                }));
                setOfflineMeetingsArray(dataArray)
                console.log('set meeting rooms context')
            }else{
                setOfflineMeetingsArray([]);
            }
            setIsMeetingRoomsLoading(false)
        },
        (error)=>{
            console.error('error occured while fetching offline meeting rooms data',error);
            setIsMeetingRoomsLoading(false);
            setIsDbErrorOccured(true);
        }
    )
    return ()=>{
        off(offMeetingsDataRef);
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