import './online-meet.styles.scss';
import EmptyMeetingRoomsImg from '../../assets/empty.svg';

const OnlineMeet = () => {


    return ( 
        <div className='online-meet-div db-error-class'>
            <h1>Online Meetings</h1>
            <img src={EmptyMeetingRoomsImg} />
            <p>Nothing Yet!</p>
        </div>
     );
}
 
export default OnlineMeet;