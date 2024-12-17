import {  Fragment, useState } from 'react';
import './delete-meeting-booking-dialog.styles.scss';
import PropTypes from 'prop-types';
import DialogStatesUi from '../dialog-states-ui/dialog-states-ui.component';
import { useAuthContext } from '../../contexts/auth-context.context';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestoreDatabase } from '../../utils/firebase/firebase';

const DeleteMeetingBookingDialog = ({setIsDeleteMeetingBookingDialogOpen,children,docId}) => {

    const [deletionState,setDeletionState]=useState('idle'); //idle,success,error,loading
    const [animationClass,setAnimationClass]=useState('slideInDown')
    const {user} = useAuthContext();

    const handleDialogClose=(bool)=>{
        if(bool){
            handleBookingDeletion()
        }else{
            closeHandler()
        }
    }

    const handleBookingDeletion=async()=>{
        if(docId){
            setDeletionState('loading')
            try{
                const documentRefInDb = doc(firestoreDatabase,`userBookings/${user.uid}/bookings/${docId}`);
                await deleteDoc(documentRefInDb);
                setDeletionState('success')
            }catch(e){
                console.error('error occured while deleting user meeting',e)
                setDeletionState('error')
            }
        }
    }

    const closeHandler=()=>{
        setAnimationClass('fadeOutDown');
    }

    return ( 
        <div className='overlaying'>
        <div className={`delete-meeting-booking-dialog-div animate__animated animate__${animationClass}`}  onAnimationEnd={() => {
        if (animationClass === 'fadeOutDown') setIsDeleteMeetingBookingDialogOpen(false);
    }} >
            <h4>Delete Booking</h4>
            <DialogStatesUi state={deletionState} loadingMessage={'Booking deletion in progress. Please Wait!'} successMessage={'Hooray! Your Booking Deletion is Successful.'} dialogCloser={handleDialogClose} dialogType={'dmbd'} />
            {deletionState === 'idle' && <Fragment>
                <div className='main'>
                    {children}
                </div>
                <div className='c-btn-wrapper'>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(false)}>cancel</div>
                    <div className='button-box-shadow' onClick={()=>handleDialogClose(true)}>delete</div>
                </div>
            </Fragment>}
        </div>
        </div>
     );
}
DeleteMeetingBookingDialog.propTypes={
    setIsDeleteMeetingBookingDialogOpen:PropTypes.func,
    children:PropTypes.node,
    docId:PropTypes.string,
}
export default DeleteMeetingBookingDialog;