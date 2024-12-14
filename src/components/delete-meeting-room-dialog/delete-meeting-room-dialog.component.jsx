import './delete-meeting-room-dialog.styles.scss';
import { SiGoogleclassroom } from "react-icons/si";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { realtimeDatabase } from '../../utils/firebase/firebase';

const DeleteMeetingRoomDialog = ({setIsDeleteMeetingDialogOpen,roomName,roomId}) => {

    const [animationClass,setAnimationClass]=useState('slideInDown')

    const handleDialogClose=(bool)=>{
        if(bool){
            handleMeetingRoomDelete()
        }else{
            closeHandler()
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
    }

    const handleMeetingRoomDelete=async ()=>{
        if(roomId){
            try{
                const offlineMeetigRoomsDataRef = ref(realtimeDatabase,`offlineMeetingRoomsData/${roomId}`)
                closeHandler()
                await remove(offlineMeetigRoomsDataRef)
            }catch(e){
                console.error('error deleting meeting room from db',e)
                alert('Failed to delete meeting room. Please try again.')
            }
        }
    }

    return ( 
        <div className='overlaying'>
        <div className={`delete-meeting-room-dialog-div animate__animated animate__${animationClass}`} onAnimationEnd={() => {
        if (animationClass === 'fadeOutDown') setIsDeleteMeetingDialogOpen(false);
    }}>
            <h3>Remover</h3>
            <div className='d-img'>
            <SiGoogleclassroom/>
            </div>
            <span>{roomName}</span>
            <span className='note'>**All booked meetings will be deleted**</span>
            <div className='btn-group'>
                <div className='button-box-shadow' onClick={()=>handleDialogClose(false)}>cancel</div>
                <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>remove</div>
            </div>
        </div>
        </div>
     );
}
DeleteMeetingRoomDialog.propTypes={
    setIsDeleteMeetingDialogOpen:PropTypes.func,
    roomName:PropTypes.string,
    roomId:PropTypes.string,
}
export default DeleteMeetingRoomDialog;