import PropTypes from 'prop-types';
import './about-booking-part.styles.scss';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegClock,FaRegCalendarMinus } from "react-icons/fa6";

const AboutBookingPart = ({roomName,meetingSlot,meetingDate}) => {
    return ( 
        <div className='about-booking-part-div'>
            <div>
                <SiGoogleclassroom/>
                <p>{roomName}</p>
            </div>
            <div>
                <FaRegCalendarMinus/>
                <p>{meetingDate}</p>
            </div>
            <div>
                <FaRegClock/>
                <p>{meetingSlot}</p>
            </div>
        </div>
     );
}
AboutBookingPart.propTypes={
    roomName:PropTypes.string,
    meetingSlot:PropTypes.string,
    meetingDate:PropTypes.string,
}
export default AboutBookingPart;