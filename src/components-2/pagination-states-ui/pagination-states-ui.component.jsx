import PropTypes from 'prop-types';
import './pagination-states-ui.styles.scss';
import { FaCloudDownloadAlt } from "react-icons/fa";
import PaginationLoader from '../pagination-loader/pagination-loader.component';
import { FaTriangleExclamation } from "react-icons/fa6";

const PaginationStatesUi = ({paginationState,loadMoreUserBookings}) => {
    const renderUI =()=>{
        if(paginationState === 'idle')
            return  <div className='button-box-shadow load-more' onClick={loadMoreUserBookings}><FaCloudDownloadAlt />Load more </div>
        if(paginationState === 'loading')
            return <PaginationLoader/>
        if(paginationState === 'error')
            return <p className='error-msg text-center'> <FaTriangleExclamation/> error</p>
    }

    return ( 
        <div className='pagination-states-ui-div'>
            {renderUI()}
        </div>
     );
}
PaginationStatesUi.propTypes={
    paginationState:PropTypes.string,
    loadMoreUserBookings:PropTypes.func,
}
export default PaginationStatesUi;