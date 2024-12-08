import './user-requests.styles.scss';

const UserRequests = () => {

    const mockArray = [{requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'1s'},
        {requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'2s'},
    {requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'3s'},{requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'4s'}]

    return ( 
        <div className='user-requests-div adm-div'>
            <h2>User Requests</h2>
            <div className='container'>
                {mockArray.map()}
            </div>
        </div>
     );
}
 
export default UserRequests;