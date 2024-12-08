import { useState } from 'react';
import './edit-meeting-room-dialog.styles.scss'
import PropTypes from 'prop-types';

const EditMeetingRoomDialog = ({roomName,roomLocation,roomCapacity,setIsEditMeetingDialogOpen}) => {

    const [newRoomName,setNewRoomName]=useState(roomName)
    const [newRoomLocation,setNewRoomLocation]=useState(roomLocation)
    const [newRoomCapacity,setNewRoomCapacity]=useState(roomCapacity)

    return (  
        <div className='overlaying'>
        <div className='div-placement '>
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
                <div className='btn-group'>
                    <div className='button-box-shadow' onClick={()=>setIsEditMeetingDialogOpen(false)} >cancel</div>
                    <div className='button-box-shadow'>submit</div>
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
}
export default EditMeetingRoomDialog;