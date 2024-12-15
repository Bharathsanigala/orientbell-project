import './calender.styles.scss';
import { FaCircleChevronRight,FaCircleChevronLeft } from "react-icons/fa6";
import { generateMonthCalendar,monthArray,dayArray } from '../../helpers/helpers';
import { FcDeleteDatabase } from "react-icons/fc";
import Loader from '../../components/loader/loader.component';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useUserRoleContext } from '../../contexts/user-role.context';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestoreDatabase } from '../../utils/firebase/firebase';

const Calender = ({currentMonth,setCurrentMonth,currentSlot,setIsConfirmMeetingDialogOpen,setCurrentDate,meetingRoomId,bookedSlotArrays,setBookedSlotArrays}) => {

    const todayDate = new Date().getDate();
    const [calStepCount,setCalStepCount]=useState(0);
    const [calenderState,setCalenderState]=useState('idle');//idle,loading,error
    const [calenderData,setCalenderData]=useState([]);
    const [currentYear,setCurrentYear]=useState(new Date().getFullYear());
    const {fetchedUserRoleData}=useUserRoleContext();
    

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
    
    const calenderTileColor=(num)=>{
        if(calStepCount===0 && num < todayDate) return 'gray'
        return bookedSlotArrays?.[currentSlot]?.includes(num) ? 'red' : 'green'
    }

    useEffect(()=>{
         if(!meetingRoomId)return;
        const meetingRoomsBookingsRef = doc(firestoreDatabase,`meetingRoomsBookings/${meetingRoomId}/calender/${monthArray[currentMonth-1]}`);
        let unsubscribeFromFirestore = null;
        const fetchBookingsData=async()=>{
            setCalenderState('loading')
            try{
                unsubscribeFromFirestore = onSnapshot(meetingRoomsBookingsRef,(snapshot)=>{
                    if(snapshot.exists()){
                        setBookedSlotArrays(snapshot.data())
                    }else{
                        setBookedSlotArrays({});
                    }
                })
                setCalenderState('idle')
            }catch(e){
                console.error('error occured by fetching slot booking details',e)
                setBookedSlotArrays({})
                setCalenderState('error')
            }
        }
        fetchBookingsData();
        return ()=>
            {
                if(unsubscribeFromFirestore) unsubscribeFromFirestore()
            }
    },[currentMonth,meetingRoomId,setBookedSlotArrays])

    useEffect(()=>{
        setCalenderData(generateMonthCalendar(currentYear,currentMonth))
    },[currentMonth,currentYear])

    return ( 
        <div className='calender main-box-shadow'>
            <p>{monthArray[currentMonth-1]} {currentYear} </p>
            <div className='controls'>
                {calStepCount > 0 && <span className='button-box-shadow prev' onClick={()=>handleMonthChange(false)}><FaCircleChevronLeft/> prev</span>}
            <span>{currentSlot ? currentSlot : '00:00 - 00:00'}</span>    
                {calStepCount <2 && <span className='button-box-shadow next' onClick={()=>handleMonthChange(true)}> next <FaCircleChevronRight/></span>}
            </div>
            {calenderState==='loading' && <div className='calender-loading'>
                <Loader lw={'70px'} lh={'70px'} />
                <p>Loading room availability</p>
            </div>}
            {calenderState === 'error' && <div className='b-loading'>
                    <FcDeleteDatabase className='svg-img' />
                    <p>Error occured. Please Try Later!</p>
                </div>}
            {calenderState==='idle' && <div className='main'>
                {dayArray.map((currDay)=>{
                    return <div key={`calender-div-${currDay}`} className='i-col'>
                        <div>{currDay.slice(0,3)}</div>
                        {calenderData.filter(obj=>obj.day.toLowerCase() === currDay.toLowerCase()).map((obj,index)=>{
                            const num = obj.date.split('/')[1]
                            return <div className='i-div button-box-shadow' key={`calender-inner-div-${index}`} onClick={()=>{
                                if(calStepCount ===0 && num < todayDate) return;
                                if(fetchedUserRoleData?.fetchedUserRole==='admin' || fetchedUserRoleData?.fetchedUserRole==='writer'){
                                setCurrentDate(`${obj.date}-${currDay}`)
                                setIsConfirmMeetingDialogOpen(true)
                                }
                                }} style={{visibility:num === '00' ? 'hidden' :''}} >{num}
                            <div className='light' style={{backgroundColor:calenderTileColor(num)}}></div>
                            </div>
                        })}
                    </div>
                })}
            </div>
            }
        </div>
     );
}
Calender.propTypes={
    currentMonth:PropTypes.number,
    setCurrentMonth:PropTypes.func,
    currentSlot:PropTypes.string,
    setIsConfirmMeetingDialogOpen:PropTypes.func,
    setCurrentDate:PropTypes.func,
    meetingRoomId:PropTypes.string,
    bookedSlotArrays:PropTypes.object,
    setBookedSlotArrays:PropTypes.func,
}
export default Calender;