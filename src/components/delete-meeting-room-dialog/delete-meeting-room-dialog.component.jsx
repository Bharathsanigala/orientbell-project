import './delete-meeting-room-dialog.styles.scss';
import { SiGoogleclassroom } from "react-icons/si";
import PropTypes from 'prop-types';

const DeleteMeetingRoomDialog = ({setIsDeleteMeetingDialogOpen,roomName}) => {
    return ( 
        <div className='overlaying'>
        <div className='delete-meeting-room-dialog-div'>
            <h3>Remover</h3>
            <div className='d-img'>
            <SiGoogleclassroom/>
            </div>
            <span>{roomName}</span>
            <span className='note'>**All booked meetings will be deleted**</span>
            <div className='btn-group'>
                <div className='button-box-shadow' onClick={()=>setIsDeleteMeetingDialogOpen(false)}>cancel</div>
                <div className='button-box-shadow'>remove</div>
            </div>
        </div>
        </div>
     );
}
DeleteMeetingRoomDialog.propTypes={
    setIsDeleteMeetingDialogOpen:PropTypes.func,
    roomName:PropTypes.string,
}
export default DeleteMeetingRoomDialog;