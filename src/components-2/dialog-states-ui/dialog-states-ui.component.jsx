import PropTypes from "prop-types";
import { Fragment } from "react";
import Loader from "../../components/loader/loader.component";
import { FcDeleteDatabase,FcFullTrash } from "react-icons/fc";
import { FaCircleCheck } from "react-icons/fa6";

const DialogStatesUi = ({state,loadingMessage,successMessage,dialogCloser,dialogType}) => {
    
    const renderSvg=()=>{
        if(state === 'loading')
            return <Loader lw={'80px'} lh={'80px'} />
        if(state === 'error')
            return <FcDeleteDatabase className='svg-img' />
        if(state === 'success'){
            if(dialogType === 'dmbd')
                return <FcFullTrash className='svg-img animate__animated animate__bounceIn' />
            if(dialogType === 'cmd')
                return <FaCircleCheck className='svg-img animate__animated animate__bounceIn' style={{color:'green'}} />
        }
        return null;
    }

    const renderMessage =()=>{
        if(state === 'loading')
            return loadingMessage;
        if(state === 'success')
            return successMessage;
        if(state === 'error')
            return 'Error occured. Please Try Later!';
        return null;
    }

    return ( 
        <Fragment>
             {state!=='idle' && <div className= "b-loading">
                {renderSvg()}
                 <p className="text-center">{renderMessage()}</p>
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