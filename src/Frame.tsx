import React from 'react';

type FrameProps = {
  frameNumber: number;
  roll1: string;
  roll2: string;
  roll3: string;
  frameScore: number;
};

const Frame: React.FC<FrameProps> = ({ frameNumber, roll1, roll2, roll3, frameScore }) => {
  return (
    <div className={`frame ${frameNumber === 10 ? 'last-frame' : ''}`}>
      <div className="frame-header">Frame {frameNumber}</div>
      <div className="frame-rolls">
        <div className="roll-box">{roll1}</div>
        <div className="roll-box">{roll2}</div>
        {frameNumber === 10 && <div className="roll-box">{roll3}</div>}
      </div>
      <div className="frame-score">
        {frameScore === 0 ? '' : frameScore.toString()}
      </div>
    </div>
  );
};

export default Frame;

