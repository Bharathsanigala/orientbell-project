import './meet-type.styles.scss';
import OnlineMeetingImg from '../../assets/online-meeting.png';
import OfflineMeetingImg from '../../assets/offline-meeting.png';
import 'animate.css'
import { useNavigate } from 'react-router-dom';

const MeetType = () => {

    const navigateRouter = useNavigate();

    return ( 
        <div className="meet-type-div">
            <h1>Meeting Type</h1>
            <div className="main">
                <div className='tile animate__animated ' onClick={()=>navigateRouter('/online-meet')}>
                    <div>
                        <img src={OnlineMeetingImg} />
                    </div>
                    <span>Online Meeting</span>
                </div>
                <div className='tile animate__animated ' onClick={()=>navigateRouter('/offline-meet')}>
                <div>
                        <img src={OfflineMeetingImg} />
                    </div>
                    <span>Offline Meeting</span>
                </div>
            </div>
        </div>
     );
}
 
export default MeetType;