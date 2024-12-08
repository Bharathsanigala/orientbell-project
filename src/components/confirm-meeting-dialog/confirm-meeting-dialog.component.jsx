import './confirm-meeting-dialog.styles.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegCalendarCheck } from "react-icons/fa6";

const ConfirmMeetingDialog = ({currentSlot,meetingRoomName,currentDate,setIsConfirmMeetingDialogOpen}) => {

    const [addMail,setAddMail]=useState('');

    return ( 
        <div className='overlaying'>
        <div className='confirm-meeting-dialog-div'>
            <h4>confirm booking</h4>
            <div className='avatar' >
                <FaRegCalendarCheck  />
            </div>
            <div>status : <span style={{color:'green'}}>available</span> </div>
            <div className='content'>
                <div>
                <span>name</span>
                <p>{meetingRoomName}</p>
                </div>
                <div>
                <span>slot</span>
                <p>{currentSlot}</p>
                </div>
                <div>
                <span>date & day</span>
                <p>{currentDate.split('-')[0]} & {currentDate.split('-')[1]} </p>
                </div>
                <div>
                <span>email</span>
                <input className='n-input' value={addMail} onChange={(e)=>setAddMail(e.target.value)} />
                </div>
            </div>
            <div className='btn-wrapper'>
                <div onClick={()=>setIsConfirmMeetingDialogOpen(false)}className='button-box-shadow'>cancel</div>
                <div className='button-box-shadow'>confirm</div>
            </div>
        </div>
        </div>
     );
}
ConfirmMeetingDialog.propTypes={
    currentSlot:PropTypes.string,
    meetingRoomName:PropTypes.string,
    currentDate:PropTypes.string,
    setIsConfirmMeetingDialogOpen:PropTypes.func,
}
export default ConfirmMeetingDialog;