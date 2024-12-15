import PropTypes from 'prop-types';
import './sorters.styles.scss';
import { FaSortAmountUp,FaSortAmountDown } from "react-icons/fa";

const Sorters = ({label,myMeetingsDataArray,setMyMeetingsDataArray,type}) => {

    const sortMeetings = (direction) => {
        const sortedArray = [...myMeetingsDataArray].sort((a, b) => {
            let aDate, bDate;
            if (type === 'bookedAt') {
                aDate = new Date(a.bookedAt.toDate().toLocaleString());
                bDate = new Date(b.bookedAt.toDate().toLocaleString());
            } else if (type === 'bookedDate') {
                aDate = new Date(`${a.bookedDate.split('-')[0]}, ${a.bookedSlot.split('AM')[0]}`);
                bDate = new Date(`${b.bookedDate.split('-')[0]}, ${b.bookedSlot.split('AM')[0]}`);
            }
            return direction === 'asc' ? aDate - bDate : bDate - aDate;
        });
        setMyMeetingsDataArray(sortedArray);
    };

    return ( 
        <div className='sorters-div '>
                <p className='text-center'>{label}</p>
                <div className='opts'>
                    <div className='button-box-shadow' onClick={()=>sortMeetings('asc')}>
                    <FaSortAmountUp/> ASC
                    </div>
                    <div className='button-box-shadow' onClick={()=>sortMeetings('desc')}>
                        <FaSortAmountDown/> DESC
                    </div>
                </div>
        </div>
     );
}
Sorters.propTypes={
    label:PropTypes.string,
    myMeetingsDataArray:PropTypes.array,
    setMyMeetingsDataArray:PropTypes.func,
    type:PropTypes.string,
}
export default Sorters;