import { Bowling } from "./bowling";

describe("Bowling", () => {
  let bowling: Bowling;

  beforeEach(() => {
    bowling = new Bowling();
  });

  function rollMany(times: number, pins: number): void {
    for (let i = 0; i < times; i++) {
      bowling.roll(pins);
    }
  }

  test("全てガーター（0点）の場合", () => {
    rollMany(20, 0);
    expect(bowling.score()).toBe(0);
  });

  test("全て1ピン倒した場合", () => {
    rollMany(20, 1);
    expect(bowling.score()).toBe(20);
  });

  test("スペアの場合", () => {
    bowling.roll(5);
    bowling.roll(5);
    bowling.roll(3);
    rollMany(17, 0);
    expect(bowling.score()).toBe(16);
  });

  test("ストライクの場合", () => {
    bowling.roll(10);
    bowling.roll(3);
    bowling.roll(4);
    rollMany(16, 0);
    expect(bowling.score()).toBe(24);
  });

  test("パーフェクトゲーム（全てストライク）の場合", () => {
    rollMany(12, 10);
    expect(bowling.score()).toBe(300);
  });
});
