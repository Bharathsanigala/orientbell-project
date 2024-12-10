import './offline-meet.styles.scss';
import Avatar from 'boring-avatars';
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPen,FaTrash,FaPlus,FaLocationDot } from "react-icons/fa6";
import EditMeetingRoomDialog from '../../components/edit-meeting-room-dialog/edit-meeting-room-dialog.component';
import DeleteMeetingRoomDialog from '../../components/delete-meeting-room-dialog/delete-meeting-room-dialog.component';
import AddMeetingRoomDialog from '../../components/add-meeting-room-dialog/add-meeting-room-dialog.component';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar.component';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader.component';
import DbErrorImage from '../../assets/db-error.svg'
import EmptyMeetingRoomsImg from '../../assets/empty.svg';
import {useAuthContext} from '../../contexts/auth-context.context';
import NoAuthDialog from '../../components/no-auth-dialog/no-auth-dialog.component';
import { useUserRoleContext } from '../../contexts/user-role.context';
import { useMeetingRoomsContext } from '../../contexts/meeting-rooms.context';


const OfflineMeet = () => {

    const {user}=useAuthContext();
    const [isEditMeetingDialogOpen,setIsEditMeetingDialogOpen]=useState(false);
    const [isDeleteMeetingDialogOpen,setIsDeleteMeetingDialogOpen]=useState(false);
    const [isAddMeetingDialogOpen,setIsAddMeetingDialogOpen]=useState(false);
    const [roomName,setRoomName]=useState('');
    const [roomLocation,setRoomLocation]=useState('');
    const [roomCapacity,setRoomCapacity]=useState('');
    const navigateRouter = useNavigate();
    const [roomId,setRoomId]=useState('');
    const [roomItems,setRoomItems]=useState([]);
    const [isNoAuthDialogOpen,setIsNoAuthDialogOpen]=useState(false);
    const {fetchedUserRoleData}=useUserRoleContext();
    const {offlineMeetingsArray,isMeetingRoomsLoading,isDbErrorOccured}=useMeetingRoomsContext();
    const [filteredMeetingRoomData,setFilteredMeetingRoomData]=useState(offlineMeetingsArray);
    
    useEffect(()=>{
        setFilteredMeetingRoomData(offlineMeetingsArray)
    },[offlineMeetingsArray])

    const handleFilterData=(val)=>{
        setFilteredMeetingRoomData(offlineMeetingsArray.filter(obj=>obj.meetingRoomName?.toLowerCase()?.startsWith(val.toLowerCase())))
    }

    if(isDbErrorOccured){
        return <div className='db-error-class'>
            <img src={DbErrorImage} />
            <span>Error ocuured while fetching data! Try again later.</span>
        </div>
    }

    if(isMeetingRoomsLoading){
        return <div className='loader-class'>
            <Loader lh={'100px'} lw={'100px'} />
            <p>loading meeting rooms</p>
        </div>
    }

    return ( 
        <div className="offline-meet-div">
            <h1>Offline Meetings</h1>
            <div className='search-bar-container'>
            {offlineMeetingsArray.length>0 && <SearchBar handleFilterData={handleFilterData} />}
            {fetchedUserRoleData?.fetchedUserRole === 'admin' && <div className='adm-add-meet button-box-shadow' onClick={()=>setIsAddMeetingDialogOpen(true)}> <FaPlus/></div>}
            </div>
            {offlineMeetingsArray.length ? <div className='container'>
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
                              setRoomId(obj.key)
                              setIsDeleteMeetingDialogOpen(true)  
                            }} >
                            <FaTrash />
                            </div>
                            <div className='button-box-shadow' onClick={()=>{
                                setRoomName(obj.meetingRoomName)
                                setRoomLocation(obj.location)
                                setRoomCapacity(obj.capacity)
                                setRoomId(obj.key)
                                setRoomItems(obj.itemArray)
                                setIsEditMeetingDialogOpen(true)
                            }}>
                            <FaPen />
                            </div>
                         </div>}
                    </div>
                })}
            </div> : <div className='db-error-class'>
            <img src={EmptyMeetingRoomsImg} />
            <span>No meetings available yet! contact admin.</span>
            </div>}
            { isEditMeetingDialogOpen && <EditMeetingRoomDialog roomName={roomName} roomCapacity={roomCapacity} roomLocation={roomLocation}  setIsEditMeetingDialogOpen={setIsEditMeetingDialogOpen} roomId={roomId} roomItems={roomItems} />}
            {isDeleteMeetingDialogOpen && <DeleteMeetingRoomDialog roomName={roomName} setIsDeleteMeetingDialogOpen={setIsDeleteMeetingDialogOpen} roomId={roomId} />}
            {isAddMeetingDialogOpen && <AddMeetingRoomDialog setIsAddMeetingDialogOpen={setIsAddMeetingDialogOpen} />}
            {isNoAuthDialogOpen && <NoAuthDialog setIsNoAuthDialogOpen={setIsNoAuthDialogOpen} />}
        </div>
     );
}
 
export default OfflineMeet;