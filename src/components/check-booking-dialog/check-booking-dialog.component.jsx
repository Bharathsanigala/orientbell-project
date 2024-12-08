import './check-booking-dialog.styles.scss';
import { MdDownloading } from "react-icons/md";
import PropTypes from 'prop-types';

const CheckBookingDialog = ({currentDate,currentSlot,setIsCheckBookingDialogOpen}) => {
    return ( 
        <div className='overlaying'>
        <div className='check-booking-dialog-div'>
            <h3>Booked details</h3>
            <div className='avatar button-box-shadow'>
                <MdDownloading/>
            </div>
            <div className='details'>
                <div>
                    <span>name</span>
                    <p>N/A</p>
                </div>
                <div>
                    <span>email</span>
                    <p>N/A</p>
                </div>
                <div>
                    <span>date</span>
                    <p>{currentDate ? currentDate : 'N/A'}</p>
                </div>
                <div>
                    <span>slot</span>
                    <p>{currentSlot}</p>
                </div>
            </div>
            <div className='button-box-shadow close' onClick={()=>setIsCheckBookingDialogOpen(false)}>close</div>
        </div>
        </div>
     );
}
CheckBookingDialog.propTypes={
    currentDate:PropTypes.string,
    currentSlot:PropTypes.string,
    setIsCheckBookingDialogOpen:PropTypes.func,
}
export default CheckBookingDialog;