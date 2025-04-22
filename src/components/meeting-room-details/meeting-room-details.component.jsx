import './meeting-room-details.styles.scss';
import { FaLocationDot } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";
import PropTypes from 'prop-types';

const MeetingRoomDetails = ({currentMeetingRoom,currentSlot,bookedSlotArrays}) => {

    const seatsLeft = currentMeetingRoom[0]?.capacity - bookedSlotArrays?.[currentSlot]?.length;

    return ( 
        <div className='meeting-room-details-div main-box-shadow'>
                <div className='avatar'>
                    <SiGoogleclassroom/>
                </div>
                <div className='details'>
                    <div >
                        <p> <FaLocationDot/> {currentMeetingRoom[0]?.location} </p>
                    </div>
                    <div>
                        <p > <MdChair/> { seatsLeft || currentMeetingRoom[0]?.capacity} seats left</p>
                    </div>
                </div>
                <div className='contents'>
                    <div className='avatar'> <FaBoxOpen/> </div>
                    <div className='content'>
                    {currentMeetingRoom[0]?.itemArray?.map((item,idx)=>{
                        return <span key={`room-contents-${idx}`}>
                        <BiSolidBookContent/> {item}
                        </span>
                    })}
                    </div>
                </div>
        </div>
     );
}
MeetingRoomDetails.propTypes={
    currentMeetingRoom:PropTypes.array,
    currentSlot:PropTypes.string,
    bookedSlotArrays:PropTypes.object,
}
export default MeetingRoomDetails;