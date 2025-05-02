import { useGame, useKeyboardHandler, letters } from "../../context/game/GameContext";

function Keyboard() {
  useKeyboardHandler();

  const context = useGame();
  if (!context) return null;

  const { guessedLetters, onGuess } = context;

  return (
    <div className="keyboard">
      {letters.map((letter: string) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
