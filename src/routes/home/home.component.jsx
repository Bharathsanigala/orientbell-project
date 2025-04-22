import './home.styles.scss';
import HomeSvg from '../../assets/home-svg.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const router = useNavigate();
    return ( 
        <div className="home-div">
            <div className='content'>
                <h1>Book Meeting Rooms Effortlessly</h1>
                <p>
                Tired of double bookings and scheduling conflicts? Our Meeting Room Booking App offers a seamless way to reserve rooms by selecting an available time slot on your chosen day. With a clean, intuitive interface, users can effortlessly manage their bookings without the need for back-and-forth communication or spreadsheets.
Whether youre planning a quick team catch-up or a full-day strategy session, the platform ensures clear visibility of room availability and instant confirmation. Designed for offices, co-working spaces, and educational institutions, it helps teams stay organized and productive with zero hassle.
                </p>
                <div className='btns'>
                <button className='blu-btn' onClick={()=>router('meet-type')}>Book meetings</button>
                <button className='blu-btn'>Board</button>
                <button className='blu-btn' onClick={()=>router('plans')}>Plans</button>
                </div>
            </div>
            <div className='img'>
                <img src={HomeSvg} width={"75%"} />
            </div>
        </div>
     );
}
 
export default Home;