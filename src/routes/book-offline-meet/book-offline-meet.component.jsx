import { useEffect, useState } from 'react';
import './book-offline-meet.styles.scss';
import { useParams } from 'react-router-dom';
import ConfirmMeetingDialog from '../../components/confirm-meeting-dialog/confirm-meeting-dialog.component';
import CheckBookingDialog from '../../components/check-booking-dialog/check-booking-dialog.component';
import { useMeetingRoomsContext } from '../../contexts/meeting-rooms.context';
import MeetingRoomDetails from '../../components/meeting-room-details/meeting-room-details.component';
import SlotsPicker from '../../components/slots-picker/slots-picker.component';
import Calender from '../../components-2/calender/calender.component';

const BookOfflineMeet = () => {

    const {offlineMeetNameId}=useParams();
    const roomName = offlineMeetNameId.split('^-^')[0]
    const [currentMonth,setCurrentMonth]=useState(new Date().getMonth() +1);
    const meetingRoomId = offlineMeetNameId.split('^-^')[1]
    const [currentSlot,setCurrentSlot]=useState('9:00 AM - 11:00 AM');
    const [isConfirmMeetingDialogOpen,setIsConfirmMeetingDialogOpen]=useState(false);
    const [currentDate,setCurrentDate]=useState('');
    const [isCheckBookingDialogOpen,setIsCheckBookingDialogOpen]=useState(false);
    const {offlineMeetingsArray}=useMeetingRoomsContext();
    const [currentMeetingRoom,setCurrentMeetingRoom]=useState([]);
    const [currentStatus,setCurrentStatus]=useState(true);
    const [bookedSlotArrays,setBookedSlotArrays]=useState({}); 
    
    useEffect(()=>{
        setCurrentMeetingRoom(offlineMeetingsArray.filter(obj=>obj.meetingRoomName === roomName))
    },[offlineMeetingsArray,roomName])
    
    const handleSlotClick=(slot)=>{
        setCurrentSlot(slot)
    }

    return ( 
        <div className='book-offline-meet-div'>
            <h1>{roomName}</h1>
            <SlotsPicker currentSlot={currentSlot} handleSlotClick={handleSlotClick} />
            <div className='calender-div'>
                 <Calender currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentSlot={currentSlot} setIsConfirmMeetingDialogOpen={setIsConfirmMeetingDialogOpen} setCurrentDate={setCurrentDate} meetingRoomId={meetingRoomId}  bookedSlotArrays={bookedSlotArrays} setBookedSlotArrays={setBookedSlotArrays} />
                <MeetingRoomDetails currentMeetingRoom={currentMeetingRoom} currentSlot={currentSlot} bookedSlotArrays={bookedSlotArrays} />
            </div>
            {isConfirmMeetingDialogOpen && <ConfirmMeetingDialog meetingRoomId={meetingRoomId} currentSlot={currentSlot} meetingRoomName={roomName} setIsConfirmMeetingDialogOpen={setIsConfirmMeetingDialogOpen} currentDate={currentDate} currentMonth={currentMonth} currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} bookedSlotArrays={bookedSlotArrays} />}

            {isCheckBookingDialogOpen && <CheckBookingDialog currentSlot={currentSlot} currentDate={currentDate} setIsCheckBookingDialogOpen={setIsCheckBookingDialogOpen}  />}
        </div>
     );
}
 
export default BookOfflineMeet;