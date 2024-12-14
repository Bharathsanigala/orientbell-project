import { useEffect, useState } from 'react';
import './book-offline-meet.styles.scss';
import { useParams } from 'react-router-dom';
import { generateMonthCalendar,monthArray,dayArray } from '../../helpers/helpers';
import { FaCircleChevronRight,FaCircleChevronLeft } from "react-icons/fa6";
import ConfirmMeetingDialog from '../../components/confirm-meeting-dialog/confirm-meeting-dialog.component';
import CheckBookingDialog from '../../components/check-booking-dialog/check-booking-dialog.component';
import Loader from '../../components/loader/loader.component';
import { useMeetingRoomsContext } from '../../contexts/meeting-rooms.context';
import DbError from '../../components/db-error/db-error.component';
import MeetingRoomDetails from '../../components/meeting-room-details/meeting-room-details.component';
import SlotsPicker from '../../components/slots-picker/slots-picker.component';

const BookOfflineMeet = () => {

    const {offlineMeetNameId}=useParams();
    const roomName = offlineMeetNameId.split('^-^')[0]
    const [currentMonth,setCurrentMonth]=useState(new Date().getMonth() +1);
    const [currentYear,setCurrentYear]=useState(new Date().getFullYear());
    const meetingRoomId = offlineMeetNameId.split('^-^')[1]
    const [currentSlot,setCurrentSlot]=useState('9:00 AM - 11:00 AM');
    const [calenderData,setCalenderData]=useState([]);
    const [calStepCount,setCalStepCount]=useState(0);
    const [isConfirmMeetingDialogOpen,setIsConfirmMeetingDialogOpen]=useState(false);
    const [currentDate,setCurrentDate]=useState('');
    const [isCheckBookingDialogOpen,setIsCheckBookingDialogOpen]=useState(false);
    const {offlineMeetingsArray}=useMeetingRoomsContext();
    const [currentMeetingRoom,setCurrentMeetingRoom]=useState([]);
    const [isDbErrorOccured,setIsDbErrorOccured]=useState(false);
    const [loadingCalenderAvailability,setLoadingCalenderAvailability]=useState(true);
    const todayDate = new Date().getDate();
    
    useEffect(()=>{
        setCurrentMeetingRoom(offlineMeetingsArray.filter(obj=>obj.meetingRoomName === roomName))
    },[offlineMeetingsArray,roomName])
    
    const handleSlotClick=(slot)=>{
        setCurrentSlot(slot)
    }
    
    const handleMonthChange = (increment) => {
        setCalStepCount((prev) => (increment ? prev + 1 : prev - 1));
        setCurrentMonth((prevMonth) => {
            let newMonth = increment ? prevMonth + 1 : prevMonth - 1;
            let newYear = currentYear;
            if (newMonth > 12) {
                newMonth = 1;
                newYear += 1;
            } else if (newMonth < 1) {
                newMonth = 12;
                newYear -= 1;
            }
            setCurrentYear(newYear);
            return newMonth;
        });
    };
    

    useEffect(()=>{
        setCalenderData(generateMonthCalendar(currentYear,currentMonth))
    },[currentMonth,currentYear])

    if(isDbErrorOccured){
        return <DbError/>
    }

    return ( 
        <div className='book-offline-meet-div'>
            <h1>{roomName}</h1>
            <SlotsPicker currentSlot={currentSlot} handleSlotClick={handleSlotClick} />
            <div className='calender-div'>
                 <div className='calender main-box-shadow'>
                    <p>{monthArray[currentMonth-1]} {currentYear} </p>
                    <div className='controls'>
                        {calStepCount > 0 && <span className='button-box-shadow prev' onClick={()=>handleMonthChange(false)}><FaCircleChevronLeft/> prev</span>}
                    <span>{currentSlot ? currentSlot : '00:00 - 00:00'}</span>    
                        <span className='button-box-shadow next' onClick={()=>handleMonthChange(true)}> next <FaCircleChevronRight/></span>
                    </div>
                    {loadingCalenderAvailability ? <div className='main'>
                        {dayArray.map((currDay)=>{
                            return <div key={`calender-div-${currDay}`} className='i-col'>
                                <div>{currDay.slice(0,3)}</div>
                                {calenderData.filter(obj=>obj.day.toLowerCase() === currDay.toLowerCase()).map((obj,index)=>{
                                    const num = obj.date.split('/')[1]
                                    return <div className='i-div button-box-shadow' key={`calender-inner-div-${index}`} onClick={()=>{
                                        if(calStepCount ===0 && num < todayDate) return;
                                        setCurrentDate(`${obj.date}-${currDay}`)
                                        setIsConfirmMeetingDialogOpen(true)}} style={{visibility:num === '00' ? 'hidden' :''}} >{num}
                                    <div className='light' style={{backgroundColor:calStepCount===0 && num < todayDate ? 'gray' : 'green'}}></div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>:<div className='calender-loading'>
                        <Loader lw={'70px'} lh={'70px'} />
                        <p>Loading room availability</p>
                    </div>}
                </div>
                <MeetingRoomDetails currentMeetingRoom={currentMeetingRoom} />
            </div>
            {isConfirmMeetingDialogOpen && <ConfirmMeetingDialog meetingRoomId={meetingRoomId} currentSlot={currentSlot} meetingRoomName={roomName} setIsConfirmMeetingDialogOpen={setIsConfirmMeetingDialogOpen} currentDate={currentDate} currentMonth={currentMonth} />}
            {isCheckBookingDialogOpen && <CheckBookingDialog currentSlot={currentSlot} currentDate={currentDate} setIsCheckBookingDialogOpen={setIsCheckBookingDialogOpen} />}
        </div>
     );
}
 
export default BookOfflineMeet;