import React, { useEffect, useState } from "react";
import GameSetup from "./GameSetup";
import GameInfo from "./GameInfo";
import { useGame } from "../context/game/GameContext";
import data from "../data/data.json";

const getRandomWordWithHint = () => data[Math.floor(Math.random() * data.length)];
const baseTime = 30;
const maxAttempts = 6;

const GameContent = () => {
  const context = useGame();
  const [currentWord, setCurrentWord] = useState(getRandomWordWithHint());
  const [timeLeft, setTimeLeft] = useState(baseTime);
  const [gameStarted, setGameStarted] = useState(false);
  const [rounds, setRounds] = useState<number | null>(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const word = currentWord.word;
  const hint = currentWord.hint;

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
            setCurrentWord(getRandomWordWithHint());
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
    setCurrentWord(getRandomWordWithHint());
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
          setCurrentWord(getRandomWordWithHint());
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
      hint={hint}
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