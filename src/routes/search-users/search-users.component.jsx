import './search-users.styles.scss';
import { FaUsersCog } from "react-icons/fa";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import { useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {firestoreDatabase} from '../../utils/firebase/firebase.js';

const SearchUsers = () => {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cancellingBookingId, setCancellingBookingId] = useState(null);
    const [updatingAccess, setUpdatingAccess] = useState(false);
    
    const handleSearch = async () => {
        setLoading(true);
        try {
            const usersRef = collection(firestoreDatabase, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const uid = userDoc.id;
                const user = { id: uid, ...userDoc.data() };
                setUserData(user);

                const bookingsRef = collection(firestoreDatabase, 'userBookings', uid, 'bookings');
                const bookingsSnapshot = await getDocs(bookingsRef);
                const userBookings = bookingsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBookings(userBookings);
            } else {
                setUserData(null);
                setBookings([]);
                alert('No user found with this email');
            }
        } catch (error) {
            console.error('Error searching user:', error);
            alert('Error searching user');
        }
        setLoading(false);
    };

    const handleCancelBooking = async (bookingId, userId) => {
        if (!userId || !bookingId) return;
        
        setCancellingBookingId(bookingId);
        try {
            // Delete the booking document from Firestore
            const bookingRef = doc(firestoreDatabase, 'userBookings', userId, 'bookings', bookingId);
            await deleteDoc(bookingRef);
            
            // Update the UI by removing the cancelled booking
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
            
            alert('Booking cancelled successfully');
        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('Failed to cancel booking');
        } finally {
            setCancellingBookingId(null);
        }
    };

    const handleIncreaseAccess = async () => {
        if (!userData || !userData.id || userData.role === 'writer') return;
        
        setUpdatingAccess(true);
        try {
            const userRef = doc(firestoreDatabase, 'users', userData.id);
            await updateDoc(userRef, {
                role: 'writer'
            });
            
            setUserData({
                ...userData,
                role: 'writer'
            });
            
            alert('User access upgraded to writer');
        } catch (error) {
            console.error('Error increasing access:', error);
            alert('Failed to increase access');
        } finally {
            setUpdatingAccess(false);
        }
    };
    
    const handleDecreaseAccess = async () => {
        if (!userData || !userData.id || userData.role === 'reader') return;
        
        setUpdatingAccess(true);
        try {
            const userRef = doc(firestoreDatabase, 'users', userData.id);
            await updateDoc(userRef, {
                role: 'reader'
            });
            
            setUserData({
                ...userData,
                role: 'reader'
            });
            
            alert('User access downgraded to reader');
        } catch (error) {
            console.error('Error decreasing access:', error);
            alert('Failed to decrease access');
        } finally {
            setUpdatingAccess(false);
        }
    };

    return (
        <div className='search-users-div adm-div'>
            <h2>Search Users</h2>
            <p className='text-center'>Search users by their email and change their access levels</p>
            
            <div className='search-section'>
                <div className='avatar'>
                    <FaUsersCog />
                </div>
                <input 
                    className='n-input' 
                    placeholder='email' 
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='button-box-shadow btn' onClick={handleSearch}>
                    {loading ? 'Searching...' : 'Search'}
                </div>
            </div>

            <div className='containers-wrapper'>
                <div className='user-details-container'>
                    {userData ? (
                        <div className='main'>
                            <span>User Details</span>
                            <div>
                                <span>name</span>
                                <p>{userData.name}</p>
                            </div>
                            <div>
                                <span>email</span>
                                <p>{userData.email}</p>
                            </div>
                            <div>
                                <span>role</span>
                                <p>{userData.role}</p>
                            </div>
                            <div className='btn-wrapper'>
                                <div 
                                    className={`button-box-shadow ${userData.role === 'writer' ? 'disabled' : ''}`}
                                    onClick={handleIncreaseAccess}
                                    style={{ opacity: userData.role === 'writer' || updatingAccess ? 0.6 : 1, cursor: userData.role === 'writer' || updatingAccess ? 'not-allowed' : 'pointer' }}
                                > 
                                    <FaCircleArrowUp /> 
                                    {updatingAccess && userData.role === 'reader' ? 'Updating...' : 'increase access'}
                                </div>
                                <div 
                                    className={`button-box-shadow ${userData.role === 'reader' ? 'disabled' : ''}`}
                                    onClick={handleDecreaseAccess}
                                    style={{ opacity: userData.role === 'reader' || updatingAccess ? 0.6 : 1, cursor: userData.role === 'reader' || updatingAccess ? 'not-allowed' : 'pointer' }}
                                > 
                                    <FaCircleArrowDown /> 
                                    {updatingAccess && userData.role === 'writer' ? 'Updating...' : 'decrease access'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='no-user-message'>
                            <p>Search for a user to see details</p>
                        </div>
                    )}
                </div>

                <div className='bookings-container'>
                    <h3>User Bookings</h3>
                    {userData ? (
                        bookings.length > 0 ? (
                            <div className='bookings-grid'>
                                {bookings.map(booking => (
                                    <div key={booking.id} className='booking-tile'>
                                        <div className='booking-details'>
                                            <p><strong>Room:</strong> {booking.bookedMeetingRoomName}</p>
                                            <p><strong>Date:</strong> {booking.bookedDate ? new Date(booking.bookedDate.seconds * 1000).toLocaleDateString() : 'N/A'}</p>
                                            <p><strong>Slot:</strong> {booking.bookedSlot}</p>
                                        </div>
                                        <button 
                                            className='cancel-booking-btn'
                                            onClick={() => handleCancelBooking(booking.id, userData.id)}
                                            disabled={cancellingBookingId === booking.id}
                                        >
                                            {cancellingBookingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='no-bookings-message'>
                                <p>No bookings found for this user</p>
                            </div>
                        )
                    ) : (
                        <div className='no-bookings-message'>
                            <p>Search for a user to see bookings</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchUsers;