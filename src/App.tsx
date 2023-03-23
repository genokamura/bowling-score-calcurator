import React, { useState, useRef } from 'react';
import './App.css';
import { Bowling } from './bowling';

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

  const renderFrames = () => {
    const frameScores = bowling.frameScores();
    const frames = [];
    let rollIndex = 0;
    let totalScore = 0;
    console.log('rolls', rolls);
    console.log('framescores', frameScores);
  
    for (let i = 0; i < 10; i++) {
      const isStrike = bowling.isStrike(rollIndex);
      const isSpare = !isStrike && bowling.isSpare(rollIndex);
  
      console.log(rolls[rollIndex]);
      const roll1 = isStrike ? "X" : rolls[rollIndex] === undefined ? "" : rolls[rollIndex] || "-";
      let roll2 = isStrike ? "" : isSpare ? "/" : rolls[rollIndex + 1]  === undefined ? "" : rolls[rollIndex + 1] || "-";
  
      // 最終フレームの処理
      let roll3 = "";
      if (i === 9) {
        roll2 = bowling.isStrike(rollIndex + 1) ? "X" : isSpare ? "/" : rolls[rollIndex + 1]  === undefined ? "" : rolls[rollIndex + 1] || "-";
        if (isStrike || isSpare) {
          roll3 = bowling.isStrike(rollIndex + 2) ? "X" : bowling.isStrike(rollIndex + 1) && bowling.isSpare(rollIndex + 2) ? "/" : rolls[rollIndex + 2]  === undefined ? "" : rolls[rollIndex + 2].toString() || "-";
        }
        rollIndex += 2;
      } else {
        rollIndex += isStrike ? 1 : 2;
      }

      // フレームごとのスコアの合計を計算
      totalScore += frameScores[i] !== undefined ? frameScores[i] : 0;
      totalScore = isNaN(totalScore) ? 0 : totalScore;
  
      frames.push(
        <div key={i} className={`frame ${i === 9 ? 'last-frame' : ''}`}>
          <div className="frame-header">Frame {i + 1}</div>
          <div className="frame-rolls">
            <div className="roll-box">{roll1}</div>
            <div className="roll-box">{roll2}</div>
            {i === 9 && <div className="roll-box">{roll3}</div>}
          </div>
          <div className="frame-score">
            {totalScore === 0 ? '' : totalScore.toString()}
          </div>
        </div>
      );
    }
  
    return frames;
  };

  return (
    <div className="App">
      <h1>Bowling Scoreboard</h1>
      <div className="frames">{renderFrames()}</div>
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

