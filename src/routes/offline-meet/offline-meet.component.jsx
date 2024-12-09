import './offline-meet.styles.scss';
import Avatar from 'boring-avatars';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPen,FaTrash,FaPlus,FaLocationDot } from "react-icons/fa6";
import EditMeetingRoomDialog from '../../components/edit-meeting-room-dialog/edit-meeting-room-dialog.component';
import DeleteMeetingRoomDialog from '../../components/delete-meeting-room-dialog/delete-meeting-room-dialog.component';
import AddMeetingRoomDialog from '../../components/add-meeting-room-dialog/add-meeting-room-dialog.component';
import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar.component';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader.component';
import DbErrorImage from '../../assets/db-error.svg'
import EmptyMeetingRoomsImg from '../../assets/empty.svg';
import {useAuthContext} from '../../contexts/auth-context.context';
import NoAuthDialog from '../../components/no-auth-dialog/no-auth-dialog.component';
import { useUserRoleContext } from '../../contexts/user-role.context';


const OfflineMeet = () => {

    const mockArray = [{key:1,meetingRoomName:'test meeting room 1',capacity:50,location:'top floor east wing 12'},{key:2,meetingRoomName:'test meeting room 2',capacity:50,location:'top floor east wing 21'},{key:3,meetingRoomName:'new meeting room 1',capacity:50,location:'top floor east wing 112'},{key:4,meetingRoomName:'test meeting room 1',capacity:50,location:'top floor east wing 22'}]
    const {user}=useAuthContext();
    const [isEditMeetingDialogOpen,setIsEditMeetingDialogOpen]=useState(false);
    const [isDeleteMeetingDialogOpen,setIsDeleteMeetingDialogOpen]=useState(false);
    const [isAddMeetingDialogOpen,setIsAddMeetingDialogOpen]=useState(false);
    const [roomName,setRoomName]=useState('');
    const [roomLocation,setRoomLocation]=useState('');
    const [roomCapacity,setRoomCapacity]=useState('');
    const [filteredMeetingRoomData,setFilteredMeetingRoomData]=useState(mockArray);
    const navigateRouter = useNavigate();
    const [offlineMeetingsArray,setOfflineMeetingsArray]=useState([2]);
    const [isDbErrorOccured,setIsDbErrorOccured]=useState(false);
    const [isNoAuthDialogOpen,setIsNoAuthDialogOpen]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const {fetchedUserRoleData}=useUserRoleContext();


    const handleFilterData=(val)=>{
        setFilteredMeetingRoomData(mockArray.filter(obj=>obj.meetingRoomName?.toLowerCase()?.includes(val.toLowerCase())))
    }

    if(isDbErrorOccured){
        return <div className='db-error-class'>
            <img src={DbErrorImage} />
            <span>Error ocuured while fetching data! Try again later.</span>
        </div>
    }

    if(!offlineMeetingsArray.length){
        return <div className='db-error-class'>
            <img src={EmptyMeetingRoomsImg} />
            <span>No meetings available yet! contact admin.</span>
        </div>
    }

    if(isLoading){
        return <div className='loader-class'>
            <Loader lh={'100px'} lw={'100px'} />
            <p>loading meeting rooms</p>
        </div>
    }

    return ( 
        <div className="offline-meet-div">
            <h1>Offline Meetings</h1>
            <div className='search-bar-container'>
            <SearchBar handleFilterData={handleFilterData} />
            {fetchedUserRoleData?.fetchedUserRole === 'admin' && <div className='adm-add-meet button-box-shadow' onClick={()=>setIsAddMeetingDialogOpen(true)}> <FaPlus/></div>}
            </div>
            <div className='container'>
                {filteredMeetingRoomData.map(obj=>{
                    return <div className='tile main-box-shadow' key={obj.key}>
                        <div className='avatar-container'>
                        <Avatar name={`meet-room-tile-${obj.key}`} variant='marble' size={'100%'} onClick={()=>{
                            if(user){
                            navigateRouter(`/book-offline-meet/${obj.meetingRoomName}^-^${obj.key}`)
                            }else{
                                setIsNoAuthDialogOpen(true)
                            }
                        }}  className='avatar-main' square />
                        </div>
                        <p>{obj.meetingRoomName}</p>
                        <span> <FaLocationDot/> {obj.location}</span>
                        <span> <BsFillPeopleFill/> capacity : {obj.capacity}</span>
                        {fetchedUserRoleData?.fetchedUserRole === 'admin' && <div className='admin-options '>
                            <div className='button-box-shadow' onClick={()=>{
                              setRoomName(obj.meetingRoomName)
                              setIsDeleteMeetingDialogOpen(true)  
                            }} >
                            <FaTrash />
                            </div>
                            <div className='button-box-shadow' onClick={()=>{
                                setRoomName(obj.meetingRoomName)
                                setRoomLocation(obj.location)
                                setRoomCapacity(obj.capacity)
                                setIsEditMeetingDialogOpen(true)
                            }}>
                            <FaPen />
                            </div>
                         </div>}
                    </div>
                })}
            </div>
            { isEditMeetingDialogOpen && <EditMeetingRoomDialog roomName={roomName} roomCapacity={roomCapacity} roomLocation={roomLocation}  setIsEditMeetingDialogOpen={setIsEditMeetingDialogOpen} />}
            {isDeleteMeetingDialogOpen && <DeleteMeetingRoomDialog roomName={roomName} setIsDeleteMeetingDialogOpen={setIsDeleteMeetingDialogOpen} />}
            {isAddMeetingDialogOpen && <AddMeetingRoomDialog setIsAddMeetingDialogOpen={setIsAddMeetingDialogOpen} />}
            {isNoAuthDialogOpen && <NoAuthDialog setIsNoAuthDialogOpen={setIsNoAuthDialogOpen} />}
        </div>
     );
}
 
export default OfflineMeet;