//IMPORTS
//motion : for animation
import { motion } from 'framer-motion';
//logo: for app logo
import logo from '../assets/img/jujutsu_kaisen_logo.png';
//style: for styling :)
import '../styles/converted_startPage.css';


//StartPage component: recieves: setDifficultyLevel and soundEffect proops
export default function StartPage({setDifficultyLevel,playClickSound}) {

    //define vaiants objuct for animation applying
    const variants = {
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {duration: 1.5}
      }
    }
  return (
    <>
      {/* set motion.img for logo animation applying plus its props */}
      <div className="startPage">
        <motion.img 
          src={logo} alt="logo"
          className='logo'

          variants={variants}
          initial='hidden'
          animate='visible'
        />
      {/* set animaion for headin text plust its related props*/}
        <motion.h1 
          variants={variants}
          initial='hidden'
          animate='visible'
        >
          Memory Game
        </motion.h1>
      {/* set motion.div for difficultyLevel component plus buttons */}
        <motion.div
          className='difficultyLevels'
          variants={variants}
          initial='hidden'
          animate='visible'
        >
          <button  onClick={()=>{
            setDifficultyLevel([5,3]);
            playClickSound();
          }}> Easy </button>

          <button onClick={()=>{
            setDifficultyLevel([7,4]);
            playClickSound();
          }}> Medium </button>

          <button onClick={()=>{
            setDifficultyLevel([10,5]);
            playClickSound();
          }}> Hard </button>
        </motion.div>
      </div>            
    </>
  )
}
