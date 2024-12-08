import './my-meetings.styles.scss';
import myMeetingsImg from '../../assets/void.svg'
import { SiGoogleclassroom } from "react-icons/si";
import { FaTrash } from 'react-icons/fa6';


const MyMeetings = () => {

    const mockArray = [
        {meetingRoomName:'test meeting room at 1',meetingSlot:'9:00 AM - 11:00 AM',meetingDate:'12-10-24 & sunday',key:'1a',bookingTime:'Sun, 08 Dec 2024 06:47:21 GMT'},
        {meetingRoomName:'test meeting room at 1',meetingSlot:'9:00 AM - 11:00 AM',meetingDate:'12-10-24 & sunday',key:'1b',bookingTime:'Sun, 08 Dec 2024 06:47:21 GMT'},
        {meetingRoomName:'test meeting room at 1',meetingSlot:'9:00 AM - 11:00 AM',meetingDate:'12-10-24 & sunday',key:'1c',bookingTime:'Sun, 08 Dec 2024 06:47:21 GMT'},
        {meetingRoomName:'test meeting room at 1',meetingSlot:'9:00 AM - 11:00 AM',meetingDate:'12-10-24 & sunday',key:'1d',bookingTime:'Sun, 08 Dec 2024 06:47:21 GMT'},
    ]

    return ( 
        <div className='my-meetings-div'>
            <h1>My Meetings</h1>
            {!mockArray.length ? <div className='no-meetings'>
                <img src={myMeetingsImg} style={{width:'35%'}} />
            </div>:<div className='has-meetings'>
                    {mockArray.map(obj=>{
                        return <div key={obj.key} className='tile main-box-shadow'>
                                <div className='avatar'>
                                    <SiGoogleclassroom/>
                                </div>
                                <div className='details'>
                                    <div>
                                        <span>name</span>
                                        <p>{obj.meetingRoomName}</p>
                                    </div>
                                    <div>
                                        <span>slot</span>
                                        <p>{obj.meetingSlot}</p>
                                    </div>
                                    <div>
                                        <span>date</span>
                                        <p>{obj.meetingDate}</p>
                                    </div>
                                    <div>
                                        <span>booked at</span>
                                        <p>{obj.bookingTime.split('GMT')[0]}</p>
                                    </div>
                                </div>
                                <div className='button-box-shadow delete-meeting'><FaTrash/>Delete</div>
                        </div>
                    })}
            </div>}
        </div>
     );
}
 
export default MyMeetings;