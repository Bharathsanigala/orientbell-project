import { useEffect, useState } from 'react';
import './book-offline-meet.styles.scss';
import { useParams } from 'react-router-dom';
import { generateMonthCalendar,monthArray,dayArray } from '../../helpers/helpers';
import { FaCircleChevronRight,FaCircleChevronLeft } from "react-icons/fa6";
import ConfirmMeetingDialog from '../../components/confirm-meeting-dialog/confirm-meeting-dialog.component';
import CheckBookingDialog from '../../components/check-booking-dialog/check-booking-dialog.component';
import { FaLocationDot } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { BiSolidBookContent } from "react-icons/bi";
import Loader from '../../components/loader/loader.component';

const BookOfflineMeet = () => {

    const {offlineMeetNameId}=useParams();
    const slotNamesArray =  ['9:00 AM - 11:00 AM','11:00 AM - 01:00 PM','03:00 PM - 05:00 PM','05:00 PM - 07:00 PM']
    const meetingRoomName = offlineMeetNameId.split('^-^')[0]
    const [currentMonth,setCurrentMonth]=useState(new Date().getMonth() +1);
    const [currentYear,setCurrentYear]=useState(new Date().getFullYear());
    // const meetingRoomId = offlineMeetNameId.split('^-^')[1]
    const [currentSlot,setCurrentSlot]=useState('9:00 AM - 11:00 AM');
    const [calenderData,setCalenderData]=useState([]);
    const [calStepCount,setCalStepCount]=useState(0);
    const [isConfirmMeetingDialogOpen,setIsConfirmMeetingDialogOpen]=useState(false);
    const [currentDate,setCurrentDate]=useState('');
    const [isCheckBookingDialogOpen,setIsCheckBookingDialogOpen]=useState(false);

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


    return ( 
        <div className='book-offline-meet-div'>
            <h1>{meetingRoomName}</h1>
            <div className='slots-div'>
            {slotNamesArray.map((slotName,index)=>{
                return <div key={`slot-name-divs-${index}`} className='button-box-shadow' onClick={()=>handleSlotClick(slotName)} style={{boxShadow: currentSlot === slotName ? 'inset 2px 2px 8px var(--n-bs-clr3),2px 2px 6px var(--n-bs-clr4)' : 'inset 4px 4px 8px var(--n-bs-clr4),2px 2px 4px var(--n-bs-clr3)'}}>
                    <span>{`slot ${index+1}`}</span>
                    <span>{slotName}</span>
                </div>
            })}
            </div>
            <div className='calender-div'>
                <div className='calender main-box-shadow'>
                    <p>{monthArray[currentMonth-1]} {currentYear} </p>
                    <div className='controls'>
                        {calStepCount > 0 && <span className='button-box-shadow prev' onClick={()=>handleMonthChange(false)}><FaCircleChevronLeft/> prev</span>}
                    <span>{currentSlot ? currentSlot : '00:00 - 00:00'}</span>    
                        <span className='button-box-shadow next' onClick={()=>handleMonthChange(true)}> next <FaCircleChevronRight/></span>
                    </div>
                    <div className='main'>
                        {dayArray.map((currDay)=>{
                            return <div key={`calender-div-${currDay}`} className='i-col'>
                                <div>{currDay.slice(0,3)}</div>
                                {calenderData.filter(obj=>obj.day.toLowerCase() === currDay.toLowerCase()).map((obj,index)=>{
                                    const num = obj.date.split('/')[1]
                                    return <div className='i-div button-box-shadow' key={`calender-inner-div-${index}`} onClick={()=>{
                                        setCurrentDate(`${obj.date}-${currDay}`)
                                        setIsConfirmMeetingDialogOpen(true)}} style={{visibility:num === '00' ? 'hidden' :''}} >{num}
                                    <div className='light'></div>
                                    </div>
                                })}
                            </div>
                        })}
                    </div>
                </div>
                <div className='room-details main-box-shadow'>
                        <div className='avatar'>
                            <SiGoogleclassroom/>
                        </div>
                        <div className='details'>
                            <div >
                                <p> <FaLocationDot/> south east wing fllor 4 </p>
                            </div>
                            <div >
                                <p> <BsFillPeopleFill/> 60 members</p>
                            </div>
                        </div>
                        <div className='contents'>
                            <div className='avatar'> <FaBoxOpen/> </div>
                            <div className='content'>
                            <span> <BiSolidBookContent/> Ac</span>
                            <span> <BiSolidBookContent/> white board</span>
                            <span> <BiSolidBookContent/> other contents</span>
                            </div>
                        </div>
                </div>
            </div>
            {isConfirmMeetingDialogOpen && <ConfirmMeetingDialog  currentSlot={currentSlot} meetingRoomName={meetingRoomName} setIsConfirmMeetingDialogOpen={setIsConfirmMeetingDialogOpen} currentDate={currentDate} />}
            {isCheckBookingDialogOpen && <CheckBookingDialog currentSlot={currentSlot} currentDate={currentDate} setIsCheckBookingDialogOpen={setIsCheckBookingDialogOpen} />}
        </div>
     );
}
 
export default BookOfflineMeet;