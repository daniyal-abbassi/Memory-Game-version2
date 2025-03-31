//IMPORTS
//import useState and UseEffent for managing state and side effect
import { useState, useEffect } from "react";
//import Loading page, shows a loading animation
import LoadingPage from "./pages/LoadingPage";

//import footer and header
import Footer from './components/Footer'
//import sound for controlling background sound
// import Sound from 'react-sound';
// import Sound from 'react-sound';
//import video for background video
import video from "./assets/img/gojo.mp4";
//import flipped sound for card flip sound
import flipSound from "./assets/sounds/flip.mp3";
import clickSound from "./assets/sounds/click.wav";
//import characters , which is our main data
import characters from "./characters";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
//import scss files
import './styles/converted_app.css';
function App() {
  //USE STATE HOOKs

  //a state for loading page to see if its over or not
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  //a state for background music , its playing or not
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  //a state for sound effects, disabled or not
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  //a state for difficulty level and relevent game parameters
  const [difficultyLevel, setDifficultyLevel] = useState([]);
  //a state for characters to play(for this round)
  const [charactersToPlayWith, setCharactersToPlayWith] = useState([]);
  //a state for which caracters sopposed to display
  const [charactersToDisplay, setCharactersToDisplay] = useState([]);
  //a state for current player score
  const [score, setScore] = useState(0);
  //a state for player best score
  const [bestScore, setBestScore] = useState(0);

  //USE EFFECT HOOK

  //useEffect hook for controlling delay of the loading page
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingOver(true);
    }, 3700);
  }, []);

  //FUNCTIONS

  //goBackToStartPage function
  const goBackToStartPage = () => {
    //will remove difficulty level
    setDifficultyLevel([]);
    //will resets the clicked state of each card
    charactersToPlayWith.forEach((character) => {
      character.clicked = false;
    }); //forEach section
  };

  //playFlipSound function
  const playFlipSound = () => {
    //check for if the soundEffect is enabled
    if (isSoundPlaying) {
      //create a new audio(flipSound)
      const audio = new Audio(flipSound);
      //set the volume of it
      audio.volume = 0.2;
      //play it
      audio.play();
    } //if soundPlaying
  }; //playFlipSound

  //playClickSound function(for clicking soundEffects)
  const playClickSound = () => {
    //if soundEffects are enabled
    if (isSoundPlaying) {
      //create anew audio
      const audio = new Audio(clickSound);
      //set its volume
      audio.volume = 0.07;
      //play it
      audio.play();
    } //if soundPlaying
  }; //playClickSound

  //getCharactersToPlayWith function: for selecting cards base on difficulty level
  const getCharactersToPlayWith = () => {
    //declare an array for future random cards
    let randomCharacters = [];
    //a while loop that checks for random cards length to be < desired number that we set for a specific difficulty level[0]
    while (randomCharacters.length < difficultyLevel[0]) {
      //declare a variable for  a random number between 0 and 9(total count for cards)
      const randomIndex = Math.floor(Math.random() * 10);
      //check if randomNumber index of characters array is already in the new random cards array
      if (!randomCharacters.includes(characters[randomIndex])) {
        //if not: push it to new cards array
        randomCharacters.push(characters[randomIndex]);
      } //if !randomCharacters.includes()
    } //while loop

    //update charactersToPlayWith array with new random cards array
    setCharactersToPlayWith(randomCharacters);
    //call the shuffle function for this characters array(for characters to dispay)
    shuffle(randomCharacters);
  }; //getCharactersToPlayWith

  //shuffle function: for shuffle the order of cards to be displayed
  const shuffle = (array) => {
    //initializes an array for storing new shuffle cards
    let shuffledArray = [];
    //initializes a variable to keep track of clicked cards
    let clickedCards = 0;
    //a while loop that checks for this new shuffle array length to be desired number that we set for a specific difficulty level
    while (shuffledArray.length < difficultyLevel[1]) {
      //generate a random number base on array.length
      const randomIndex = Math.floor(Math.random() * array.length);
      //get character at that random number index of array
      const character = array[randomIndex];
      //check if character is already in suffled aray and two more conditions related to clicked and difficulty level[1]
      if (
        !shuffledArray.includes(character) &&
        (clickedCards < difficultyLevel[1]-1 || !character.clicked)
      ) {
        //if condition is met, push character to shuffle array
        shuffledArray.push(character);
        //update clicked variable
        clickedCards += +character.clicked;
      } //if condition
      //updatea characterToDisplay with shuffle array
      setCharactersToDisplay(shuffledArray);
    } //while
  }; //shuffle

  //count score function: increment the player's score
  const countScore = () => {
    //increment score state by 1
    setScore(score + 1);
    //check if current score >= bestScore
    if (score >= bestScore) {
      //if true, update bestScore state by 1
      setBestScore(bestScore + 1);
    } // if condition
  }; // countScore

  //stateRoundResult function: for keep track of win,lose or continue result
  const stateRoundResult = (character) => {
    //check if clicked caracter is clicked before
    if (character.clicked) {
      //if true, return 'lose'
      return "lose";
    }
    //check if score equals to whole characters(for that difficulty level) minus one
    if (score === difficultyLevel[0] - 1) {
      //if true, return 'win'
      return "win";
    } else {
      return "";
    }
  }; // stateRoundResult

  return (
    <>
      {!isLoadingOver ? (
        <LoadingPage />
      ) : (
        <>
          {!difficultyLevel[0] ? (
            <StartPage
              setDifficultyLevel={setDifficultyLevel}
              playClickSound={playClickSound}
            />
          ) : (
            <GamePage
              goBackToStartPage={goBackToStartPage}
              playClickSound={playClickSound}
              playFlipSound={playFlipSound}
              getCharactersToPlayWith={getCharactersToPlayWith}
              setCharactersToPlayWith={setCharactersToPlayWith}
              setCharactersToDisplay={setCharactersToDisplay}
              charactersToPlayWith={charactersToPlayWith}
              charactersToDisplay={charactersToDisplay}
              shuffle={shuffle}
              score={score}
              bestScore={bestScore}
              setScore={setScore}
              setBestScore={setBestScore}
              countScore={countScore}
              stateRoundResult={stateRoundResult}
            />
          )}

          {/* render footer , with sound props */}
          <Footer 
                  isMusicPlaying={isMusicPlaying}
                  setIsMusicPlaying={setIsMusicPlaying}
                  isSoundPlaying={isSoundPlaying}
                  setIsSoundPlaying={setIsSoundPlaying}
                  playClickSound={playClickSound}/>
        </>
      )}

      {/* render a video element for backgorund video */}
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>

      {/* render Sound component witl props for source and playback control */}
      {/* <Sound 
        url={backgroundMusic}
        playStatus={isMusicPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
        onLoading={handleSoundLoading}
        onPlaying={handleSoundPlaying}
        onFinishedPlaying={handleSoundFinishedPlaying}
        volume={2.8}
        loop={true}
      /> */}
    </>
  );
}

export default App;
