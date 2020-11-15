// TicTacToe
import Board from "./Board.js";
import Umpire, { WLD } from "./Umpire.js";

export const GameState = Object.freeze({
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
});
export const Players = Object.freeze({ X: "X", O: "O" });
class TicTacToe {
  constructor({ name, size, turnTimeLimit, gameTimeLimit, config, options }) {
    this.name = name;
    this.size = size;
    this.turnTimeLimit = this.timeSToMs(turnTimeLimit);
    this.gameTimeLimit = this.timeSToMs(gameTimeLimit);
    this.config = config;
    this.options = options;

    this.board = new Board({ size });
    this.umpire = new Umpire();
    this.gameState = GameState.ENDED;
    this.gameTimer = null;
    this.turnTimer = null;
    this.gameTimeElapsed = 0;
    this.turnTimeElapsed = 0;

    this.onStart();
  }

  onStart() {
    this.gameState = GameState.RUNNING;
    this.gameTimer = setInterval(() => {
      if (this.gameTimeElapsed >= this.gameTimeLimit) {
        this.onEnd();
        return;
      }
      this.onTick();
      this.gameTimeElapsed += 1000;
    }, 1000);

    this.turnTimer = setInterval(() => {
      if (this.turnTimeElapsed >= this.turnTimer) {
        this.onEnd();
        return;
      }
      this.turnTimeElapsed += 1000;
    }, 1000);
  }

  onTick() {}

  onEnd() {
    this.gameState = GameState.ENDED;
    clearInterval(this.gameTimer);
    clearInterval(this.turnTimer);
  }

  makePlay({ player, position }) {
    if (this.gameState !== GameState.RUNNING) return;
    this.turnTimeElapsed = 0;
    const isPlaced = this.board.placePiece({ player, position });
    if (!isPlaced) {
      throw new Error(
        "Piece could not be placed: slot filled or index out of bounds."
      );
    }
    this.board.print();
    const decision = this.umpire.getDecision({
      board: this.board,
      player,
      position,
    });
    if (decision.verdict === WLD.WIN) {
      this.onEnd();
    }
    console.log(decision);
  }

  timeMsToS(time) {
    return time / 1000;
  }
  timeSToMs(time) {
    return time * 1000;
  }
}

export default TicTacToe
