import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StatisticsPage = () => {
  const [username, setUsername] = useState("");
  const [guessedWords, setGuessedWords] = useState(0);
  const [allStats, setAllStats] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("username") || "";
    setUsername(currentUser);

    const statsRaw = localStorage.getItem("userStats");
    if (statsRaw) {
      const stats = JSON.parse(statsRaw);
      setAllStats(stats);
      setGuessedWords(stats[currentUser] || 0);
    } else {
      setAllStats({});
      setGuessedWords(0);
    }
  }, []);

  return (
    <div className="statistics-page">
      <h2>Статистика</h2>
      {username && (
        <p>
          <strong>{username}</strong>: вгадано слів — <strong>{guessedWords}</strong>
        </p>
      )}
      <h3>Всі користувачі:</h3>
      <ul>
        {Object.entries(allStats).map(([user, count]) => (
          <li key={user}>
            <strong>{user}</strong>: {count}
          </li>
        ))}
      </ul>
      <button
        className="stats-btn"
        onClick={() => navigate("/")}
        type="button"
        style={{ marginTop: 24 }}
      >
        На головну
      </button>
    </div>
  );
};

export default StatisticsPage;