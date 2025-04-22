import './plans.styles.scss'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

const Plans = () => {
    return ( 
        <div className='plans-div'>
            <h1 className='plans-title'>Choose Your Plan</h1>
            <div className='plans-container'>
                <div className='plan-card'>
                    <h2 className='plan-name'>Spark</h2>
                    <div className='plan-price'>
                        <span className='price'>$99</span>
                        <span className='period'>/month</span>
                    </div>
                    <ul className='features-list'>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Offline Meeting Room Booking</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Create, Modify & Delete Rooms</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Room Details Management</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>4 Daily Booking Slots</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Booking Cancellation</span>
                        </li>
                        <li>
                            <FaCircleXmark className='feature-icon xmark' />
                            <span>Online Meeting Integration</span>
                        </li>
                        <li>
                            <FaCircleXmark className='feature-icon xmark' />
                            <span>Video Conferencing</span>
                        </li>
                    </ul>
                    <button className='select-plan-btn'>Select Plan</button>
                </div>

                <div className='plan-card featured'>
                    <div className='featured-badge'>Most Popular</div>
                    <h2 className='plan-name'>Blaze</h2>
                    <div className='plan-price'>
                        <span className='price'>$149</span>
                        <span className='period'>/month</span>
                    </div>
                    <ul className='features-list'>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>All Spark Features</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Online Meeting Integration</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Google Meet & Zoom Integration</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Hybrid Meeting Support</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Advanced Room Analytics</span>
                        </li>
                        <li>
                            <FaCircleCheck className='feature-icon check' />
                            <span>Priority Support</span>
                        </li>
                    </ul>
                    <button className='select-plan-btn featured-btn'>Select Plan</button>
                </div>
            </div>
        </div>
     );
}
 
export default Plans;