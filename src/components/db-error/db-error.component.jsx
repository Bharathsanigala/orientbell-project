import DbErrorImage from '../../assets/db-error.svg';
const DbError = () => {
    return ( 
        <div className='db-error-class'>
            <img src={DbErrorImage} />
            <span>Error ocuured while fetching data! Try again later.</span>
        </div>
     );
}
export default DbError;