import './loader.styles.scss';
import PropTypes from 'prop-types';
const Loader = ({lh,lw}) => {
    return ( 
        <span className='loader-div' style={{width:lw,height:lh}}></span>
     );
}
Loader.propTypes={
    lh:PropTypes.string,
    lw:PropTypes.string,
}
export default Loader;