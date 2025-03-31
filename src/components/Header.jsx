import {motion} from 'framer-motion';
import logo from '../assets/img/jujutsu_kaisen_logo.png';

export default function Header({goBackToStartPage,playClickSound,score,bestScore}) {
  
  const variants = {
    hidden: {opacity: 0},
    visible: {
        
        opacity: 1,
        transition: {duration: 0.6}
    }
  }
    return (
    <header>
        <div className="headerContainer">
            <motion.img src={logo} alt='Logo' onClick={()=>{
                goBackToStartPage();
                playClickSound();
            }}
            variants={variants} initial='hidden' animate='visible' />
            <motion.div className='score' variants={variants} initial='hidden' animate='visible'>
                <div>Score: {score}</div>
                <div>Best Score: {bestScore}</div>
            </motion.div>
        </div>
    </header>
  )
}
