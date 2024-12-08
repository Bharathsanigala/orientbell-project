import './protected-route.styles.scss';
import AdminSpace from '../../components/admin-space/admin-space.component';
import UnAuthorized from '../../components/un-authorized/un-authorized.component';

const ProtectedRoute = () => {
    
    const role = 'admin'
    return role === 'admin' ? <AdminSpace/> : <UnAuthorized/>
}
 
export default ProtectedRoute;