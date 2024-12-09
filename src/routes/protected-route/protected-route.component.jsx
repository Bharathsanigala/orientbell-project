import './protected-route.styles.scss';
import AdminSpace from '../../components/admin-space/admin-space.component';
import UnAuthorized from '../../components/un-authorized/un-authorized.component';
import { useUserRoleContext } from '../../contexts/user-role.context';

const ProtectedRoute = () => {
    
    const {fetchedUserRoleData}=useUserRoleContext();

    return fetchedUserRoleData?.fetchedUserRole === 'admin' ? <AdminSpace/> : <UnAuthorized/>
}
 
export default ProtectedRoute;