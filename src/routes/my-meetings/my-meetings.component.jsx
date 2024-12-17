import './my-meetings.styles.scss';
import myMeetingsImg from '../../assets/void.svg'
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegSquareMinus,FaTrash } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader.component';
import DbError from '../../components/db-error/db-error.component';
import { useAuthContext } from '../../contexts/auth-context.context';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreDatabase } from '../../utils/firebase/firebase';
import Sorters from '../../components-2/sorters/sorters.component';
import UnEnrollMeetingDialog from '../../components-2/unenroll-meeting-dialog/unenroll-meeting-dialog.component';
import DeleteMeetingBookingDialog from '../../components-2/delete-meeting-booking-dialog/delete-meeting-booking-dialog.component';
import AboutBookingPart from '../../components-2/about-booking-part/about-booking-part.component';

const MyMeetings = () => {

    const [myMeetingsState,setMyMeetingsState]=useState('') //idle,loading,error
    const [myMeetingsDataArray,setMyMeetingsDataArray]=useState([]);
    const [isDeleteMeetingBookingDialogOpen,setIsDeleteMeetingBookingDialogOpen]=useState(false);
    const [isUnenrollMeetingDialogOpen,setIsUnenrollMeetingDialogOpen]=useState(false);
    const [roomName,setRoomName]=useState('');
    const [meetingSlot,setMeetingSlot]=useState('');
    const [meetingDate,setMeetingDate]=useState('')
    const [roomId,setRoomId]=useState('');
    const [docId,setDocId]=useState('');
    const {user}=useAuthContext()

    useEffect(()=>{
        if(!user) return;
        const userBookingsRef = collection(firestoreDatabase,`userBookings/${user.uid}/bookings`);
        let unsubscribeFromFirestore = null;
        const fetchUserBookings=async()=>{
            setMyMeetingsState('loading')
            try{
                unsubscribeFromFirestore = onSnapshot(userBookingsRef,(snapshot)=>{
                    if(!snapshot.empty){
                        const data = snapshot.docs.map(doc=>({key:doc.id,...doc.data()}))
                        setMyMeetingsDataArray(data);
                    }else{
                        setMyMeetingsDataArray([]);
                    }
                })
                setMyMeetingsState('idle')
            }catch(e){
                console.error('error fetching my meetings',e)
                setMyMeetingsDataArray([]);
                setMyMeetingsState('error')
            }
        }
        fetchUserBookings()
        return ()=>{
            if(unsubscribeFromFirestore) unsubscribeFromFirestore()
        }
    },[user])

    const stateSetter=(room,date,slot,key)=>{
        setRoomName(room)
        setMeetingDate(date)
        setMeetingSlot(slot)
        setDocId(key)
    }

    const daysLeft=(targetDate)=>{
        const timeDifferenceInMilliSeconds = new Date(targetDate) - new Date()
        const val= Math.ceil(timeDifferenceInMilliSeconds/(1000*60*60*24))
        
        return val > 0 ? `${(val)} days left` : 'completed' 
    }

    return ( 
        <div className='my-meetings-div'>
            <h1>My Meetings</h1>
            {!myMeetingsDataArray.length >0 && <div className='no-meetings'>
                <img src={myMeetingsImg} style={{width:'35%'}} />
            </div>}
            {myMeetingsState === 'loading' && <div className='loader-class'>
            <Loader lh={'100px'} lw={'100px'} />
            <p>loading my meetings</p>
        </div> }
            {myMeetingsState === 'error' && <DbError/>}
            {myMeetingsState === 'idle' && <div className='sorts'>
                <Sorters label={'sort by booking time'} myMeetingsDataArray={myMeetingsDataArray} setMyMeetingsDataArray={setMyMeetingsDataArray} type={'bookedAt'} />
                <Sorters label={'sort by meeting time'} myMeetingsDataArray={myMeetingsDataArray} setMyMeetingsDataArray={setMyMeetingsDataArray} type={'bookedDate'} />
            </div>}
            {myMeetingsState === 'idle' && <div className='has-meetings'>
                    {myMeetingsDataArray.map(obj=>{
                        const daysRemaining = daysLeft(`${obj?.bookedDate?.split('-')[0]}, ${obj?.bookedSlot?.split('AM')[0]}`)
                        return <div key={obj.key} className='tile main-box-shadow'>
                                <div className='avatar'>
                                    <SiGoogleclassroom/>
                                    <span style={{color:daysRemaining === 'completed' ? 'red' : 'green'}}>{daysRemaining}</span>
                                </div>
                                <div className='details'>
                                    <div>
                                        <span>meeting room</span>
                                        <p>{obj?.bookedMeetingRoomName}</p>
                                    </div>
                                    <div>
                                        <span>meeting slot</span>
                                        <p>{obj?.bookedSlot}</p>
                                    </div>
                                    <div>
                                        <span>meeting date</span>
                                        <p>{obj?.bookedDate}</p>
                                    </div>
                                    <div>
                                        <span>booked time</span>
                                        <p>{obj?.bookedAt?.toDate()?.toLocaleString()}</p>
                                    </div>
                                </div>
                                {daysRemaining !== 'completed' ? <div className='button-box-shadow delete-meeting' onClick={()=>{
                                    stateSetter(obj.bookedMeetingRoomName,obj.bookedDate,obj.bookedSlot,obj.key)
                                    setRoomId(obj.bookedMeetingRoomId)
                                    setIsUnenrollMeetingDialogOpen(true)
                                }}><FaRegSquareMinus/>unenroll</div> : <div className='button-box-shadow delete-meeting' onClick={()=>{
                                    stateSetter(obj.bookedMeetingRoomName,obj.bookedDate,obj.bookedSlot,obj.key)
                                    setIsDeleteMeetingBookingDialogOpen(true)
                                    }}> <FaTrash/> delete</div>}
                        </div>
                    })}
            </div>}
            {isDeleteMeetingBookingDialogOpen && <DeleteMeetingBookingDialog setIsDeleteMeetingBookingDialogOpen={setIsDeleteMeetingBookingDialogOpen} docId={docId} >
                    <AboutBookingPart roomName={roomName} meetingSlot={meetingSlot} meetingDate={meetingDate} />
            </DeleteMeetingBookingDialog>}
            {isUnenrollMeetingDialogOpen && <UnEnrollMeetingDialog  setIsUnenrollMeetingDialogOpen={setIsUnenrollMeetingDialogOpen} docId={docId} roomId={roomId} meetingDate={meetingDate} meetingSlot={meetingSlot} >
                <AboutBookingPart roomName={roomName} meetingSlot={meetingSlot} meetingDate={meetingDate} />
            </UnEnrollMeetingDialog>}
        </div>
     );
}
 
export default MyMeetings;