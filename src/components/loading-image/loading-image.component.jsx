import {  useState } from 'react';
import './loading-image.styles.scss';
import PropTypes from 'prop-types';
import Loader from '../../components/loader/loader.component';

const LoadingImage = ({imgSrc,imgWidth}) => {

    const [isImgLoaded,setIsImgLoaded]=useState(false);
    
    return ( 
        <div className='loading-image-div'>
            {!isImgLoaded && <Loader lh={'48px'} lw={'48px'} />}
            <img src={imgSrc} width={imgWidth} onLoad={() => setIsImgLoaded(true)} style={{ display: isImgLoaded ? 'block' : 'none' }} />   
        </div>
     );
}
LoadingImage.propTypes={
    imgSrc:PropTypes.string,
    imgWidth:PropTypes.string,
}
export default LoadingImage;