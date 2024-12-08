import './admin-space.styles.scss';
import { useNavigate, Outlet } from 'react-router-dom';


const AdminSpace = () => {

    const navigateRouter = useNavigate();

    return ( 
        <div className='admin-space-div'>
            <h1>Admin Space</h1>
            <div className='container'>
                <div className='nav'>
                        <div className='button-box-shadow' onClick={()=>navigateRouter('/admin-space/user-requests')} >users requests</div>
                        <div className='button-box-shadow' onClick={()=>navigateRouter('/admin-space/search-users')} >search users</div>
                        <div className='button-box-shadow' onClick={()=>navigateRouter('/admin-space/admin-settings')}>settings</div>
                </div>
                <div className='main'>
                    <Outlet/>
                </div>
            </div>
        </div>
     );
}
 
export default AdminSpace;