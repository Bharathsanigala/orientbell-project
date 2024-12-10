import { useEffect, useState } from 'react';
import './edit-meeting-room-dialog.styles.scss'
import PropTypes from 'prop-types';
import { FaBoxOpen,FaTrash,FaPlus,FaMinus,FaCheck } from 'react-icons/fa6';
import { update,ref } from 'firebase/database';
import { realtimeDatabase } from '../../utils/firebase/firebase';

const EditMeetingRoomDialog = ({roomName,roomLocation,roomCapacity,setIsEditMeetingDialogOpen,roomItems,roomId}) => {

    const [newRoomName,setNewRoomName]=useState(roomName)
    const [newRoomLocation,setNewRoomLocation]=useState(roomLocation)
    const [newRoomCapacity,setNewRoomCapacity]=useState(roomCapacity)
    const [contentArray,setContentArray]=useState([])
    const [currentContentItem,setCurrenContentItem]=useState('');
    const [isAddContentOpen,setIsAddContentOpen]=useState(false);
    const [animationClass,setAnimationClass]=useState('slideInDown')

    const handleDialogClose=(bool)=>{
        if(bool){
            handleMeetingRoomUpdate()
        }else{
            closeHandler()
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
        setTimeout(()=>{
            setIsEditMeetingDialogOpen(false)
        },600)
    }

    const handleMeetingRoomUpdate=async ()=>{
        const updateObject={};
        if(newRoomName !== roomName) updateObject['meetingRoomName']=newRoomName
        if(newRoomLocation !== roomLocation) updateObject['location']=newRoomLocation
        if(newRoomCapacity !== roomCapacity) updateObject['capacity']=newRoomCapacity
        if(isArraysChanged()) updateObject['itemArray']=contentArray;
        
        if(Object.keys(updateObject).length){
            try{
                const offlineMeetigRoomsDataRef = ref(realtimeDatabase,`offlineMeetingRoomsData/${roomId}`)
                await update(offlineMeetigRoomsDataRef,updateObject)
                closeHandler()
            }catch(e){
                console.error("Error updating meeting room:", e);
                alert("Failed to update the meeting room. Please try again.");
            }
        }else{
            closeHandler();
        }
    }

    const isArraysChanged=()=>{
        if (roomItems.length !== contentArray.length) return true;
        return !roomItems.every(item => contentArray.includes(item)) || 
           !contentArray.every(item => roomItems.includes(item));
    }

    useEffect(()=>{
        setContentArray(roomItems)
    },[roomItems])

    return (  
        <div className='overlaying'>
        <div className={`div-placement animate__animated animate__${animationClass}`}>
            <div className='edit-meeting-room-dialog-div '>
                <h3>Editor</h3>
                <div className='input-group'>
                    <div>
                    <label>room name</label>
                    <input value={newRoomName} className='n-input' onChange={(e)=>setNewRoomName(e.target.value)} maxLength={100} />
                    </div>
                   <div>
                   <label>room location</label>
                   <input value={newRoomLocation} className='n-input' onChange={(e)=>setNewRoomLocation(e.target.value)} maxLength={100} />
                   </div>
                    <div>
                    <label>room capacity</label>
                    <input value={newRoomCapacity} className='n-input' onChange={(e)=>setNewRoomCapacity(e.target.value)} maxLength={20} />
                    </div>
                </div>
                <div className='contents-div'>
                <span> <FaBoxOpen/> contents </span>
                <div className='content-items-div'>
                {contentArray?.length && contentArray.map((item,index)=>{
                        return <div key={`content-item-${index}`} className='content-item-tile'>
                            <span>{item}</span>
                            <FaTrash onClick={()=>setContentArray(contentArray.filter(contentItem =>contentItem !== item))} />
                        </div>
                    })}
                </div>
                <div className='button-box-shadow add-content-btn' onClick={()=>setIsAddContentOpen(prev=>!prev)}>
                    {!isAddContentOpen ? <FaPlus/> : <FaMinus/>}
                     {!isAddContentOpen ?  "add contents" : "close box"}
                    </div>
                    {isAddContentOpen && <div className='content-input'>
                        <input className='n-input' placeholder='item name' value={currentContentItem} maxLength={40} onChange={(e)=>setCurrenContentItem(e.target.value)} />
                        <div className='button-box-shadow' onClick={()=>{
                           if(currentContentItem.trim() && !contentArray.includes(currentContentItem.trim())){
                            setContentArray(prev=>[...prev,currentContentItem.trim()])
                            setCurrenContentItem('')
                           } 
                        }}><FaCheck /></div>
                    </div>}
                </div>
                <div className='btn-group'>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(false)} >cancel</div>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>submit</div>
                </div>
            </div>
            </div>
        </div>
     );
}
EditMeetingRoomDialog.propTypes={
    roomName:PropTypes.string,
    roomCapacity:PropTypes.string,
    roomLocation:PropTypes.string,
    isEditMeetingDialogOpen:PropTypes.bool,
    setIsEditMeetingDialogOpen:PropTypes.func,
    roomId:PropTypes.string,
    roomItems:PropTypes.array,
}
export default EditMeetingRoomDialog;