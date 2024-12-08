import './search-users.styles.scss';
import { FaUsersCog } from "react-icons/fa";
import { FaCircleArrowUp,FaCircleArrowDown } from "react-icons/fa6";

const SearchUsers = () => {

    const mockUser={name:'vishwaradhya',email:'vishuvishwa735@gmail.com',role:'reader'}

    return ( 
        <div className='search-users-div adm-div'>
            <h2>Search Users</h2>
            <p className='text-center'>Search users by their email and change their access levels</p>
            <div className='container'>
                <div className='avatar '>
                    <FaUsersCog/>
                </div>
                <input className='n-input' placeholder='email' type='email' />
                <div className='button-box-shadow btn' >search</div>
                <div className='main'>
                    <span>User Details</span>
                    <div>
                        <span>name</span>
                        <p>{mockUser.name}</p>
                    </div>
                    <div>
                        <span>email</span>
                        <p>{mockUser.email}</p>
                    </div>
                    <div>
                        <span>role</span>
                        <p>{mockUser.role}</p>
                    </div>
                    <div className='btn-wrapper'>
                        <div className='button-box-shadow'> <FaCircleArrowUp/> increase access</div>
                        <div className='button-box-shadow'> <FaCircleArrowDown/> decrease access</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SearchUsers;