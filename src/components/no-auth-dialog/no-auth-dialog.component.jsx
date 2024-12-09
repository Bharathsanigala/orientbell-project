import './no-auth-dialog.styles.scss';
import UnAuthImage from '../../assets/auth-now.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';
import LoadingImage from '../../components/loading-image/loading-image.component'

const NoAuthDialog = ({setIsNoAuthDialogOpen}) => {
    const navigateROuter = useNavigate();
    return ( 
        <div className='overlaying'>
            <div className='no-auth-dialog-div'>
            <div className='close-mark'>
                <FaXmark onClick={()=>setIsNoAuthDialogOpen(false)} />
            </div>
            <LoadingImage imgSrc={UnAuthImage} imgWidth={'90%'} />
            <div onClick={()=>navigateROuter('/user')} className='button-box-shadow btn'>Signin Now</div>
        </div>
        </div>
     );
}
NoAuthDialog.propTypes={
    setIsNoAuthDialogOpen:PropTypes.func,
}
export default NoAuthDialog;