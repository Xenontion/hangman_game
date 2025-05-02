import React, { useEffect, useState } from "react";
import Keyboard from "./Keyboard/Keyboard";
import WordDisplay from "./WordDisplay/WordDisplay";
import GameSetup from "./GameSetup";
import GameInfo from "./GameInfo";
import { useGame } from "../context/game/GameContext";

const words = ["реакція", "програмування", "розробник", "алгоритм", "інтерфейс"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
const baseTime = 30;
const maxAttempts = 6;

const GameContent = () => {
  const context = useGame();
  const [word, setWord] = useState(getRandomWord());
  const [timeLeft, setTimeLeft] = useState(baseTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [rounds, setRounds] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  useEffect(() => {
    if (!gameStarted || timeLeft === 0 || gameOver) return;
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  useEffect(() => {
    if (timeLeft === 0 && gameStarted) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (context?.guessedLetters.length) {
      const incorrect = context.guessedLetters.filter(l => !word.includes(l));
      setIncorrectGuesses(incorrect.length);

      if (incorrect.length >= maxAttempts) {
        setGameOver(true);
        setGameStarted(false);
      }

      const wordGuessed = word.split('').every(letter => context.guessedLetters.includes(letter));
      if (wordGuessed) {
        setIsGameWon(true);
        if (rounds && currentRound < rounds) {
          setTimeout(() => {
            setWord(getRandomWord());
            setTimeLeft(baseTime);
            setCurrentRound(prev => prev + 1);
            setIsGameWon(false);
            setIncorrectGuesses(0);
            context.clearGuessedLetters?.();
          }, 1000);
        } else {
          setGameOver(true);
          setGameStarted(false);
        }
      }
    }
  }, [context?.guessedLetters]);

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setRounds(null);
    setCurrentRound(1);
    setWord(getRandomWord());
    setTimeLeft(baseTime);
    setIsGameWon(false);
    setIncorrectGuesses(0);
    context?.clearGuessedLetters?.();
  };

  if (!gameStarted) {
    return (
      <GameSetup
        totalRounds={rounds}
        setTotalRounds={setRounds}
        startGame={(count) => {
          setRounds(count);
          setGameStarted(true);
          setWord(getRandomWord());
          setTimeLeft(baseTime);
          setCurrentRound(1);
          setGameOver(false);
          setIsGameWon(false);
          setIncorrectGuesses(0);
          context?.clearGuessedLetters?.();
        }}
      />
    );
  }

  return (
    <GameInfo
      currentRound={currentRound}
      totalRounds={rounds ?? 1}
      word={word}
      incorrectGuesses={incorrectGuesses}
      maxAttempts={maxAttempts}
      timeLeft={timeLeft}
      isGameWon={isGameWon}
      gameOver={gameOver}
      restart={restartGame}
    />
  );
};

export default GameContent;
