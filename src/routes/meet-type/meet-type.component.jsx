import './meet-type.styles.scss';
import OnlineMeetingImg from '../../assets/online-meeting.png';
import OfflineMeetingImg from '../../assets/offline-meeting.png';
import 'animate.css'
import { useNavigate } from 'react-router-dom';
import LoadingImage from '../../components/loading-image/loading-image.component';

const MeetType = () => {

    const navigateRouter = useNavigate();

    return ( 
        <div className="meet-type-div">
            <h1>Meeting Type</h1>
            <div className="main">
                <div className='tile animate__animated ' onClick={()=>navigateRouter('/online-meet')}>
                    <LoadingImage imgSrc={OnlineMeetingImg} imgWidth={'85%'} />
                    <span>Online Meeting</span>
                </div>
                <div className='tile animate__animated ' onClick={()=>navigateRouter('/offline-meet')}>
                <LoadingImage imgSrc={OfflineMeetingImg} imgWidth={'85%'} />
                    <span>Offline Meeting</span>
                </div>
            </div>
        </div>
     );
}
 
export default MeetType;