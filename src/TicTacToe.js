// TicTacToe
const Board = require("./Board.js");
const Umpire = require("./Umpire.js");
const AIBrain = require("./AIBrain.js");
const { GamePiece, GameState } = require("./constants.js");
class TicTacToe {
  constructor({ size, turnTimeLimit, gameTimeLimit, startPiece }) {
    this.size = size;
    this.turnTimeLimit = this.timeSToMs(turnTimeLimit);
    this.gameTimeLimit = this.timeSToMs(gameTimeLimit);
    this.playList = [];
    this.nextTurnPiece = startPiece || GamePiece.X;

    this.board = new Board({ size });
    this.umpire = new Umpire();
    this.aiBrain = new AIBrain();
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
        const winner =
          this.nextTurnPiece === GamePiece.X ? GamePiece.O : GamePiece.X;
        this.onEnd({
          isValid: false,
          winner,
          message: "Game time limit reached",
        });
        return;
      }
      this.onTick();
      this.gameTimeElapsed += 1000;
    }, 1000);

    this.turnTimer = setInterval(() => {
      if (this.turnTimeElapsed >= this.turnTimeLimit) {
        const winner =
          this.nextTurnPiece === GamePiece.X ? GamePiece.O : GamePiece.X;
        this.onEnd({
          isValid: false,
          winner,
          message: "Turn time limit reached",
        });
        return;
      }
      this.turnTimeElapsed += 1000;
    }, 1000);
  }

  onTick() {}

  onEnd(reason) {
    this.gameState = GameState.ENDED;
    clearInterval(this.gameTimer);
    clearInterval(this.turnTimer);
    if (reason) {
      console.log("reason", { ...reason });
      return reason;
    }
  }

  makePlay({ player, position, isAI, aiDifficulty }) {
    if (this.gameState !== GameState.RUNNING) return;

    if (isAI) {
      position = this.aiBrain.getMove({
        board: this.board,
        aiPiece: player,
        aiDifficulty,
      });
    }
    // prevent a player from making consecutive plays
    if (this.nextTurnPiece !== player) {
      return this.onEnd({
        isValid: false,
        winner: null,
        message: "Piece could not be placed: no consecutive turns allowed.",
      });
    } else {
      this.nextTurnPiece =
        this.nextTurnPiece === GamePiece.X ? GamePiece.O : GamePiece.X;
    }

    // place or block wrong moves
    const isPlaced = this.board.placePiece({ player, position });
    if (!isPlaced) {
      return this.onEnd({
        isValid: false,
        winner: null,
        message:
          "Piece could not be placed: slot filled or index out of bounds.",
      });
    }

    this.board.print();
    this.playList.push({ player, position, isAI, aiDifficulty });

    const decision = this.umpire.getDecision({
      board: this.board,
      player,
      position,
    });
    if (decision.verdict) {
      return this.onEnd(decision);
    }

    this.turnTimeElapsed = 0;

    return {
      isValid: true,
      board: this.board,
      nextTurnPiece: this.nextTurnPiece,
      ...decision,
    };
  }

  timeMsToS(time) {
    return time / 1000;
  }
  timeSToMs(time) {
    return time * 1000;
  }
}

module.exports = TicTacToe;
