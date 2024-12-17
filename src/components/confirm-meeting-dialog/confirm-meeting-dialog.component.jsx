import './confirm-meeting-dialog.styles.scss';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useUserRoleContext } from '../../contexts/user-role.context';
import { firestoreDatabase } from '../../utils/firebase/firebase';
import { useAuthContext } from '../../contexts/auth-context.context';
import { arrayUnion, collection, doc, writeBatch,serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { monthArray } from '../../helpers/helpers';
import DialogStatesUi from '../../components-2/dialog-states-ui/dialog-states-ui.component';

const ConfirmMeetingDialog = ({currentSlot,meetingRoomName,currentDate,setIsConfirmMeetingDialogOpen,meetingRoomId,currentMonth,currentStatus,setCurrentStatus,bookedSlotArrays}) => {

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
        if(meetingRoomId && currentDate && currentSlot && meetingRoomName && currentStatus){
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
                    bookedMeetingRoomId:meetingRoomId,
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

    useEffect(()=>{
        bookedSlotArrays?.[currentSlot]?.includes(currentDate.split('/')[1]) ? setCurrentStatus(false) : setCurrentStatus(true)
    },[bookedSlotArrays,currentDate,currentSlot,setCurrentStatus])

    return ( 
        <div className='overlaying'>
        <div className={`confirm-meeting-dialog-div animate__animated animate__${animationClass}`} onAnimationEnd={() => {
        if (animationClass === 'fadeOutDown') setIsConfirmMeetingDialogOpen(false);
    }} >
            <h4>confirm booking</h4>
            <div className='c-avatar' >
                <FaRegCalendarCheck  />
            </div>
            <DialogStatesUi state={bookingState} loadingMessage={'Booking in progress. Please Wait!'} successMessage={'Hooray! Your Booking is Success.'} dialogCloser={handleDialogClose} dialogType={'cmd'} />
            {bookingState === 'idle' && <Fragment>
            <div>status : <span style={{color:currentStatus ? 'green' : 'red'}}>{currentStatus ? 'available' : 'not available'}</span> </div>
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
            <div className='c-btn-wrapper'>
                <div onClick={()=>handleDialogClose(false)} className='button-box-shadow'>cancel</div>
                {currentStatus && <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>confirm</div>}
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
    currentStatus:PropTypes.bool,
    setCurrentStatus:PropTypes.func,
    bookedSlotArrays:PropTypes.object,
}
export default ConfirmMeetingDialog;