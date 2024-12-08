import './un-authorized.styles.scss';
import unAuthImg from '../../assets/un-auth-route.svg'

const UnAuthorized = () => {
    return ( 
        <div className='un-authorized-div'>
            <div>
            <img src={unAuthImg} width={250} />
            <span>INSUFFICIENT ACCESS LEVEL</span>
            <span>  ACCESS RESTRICTED </span>
            </div>
        </div>
     );
}
 
export default UnAuthorized;