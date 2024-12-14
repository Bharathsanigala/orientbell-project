import PropTypes from 'prop-types';
import './slots-picker.styles.scss';

const SlotsPicker = ({currentSlot,handleSlotClick}) => {
    const slotNamesArray =  ['9:00 AM - 11:00 AM','11:00 AM - 01:00 PM','03:00 PM - 05:00 PM','05:00 PM - 07:00 PM']

    return ( 
        <div className='slots-picker-div'>
            {slotNamesArray.map((slotName,index)=>{
                return <div key={`slot-name-divs-${index}`} style={{backgroundColor:currentSlot===slotName ?'rgb(72,139,255)':'',color:currentSlot===slotName ? 'ghostwhite':''}} onClick={()=>handleSlotClick(slotName)} >
                    <span>{`slot ${index+1}`}</span>
                    <span>{slotName}</span>
                </div>
            })}
            </div>
     );
}
SlotsPicker.propTypes={
    currentSlot:PropTypes.string,
    handleSlotClick:PropTypes.func,
}
export default SlotsPicker;