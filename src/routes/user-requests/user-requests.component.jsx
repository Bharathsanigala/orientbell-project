import './user-requests.styles.scss';
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const UserRequests = () => {

    const mockArray = [{requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'1s'},
        {requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'2s'},
    {requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'3s'},{requesterName:'vishwaradhya',requesterEmail:'vishuvishwa735@gmail.com',requestedTime:'Sun, 08 Dec 2024 11:57:06',key:'4s'}]

    return ( 
        <div className='user-requests-div adm-div'>
            <h2>User Requests</h2>
            <p className='text-center'>User access elevation requests are shown here</p>
            <div className='container'>
                {mockArray.map(obj=>{
                    return <div key={obj.key} className='tile main-box-shadow'>
                        <div className='main'>
                            <div>
                                <span>name</span>
                                <p>{obj.requesterName}</p>
                            </div>
                            <div>
                                <span>email</span>
                                <p>{obj.requesterEmail}</p>
                            </div>
                            <div>
                                <span>request time</span>
                                <p>{obj.requestedTime}</p>
                            </div>
                        </div>
                        <div className='btn-wrapper'>
                            <div className='button-box-shadow' style={{color:'red'}} ><FaXmark/> </div>
                            <div className='button-box-shadow' style={{color:'green'}}><FaCheck/></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default UserRequests;