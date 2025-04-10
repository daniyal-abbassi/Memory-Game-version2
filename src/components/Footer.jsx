import MabelInfo from "./MobellInfo";
import { ReactComponent as Volume } from "../assets/img/volume.svg";
import { ReactComponent as VolumeOff } from "../assets/img/volume_off.svg";
import { ReactComponent as Music } from "../assets/img/music_sign.svg";
import { ReactComponent as MusicOff } from "../assets/img/music_off.svg";
import { ReactComponent as QuestionMark } from "../assets/img/question_mark.svg";
import { ReactComponent as Cross } from "../assets/img/cross.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../styles/converted_footer.css";

export default function Footer({
  isMusicPlaying,
  setIsMusicPlaying,
  isSoundPlaying,
  setIsSoundPlaying,
  playClickSound,
}) {
  const [isInfoNeeded, setIsInfoNeeded] = useState(false);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="footerContainer">
        <div className="soundSection">
          <button
            onClick={() => {
              setIsSoundPlaying(!isSoundPlaying);
              playClickSound();
            }}
          >
            {isSoundPlaying ? (
              <Volume className="svg" />
            ) : (
              <VolumeOff className="svg" />
            )}
          </button>
          <button
            onClick={() => {
              setIsMusicPlaying(!isMusicPlaying);
              playClickSound();
            }}
          >
            {isMusicPlaying ? (
              <Music className="svg" />
            ) : (
              <MusicOff className="svg" />
            )}
          </button>
        </div>
        <button
          onClick={() => {
            setIsInfoNeeded(!isInfoNeeded);
            playClickSound();
          }}
        >
          {isInfoNeeded ? (
            <Cross className="svg" />
          ) : (
            <QuestionMark className="svg" />
          )}
        </button>
        <AnimatePresence>{isInfoNeeded && <MabelInfo />}</AnimatePresence>
      </div>
    </motion.footer>
  );
}
