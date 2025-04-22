import { useEffect, useState } from 'react';
import './user-requests.styles.scss';
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import DbError from '../../components/db-error/db-error.component';
import Loader from '../../components/loader/loader.component';
import EmptyMeetingRoomsImg from '../../assets/empty.svg';
import { realtimeDatabase,firestoreDatabase } from '../../utils/firebase/firebase';
import { ref,onValue,off, remove } from 'firebase/database';
import { MdBlock } from "react-icons/md";
import { deleteField, doc, updateDoc } from 'firebase/firestore';

const UserRequests = () => {
    const [dataArray,setDataArray]=useState([]);
    const [dataState,setDataState]=useState('loading'); //loading,error,empty

    const removeUserRequest=async(userId)=>{
        try{
            const requestRef = ref(realtimeDatabase,`userWriterRequests/${userId}`);
            await remove(requestRef)
            return true
        }catch(e){
            console.error(e)
            return false
        }
    }

    const handleRequestReject=async(userId)=>{
        if(removeUserRequest(userId)){
            await updateDoc(doc(firestoreDatabase,'users',userId),{
                writerAccessStatus:deleteField(),
            })
        }
    }
    const handleRequestAccept=async(userId)=>{
        if(removeUserRequest(userId)){
            await updateDoc(doc(firestoreDatabase,'users',userId),{
                writerAccessStatus:deleteField(),
                role:'writer'
            })
        }
    }
    const handleRequestBlock=async(userId)=>{
        alert('not implemented yet')
    }

    useEffect(()=>{
        const userRequestsRef = ref(realtimeDatabase,'userWriterRequests');
        try{
            onValue(userRequestsRef,snapshot=>{
                if(!snapshot.exists()){
                    setDataState('empty');
                }else{
                    const data=snapshot.val();
                    const requestsData = Object.entries(data).map(([requesterId,{requesterName,requesterEmail,requestedTime}])=>({requesterId,requesterEmail,requesterName,requestedTime}));
                    setDataArray(requestsData);
                    setDataState('')
                }
            })
        }catch(e){
            console.error(e)
            setDataState('error');
        }
        return ()=>off(userRequestsRef)
    },[])

    if(dataState==='loading'){
        return <div className='loader-class'>
                    <Loader lh={'100px'} lw={'100px'} />
                    <p>loading user requests</p>
                </div>
    }

    if(dataState === 'error') return <DbError/>
    if(dataState==='empty') return <div className='db-error-class'> <img src={EmptyMeetingRoomsImg} /><span>No user requests</span></div>


    return ( 
        <div className='user-requests-div adm-div'>
            <h2>User Requests</h2>
            <p className='text-center'>User access elevation requests are shown here (from readers)</p>
            <div className='container'>
                {dataArray.map(obj=>{
                    return <div key={obj.requesterId} className='tile main-box-shadow'>
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
                            <div className='button-box-shadow' style={{color:'red'}} title='reject request' onClick={()=>handleRequestReject(obj.requesterId)}><FaXmark/> </div>
                            <div className='button-box-shadow' style={{color:'gray'}} title='block requests' onClick={()=>handleRequestBlock(obj.requesterId)}><MdBlock/> </div>
                            <div className='button-box-shadow' style={{color:'green'}} title='accept request' onClick={()=>handleRequestAccept(obj.requesterId)}><FaCheck/></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
     );
}
 
export default UserRequests;