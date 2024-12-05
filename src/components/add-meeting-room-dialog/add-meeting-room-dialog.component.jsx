import './add-meeting-room-dialog.styles.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaAudioDescription,FaBoxOpen } from "react-icons/fa";
import { FaPlus,FaCheck,FaTrash,FaLocationDot,FaXmark } from 'react-icons/fa6';


const AddMeetingRoomDialog = ({setIsAddMeetingDialogOpen}) => {

    const [newRoomName,setNewRoomName]=useState('')
    const [newRoomLocation,setNewRoomLocation]=useState('')
    const [newRoomCapacity,setNewRoomCapacity]=useState('')
    const [contentArray,setContentArray]=useState(['ac','projector']);
    const [currentContentItem,setCurrenContentItem]=useState('');
    const [isAddContentOpen,setIsAddContentOpen]=useState(false);

    return ( 
        <div className='overlaying'>
        <div className='add-meeting-room-dialog-div'>
        <div className='close-mark'> <FaXmark onClick={()=>setIsAddMeetingDialogOpen(false)} /></div>
        <h3>Add meeting room</h3>
        <div className='input-group'>
                    <div>
                    <FaAudioDescription/>
                    <input value={newRoomName} className='n-input' onChange={(e)=>setNewRoomName(e.target.value)} maxLength={100} placeholder='room name' />
                    </div>
                   <div>
                   <FaLocationDot/>
                   <input value={newRoomLocation} className='n-input' onChange={(e)=>setNewRoomLocation(e.target.value)} placeholder='room location' maxLength={100} />
                   </div>
                    <div>
                    <BsFillPeopleFill/>
                    <input value={newRoomCapacity} className='n-input' onChange={(e)=>setNewRoomCapacity(e.target.value)} placeholder='room capacity' maxLength={20} />
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
                    <div className='button-box-shadow add-content-btn' onClick={()=>setIsAddContentOpen(prev=>!prev)}><FaPlus/> add contents</div>
                    {isAddContentOpen && <div className='content-input'>
                        <input className='n-input' placeholder='item name' value={currentContentItem} maxLength={40} onChange={(e)=>setCurrenContentItem(e.target.value)} />
                        <div className='button-box-shadow'><FaCheck onClick={()=>{
                           if(currentContentItem.trim()){
                            setCurrenContentItem('')
                            setContentArray(prev=>[...prev,currentContentItem.trim()])
                           } 
                        }} /></div>
                    </div>}
                </div>
                <div className='btn-group'>
                <div className='button-box-shadow' onClick={()=>setIsAddMeetingDialogOpen(false)}>cancel</div>
                <div className='button-box-shadow'>submit</div>
            </div>
        </div>
        </div>
     );
}
AddMeetingRoomDialog.propTypes={
    setIsAddMeetingDialogOpen:PropTypes.func,
}
export default AddMeetingRoomDialog;