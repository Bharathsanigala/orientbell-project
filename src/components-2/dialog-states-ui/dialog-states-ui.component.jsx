import PropTypes from "prop-types";
import { Fragment } from "react";
import Loader from "../../components/loader/loader.component";
import { FcDeleteDatabase,FcFullTrash } from "react-icons/fc";
import { FaCircleCheck } from "react-icons/fa6";

const DialogStatesUi = ({state,loadingMessage,successMessage,dialogCloser,dialogType}) => {
    return ( 
        <Fragment>
            {state === 'loading' && <div className='b-loading'>
            <Loader lw={'80px'} lh={'80px'} />
            <p className='text-center'>{loadingMessage}</p>
            </div>}
            {state === 'error' && <div className='b-loading'>
                <FcDeleteDatabase className='svg-img' />
                <p className='text-center'>Error occured. Please Try Later!</p>
            </div>}
            {state === 'success' && <div className='b-loading'>
                {dialogType==='dmbd' && <FcFullTrash className='svg-img animate__animated animate__bounceIn' />}
                {dialogType==='cmd'  && <FaCircleCheck className='svg-img animate__animated animate__bounceIn' style={{color:'green'}} />}
                <p className='text-center'>{successMessage}</p>
            </div>}
            {(state === 'error' || state === 'success') && <div className='button-box-shadow close-btn' onClick={()=>dialogCloser(false)}>close</div>}
        </Fragment>
     );
}
DialogStatesUi.propTypes={
    state:PropTypes.string,
    loadingMessage:PropTypes.string,
    successMessage:PropTypes.string,
    dialogCloser:PropTypes.func,
    dialogType:PropTypes.string,
}
export default DialogStatesUi;