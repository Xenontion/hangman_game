import { memo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./GameSetup.module.css"; // Changed: import as 'styles'

interface GameSetupProps {
  totalRounds: number | null;
  setTotalRounds: (rounds: number) => void;
  startGame: (rounds: number) => void;
}

const GameSetup = ({ totalRounds, setTotalRounds, startGame }: GameSetupProps) => {
  const [inputRounds, setInputRounds] = useState(totalRounds || 1);
  const [error, setError] = useState("");

  const handleStartGame = () => {
    if (inputRounds <= 0) {
      setError("Ви ввели 0 раундів, ви автоматично ПРОГРАЛИ");
    } else {
      setError("");
      setTotalRounds(inputRounds);
      startGame(inputRounds);
    }
  };

  return (
    <div className={styles["game-setup"]}> {/* Changed here */}
      <label>Скільки слів потрібно вгадати?</label>
      <input
        type="number"
        min="0"
        value={inputRounds}
        onChange={(e) => setInputRounds(Number(e.target.value))}
      />
      <button onClick={handleStartGame}>Почати гру</button>
      <Link to="/" className={styles["stats-btn"]} style={{ marginTop: 10, textAlign: "center" }}> {/* Changed here */}
        Повернутися на головну
      </Link>
      {error && <p className={styles["error-message"]}>{error}</p>} {/* Changed here */}
    </div>
  );
};

export default memo(GameSetup);