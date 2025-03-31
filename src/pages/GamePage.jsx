
import Card from '../components/Card'
import { motion,AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react"
import Header from "../components/Header";
import '../styles/converted_gamepage.css';
import GameOver from '../components/GameOver';
//GamePage Component with related props for soundEffects, score and game logic

export default function GamePage({goBackToStartPage,
        playClickSound,
        playFlipSound,
        getCharactersToPlayWith,
        setCharactersToPlayWith,
        setCharactersToDisplay,
        charactersToPlayWith,
        charactersToDisplay,
        shuffle,
        score,
        bestScore,
        setScore,
        setBestScore,
        countScore,
        stateRoundResult}) {

    //STATES
    //a state for controlling the flipp effect of each card(a boolean)
        const [isFlipped,setIsFlipped] = useState(false);
    //a state for controlling game state(clicking) while a card is flipping
        const [isClicked, setIsClicked] = useState(false);
    //a state for controlling the game state(win or lose)-string
        const [result, setResult] = useState('');

    //USEEFFECTS
    useEffect(()=>{
        //getCardsToPlayWith: for fetching total cards to play
        getCharactersToPlayWith();
        //return(or reset the game state): reset setCharactersToPlayWith ,score, bestScore
        return () => {
            setCharactersToPlayWith([]);
            setScore(0);
            setBestScore(0);
            //set character.clicked to false for each card in charactersToPlayWith
            charactersToPlayWith.forEach(character=>{
                character.clicked = false;
            })    
        } //return
            
        }, []); //useEffent

    //FUNCTIONS

    //handleCardClick: when user clicks on a card
    const handleCardClick = (character)=>{

            //set isClicked state to true (for preventing further clicks)
            setIsClicked(true);
            //return earlly, if the isClicked is true
            if(isClicked) {
                return
            }
            //initialize a variable with calling stateRoundResult(character) - checks for character.clicked
            let turnResult = stateRoundResult(character);
            //update setResult with that variable
            setResult(turnResult)
            //set character.clicked to true(becuse it is clicked)
            character.clicked = true;
            //check if there is a result(turnResult !== '')
            if(turnResult !== '') {

                    //if result is win: call countScore functin
                    if(turnResult==='win') {
                        countScore();
                    }
                    //set isClicked to false
                    setIsClicked(false);
                    //exit the function
                    return;
                }
                //update score(countScore)
            countScore();
            //trigger flip animation (setIsFlipped(true))
            setIsFlipped(true);
            //play the flip sound
            playFlipSound();
            //set a timeout for shuffling the cards
            setTimeout(()=>{

                    //call shuffle on charactersToPlayWith
                    shuffle(charactersToPlayWith);  
                    //shuffle should take 800 milliSeconds
                },800)
            
            //set timeout to reset the flipp state and click lock
            setTimeout(()=>{

                    //complete the flip (setIsFlipped(false))
                    setIsFlipped(false);  
                    //allow further clicks (setIsClicked(false))
                    setIsClicked(false);
                    //play flip sound
                    playFlipSound();
                    //reset turnResult
                    turnResult = '';
                },1300)
            
        } //handleCardClick

        //restartTheGame function: when the player want to re-start the game 
        const restartTheGame = ()=>{

                //reset the score to 0
                setScore(0)
                //reset the result to 0
                setResult('');
                //set each character.clicked to false
                charactersToPlayWith.forEach(character => {
                        character.clicked = false;
                })
                //get new cards (call getCharactersToPlayWith())
                getCharactersToPlayWith();
        } //restartTheGame

  return (

    <>
      {/* render Header with sound and score pops */}
        <Header goBackToStartPage={goBackToStartPage} playClickSound={playClickSound} score={score} bestScore={bestScore} />
      {/* create animatin for game board with motion.div plus props */}
        <motion.div className='playGround'
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{duration: 0.5}}>
                <div className="cardSection">
                        {charactersToDisplay.map(character=>{
                                return (
                                        <Card 
                                            key={character.id}
                                            character={character}
                                            isFlipped={isFlipped}
                                            handleCardClick={handleCardClick}        
                                        />
                                );
                        })}
                </div>
                <div className="remainIndicator">{`${score} / ${charactersToPlayWith.length}`}</div>
        </motion.div>
      {/* use AnimatePresence for rendering gameOver component if result is not empty */}
        <AnimatePresence>
                {result !== '' && <GameOver restartTheGame={restartTheGame} playClickSound={playClickSound} result={result} />}
        </AnimatePresence>
    </>
  )
}
