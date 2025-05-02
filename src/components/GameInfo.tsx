import WordDisplay from "./WordDisplay/WordDisplay";
import Keyboard from "./Keyboard/Keyboard";
import { useGame } from "../context/game/GameContext";

interface GameInfoProps {
  currentRound: number;
  totalRounds: number;
  word: string;
  incorrectGuesses: number;
  maxAttempts: number;
  timeLeft: number;
  isGameWon: boolean;
  gameOver: boolean;
  restart: () => void;
}

const GameInfo = ({
  currentRound,
  totalRounds,
  word,
  incorrectGuesses,
  maxAttempts,
  timeLeft,
  isGameWon,
  gameOver,
  restart
}: GameInfoProps) => {
  const context = useGame();
  if (!context) return null;
  const { guessedLetters } = context;

  return (
    <div className="game-info">
      <h2>Раунд: {currentRound} / {totalRounds}</h2>
      <WordDisplay word={word} guessedLetters={guessedLetters} />
      <p>Помилки: {incorrectGuesses} / {maxAttempts}</p>
      <p>Час: {timeLeft} сек</p>
      {!gameOver && !isGameWon && <Keyboard />}
      {isGameWon && <p className="result success">Слово вгадано!</p>}
      {gameOver && !isGameWon && <p className="result failure">Гру завершено</p>}
      {gameOver && <button className="restart-btn" onClick={restart}>Почати заново</button>}
    </div>
  );
};

export default GameInfo;