import PropTypes from 'prop-types';
import './unenroll-meeting-dialog.styles.scss';
import { useState,Fragment } from 'react';
import { useAuthContext } from '../../contexts/auth-context.context';
import DialogStatesUi from '../dialog-states-ui/dialog-states-ui.component';
import { monthArray } from '../../helpers/helpers';
import { arrayRemove, doc, writeBatch } from 'firebase/firestore';
import { firestoreDatabase } from '../../utils/firebase/firebase';

const UnEnrollMeetingDialog = ({setIsUnenrollMeetingDialogOpen,docId,children,roomId,meetingSlot,meetingDate}) => {

    const [unenrollState,setUnenrollState]=useState('idle') //idle,success,error,loading
    const [animationClass,setAnimationClass]=useState('slideInDown')
    const {user} = useAuthContext();
    
    
    const handleDialogClose=(bool)=>{
        if(bool){
            handleBookingUnenrollment()
        }else{
            closeHandler()
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
    }

    const handleBookingUnenrollment=async()=>{
        if(roomId && docId ){
            setUnenrollState('loading')
            try{
                const dayToRemove = meetingDate.split('/')[1];
                const monthName = monthArray[meetingDate.split('/')[0]-1]
                const batch = writeBatch(firestoreDatabase);
                const userBookingDocRef = doc(firestoreDatabase,`userBookings/${user.uid}/bookings/${docId}`);
                batch.delete(userBookingDocRef);
                const meetingBookingsRef = doc(firestoreDatabase,`meetingRoomsBookings/${roomId}/calender/${monthName}`);
                batch.update(meetingBookingsRef,{
                    [meetingSlot]:arrayRemove(dayToRemove),
                })
                await batch.commit();
                setUnenrollState('success')
            }catch(e){
                console.error('error while unenrolling metting',e)
                setUnenrollState('error')
            }
        }
    }


    return ( 
        <div className='overlaying'>
        <div className= {`unenroll-meeting-dialog-div animate__animated animate__${animationClass}`} onAnimationEnd={() => {
        if (animationClass === 'fadeOutDown') setIsUnenrollMeetingDialogOpen(false);
    }}>
        <h4>Unenroll Booking</h4>
            <DialogStatesUi state={unenrollState} loadingMessage={'Booking unenrollment in progress. Please Wait!'} successMessage={'Hooray! Your Booking  unenrollment is Successful.'} dialogCloser={handleDialogClose} dialogType={'cmd'} />
            {unenrollState === 'idle' && <Fragment>
                <div className='main'>
                    {children}
                </div>
                <div className='c-btn-wrapper'>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(false)}>cancel</div>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>unenroll</div>
                </div>
            </Fragment>}
        </div>
        </div>
     );
}
UnEnrollMeetingDialog.propTypes={
    setIsUnenrollMeetingDialogOpen:PropTypes.func,
    children:PropTypes.node,
    docId:PropTypes.string,
    roomId:PropTypes.string,
    meetingSlot:PropTypes.string,
    meetingDate:PropTypes.string,
} 
export default UnEnrollMeetingDialog;