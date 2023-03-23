import React, { useState, useRef } from 'react';
import './App.css';
import { Bowling } from './bowling';
import BowlingScoreboard from './BowlingScoreboard';

const App: React.FC = () => {
  const [bowling, setBowling] = useState(new Bowling());
  const [rolls, setRolls] = useState<number[]>([]);
  const [score, setScore] = useState(NaN);
  const [currentScore, setCurrentScore] = useState(0);
  const pinsInput = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // pinsInput.current が null でないことを確認
    if (!pinsInput.current) {
      return;
    }
  
    // 入力値のバリデーション
    const pins = parseInt(pinsInput.current.value, 10);
  
    if (isNaN(pins) || pins < 0 || pins > 10) {
      alert("Please enter a valid number between 0 and 10.");
      return;
    }

    // ゲーム終了の判定
    if (bowling.isGameFinished()) {
      alert("The game is already finished.");
      return;
    }
  
    // ピン数を記録し、スコアを計算する
    bowling.roll(pins);
    setRolls([...bowling.getRolls()]);
    setCurrentScore(getCurrentScore());
    setScore(bowling.score());
  };
  
  const getCurrentScore = () => {
    let currentScore = 0;
    bowling.frameScores().forEach((s) => {
      if (!isNaN(s)) {
        currentScore += s;
      }
    });
    return currentScore;
  }

  const handleRestart = () => {
    // 新しい Bowling インスタンスを作成
    setBowling(new Bowling());
    // スコアとロールをリセット
    setScore(0);
    setRolls([]);
    // 入力欄をリセット
    if (pinsInput.current) {
      pinsInput.current.value = '';
    }
  };

  return (
    <div className="App">
      <h1>Bowling Scoreboard</h1>
      <BowlingScoreboard bowling={bowling} rolls={rolls} />
      <form onSubmit={onSubmit}>
        <input ref={pinsInput} type="number" min="0" max="10" placeholder="Pins" />
        <button type="submit">Roll</button>
        <button type="button" onClick={handleRestart}>
          Restart Game
        </button>
      </form>
      <div>
        <h2>{!isNaN(score) ? `Score: ${score}` : `CurrentScore: ${currentScore}`}</h2>
      </div>
    </div>
  );
};

export default App;

