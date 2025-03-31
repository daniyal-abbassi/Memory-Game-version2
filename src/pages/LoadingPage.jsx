import dipperRunning from '../assets/img/gojo.gif';
import '../styles/converted_loadingPage.css';

export default function LoadingPage() {
  return (
    <div className='loadingPage'>
        <img src={dipperRunning} alt='Running Dipper' />
        <p>Loading...</p>
    </div>
  )
}
