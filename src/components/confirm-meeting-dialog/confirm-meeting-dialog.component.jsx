import './confirm-meeting-dialog.styles.scss';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { FaRegCalendarCheck,FaCircleCheck } from "react-icons/fa6";
import { useUserRoleContext } from '../../contexts/user-role.context';
import { firestoreDatabase } from '../../utils/firebase/firebase';
import { useAuthContext } from '../../contexts/auth-context.context';
import { arrayUnion, collection, doc, writeBatch,serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { monthArray } from '../../helpers/helpers';
import Loader from '../../components/loader/loader.component';
import { FcDeleteDatabase } from "react-icons/fc";

const ConfirmMeetingDialog = ({currentSlot,meetingRoomName,currentDate,setIsConfirmMeetingDialogOpen,meetingRoomId,currentMonth}) => {

    const [addMail,setAddMail]=useState('');
    const {fetchedUserRoleData}=useUserRoleContext();
    const {user}=useAuthContext();
    const [isOthersBookingButtonClicked,setIsOthersBookingButtonClicked]=useState(false);
    const [animationClass,setAnimationClass]=useState('slideInDown')
    const [bookingState,setBookingState]=useState('idle'); //idle,loading,error,success

    
    const handleDialogClose=(bool)=>{
        if(bool){
            handleMeetingRoomBooking()
        }else{
            closeHandler()
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
    }

    const handleMeetingRoomBooking=async ()=>{
        if(meetingRoomId && currentDate && currentSlot && meetingRoomName){
            setBookingState('loading')
            const day = currentDate.split('/')[1]
            try{
                const batch = writeBatch(firestoreDatabase);
                const meetingRoomsBookingsRef = doc(firestoreDatabase,`meetingRoomsBookings/${meetingRoomId}/calender/${monthArray[currentMonth-1]}`);
                batch.set(meetingRoomsBookingsRef,{
                    [currentSlot]:arrayUnion(day),
                },{merge:true})
                let userUid = addMail.trim() ? await getReceipentUserUid() : user.uid;
                if(!userUid){
                    throw new Error('Invalid receipent email ID. Please Try again.');
                }
                const userBookingsRef=doc(collection(firestoreDatabase,`userBookings/${userUid}/bookings`));
                batch.set(userBookingsRef,{
                    bookedMeetingRoomName:meetingRoomName,
                    bookedSlot:currentSlot,
                    bookedDate:currentDate,
                    bookedAt:serverTimestamp()
                })
                await batch.commit()
                setBookingState('success')
            }catch(e){
                if(e.message === 'Invalid receipent email ID. Please Try again.'){
                    alert('Invalid Email entered for receipent email. Admin, please enter correct receipent email')
                }else{
                    console.error('error occured while booking meeting room',e);
                }
                setBookingState('error')
            }
            
        }
    }

    const getReceipentUserUid=async()=>{
        try{
            const usersCollectionRef = collection(firestoreDatabase, 'users');
        const q = query(usersCollectionRef, where('email', '==', addMail.trim()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]; 
            return userDoc.id; 
        }
        return null;
        }catch(e){
            console.error('error fetching receipent email',e)
            return null;
        }
    }

    return ( 
        <div className='overlaying'>
        <div className={`confirm-meeting-dialog-div animate__animated animate__${animationClass}`} onAnimationEnd={() => {
        if (animationClass === 'fadeOutDown') setIsConfirmMeetingDialogOpen(false);
    }} >
            <h4>confirm booking</h4>
            <div className='avatar' >
                <FaRegCalendarCheck  />
            </div>
            {bookingState === 'loading' && <div className='b-loading'>
             <Loader lw={'80px'} lh={'80px'} />
            <p>Booking in progress. Please Wait!</p>
            </div>}
            {bookingState === 'error' && <div className='b-loading'>
                <FcDeleteDatabase className='svg-img' />
                <p>Error occured. Please Try Later!</p>
            </div>}
            {bookingState === 'success' && <div className='b-loading'>
                <FaCircleCheck className='svg-img' style={{color:'green'}} />
                <p>Hooray! Your Booking is Success.</p>
            </div>}
            {(bookingState === 'error' || bookingState === 'success') && <div className='button-box-shadow close-btn' onClick={()=>handleDialogClose(false)} >close</div>}
            {bookingState === 'idle' && <Fragment>
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
                {fetchedUserRoleData?.fetchedUserRole === 'admin' && <button className='button-box-shadow' onClick={()=>setIsOthersBookingButtonClicked(prev=>!prev)}>{!isOthersBookingButtonClicked ? "book for other user" : "close input"}</button>}
                {isOthersBookingButtonClicked && <div>
                <input className='n-input' value={addMail} placeholder='receipent email' type='email' onChange={(e)=>setAddMail(e.target.value)} />
                </div>}
            </div>
            <div className='btn-wrapper'>
                <div onClick={()=>handleDialogClose(false)}className='button-box-shadow'>cancel</div>
                <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>confirm</div>
            </div>
            </Fragment>}
        </div>
        </div>
     );
}
ConfirmMeetingDialog.propTypes={
    currentSlot:PropTypes.string,
    meetingRoomName:PropTypes.string,
    currentDate:PropTypes.string,
    setIsConfirmMeetingDialogOpen:PropTypes.func,
    meetingRoomId:PropTypes.string,
    currentMonth:PropTypes.number,
}
export default ConfirmMeetingDialog;