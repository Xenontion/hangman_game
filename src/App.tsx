import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameProvider from "./context/game/GameProvider";
import GamePage from "./pages/GamePage";
import StartPage from "./pages/StartPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/styles.css";

const App = () => {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </GameProvider>
    </Router>
  );
};

export default App;
