import './add-meeting-room-dialog.styles.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaAudioDescription,FaBoxOpen } from "react-icons/fa";
import { FaPlus,FaCheck,FaTrash,FaLocationDot,FaMinus } from 'react-icons/fa6';
import { realtimeDatabase } from '../../utils/firebase/firebase';
import { push, ref } from 'firebase/database';


const AddMeetingRoomDialog = ({setIsAddMeetingDialogOpen}) => {

    const [newRoomName,setNewRoomName]=useState('')
    const [newRoomLocation,setNewRoomLocation]=useState('')
    const [newRoomCapacity,setNewRoomCapacity]=useState('')
    const [contentArray,setContentArray]=useState(['ac','projector']);
    const [currentContentItem,setCurrenContentItem]=useState('');
    const [isAddContentOpen,setIsAddContentOpen]=useState(false);
    const [animationClass,setAnimationClass]=useState('slideInDown')


    const handleDialogClose=(bool)=>{
        if(bool){
            handleMeetingRoomsPush()
        }else{
            closeHandler()
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
        setTimeout(()=>{
            setIsAddMeetingDialogOpen(false)
        },600)
    }

    const handleMeetingRoomsPush=async ()=>{
        const trimmedRoomName = newRoomName.trim()
        const trimmedRoomLocation=newRoomLocation.trim()
        const trimmedRoomCapacity = newRoomCapacity.trim()
        if(trimmedRoomName && trimmedRoomLocation && trimmedRoomCapacity){
            try{
                const offlineMeetigRoomsDataRef = ref(realtimeDatabase,`offlineMeetingRoomsData`)
                await push(offlineMeetigRoomsDataRef,{
                meetingRoomName:trimmedRoomName,
                location:trimmedRoomLocation,
                capacity:trimmedRoomCapacity,
                itemArray:contentArray
            })
            closeHandler()
            }catch(e){
                console.error('error adding meeting room to db',e)
                alert('Failed to add meeting room. Please try again.')
            }
            
        }
    }

    return ( 
        <div className='overlaying'>
        <div className= {`add-meeting-room-dialog-div animate__animated animate__${animationClass}`} >
        <h3>Add meeting room</h3>
        <div className='input-group'>
                    <div>
                    <FaAudioDescription/>
                    <input value={newRoomName} className='n-input' onChange={(e)=>setNewRoomName(e.target.value)}  maxLength={100} placeholder='room name' />
                    </div>
                   <div>
                   <FaLocationDot/>
                   <input value={newRoomLocation} className='n-input' onChange={(e)=>setNewRoomLocation(e.target.value)}  placeholder='room location' maxLength={100} />
                   </div>
                    <div>
                    <BsFillPeopleFill/>
                    <input value={newRoomCapacity} className='n-input' onChange={(e)=>setNewRoomCapacity(e.target.value)}  placeholder='room capacity' maxLength={20} />
                    </div>
                </div>
                <div className='contents-div'>
                    <span> <FaBoxOpen/> contents </span>
                    <div className='content-items-div'>
                    {contentArray.map((item,index)=>{
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
                           if(currentContentItem.trim()){
                            setCurrenContentItem('')
                            setContentArray(prev=>[...prev,currentContentItem.trim()])
                           } 
                        }}><FaCheck /></div>
                    </div>}
                </div>
                <div className='btn-group'>
                <div className='button-box-shadow' onClick={()=>handleDialogClose(false)}>cancel</div>
                <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>submit</div>
            </div>
        </div>
        </div>
     );
}
AddMeetingRoomDialog.propTypes={
    setIsAddMeetingDialogOpen:PropTypes.func,
}
export default AddMeetingRoomDialog;