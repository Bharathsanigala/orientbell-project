import './my-meetings.styles.scss';
import myMeetingsImg from '../../assets/void.svg'

const MyMeetings = () => {
    return ( 
        <div className='my-meetings-div'>
            <h1>My Meetings</h1>
            <div className='no-meetings'>
                <img src={myMeetingsImg} style={{width:'35%'}} />
            </div>
        </div>
     );
}
 
export default MyMeetings;