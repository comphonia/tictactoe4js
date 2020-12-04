// TicTacToe
const Board = require("./Board.js");
const Umpire = require("./Umpire.js");
const AIBrain = require("./AIBrain.js");
const {
  GamePiece,
  GameState,
  DebugLevel,
  PlayerType,
  Difficulty,
} = require("./constants.js");

const initialConfig = {
  size: 3,
  Player1: PlayerType.HUMAN,
  Player2: PlayerType.HUMAN,
  startPiece: GamePiece.X,
  startPlayer: 1,
};

class TicTacToe {
  /**
   *Creates an instance of TicTacToe.
   * @param {*} { size, turnTimeLimit, gameTimeLimit, startPiece,startPlayer, Player1, Player2, debugLevel, onPlayHandler, onEndHandler, onTickHandler }
   * @memberof TicTacToe
   */
  constructor({
    size,
    turnTimeLimit,
    gameTimeLimit,
    startPiece,
    startPlayer,
    Player1,
    Player2,
    debugLevel,
    onStartHandler,
    onPlayHandler,
    onEndHandler,
    onTickHandler,
  }) {
    this.size = size || config.size;
    this.turnTimeLimit = turnTimeLimit;
    this.gameTimeLimit = gameTimeLimit;
    this.startPiece = startPiece || initialConfig.startPiece;
    this.startPlayer = startPlayer || initialConfig.startPlayer;
    this.nextTurnPiece = startPiece;
    this.nextTurnPlayer = startPlayer === 1 ? Player1 : Player2;
    this.Player1 = Player1 || initialConfig.Player1;
    this.Player2 = Player2 || initialConfig.Player2;
    this.debugLevel = debugLevel
      ? debugLevel.toString().toUpperCase()
      : DebugLevel.NONE;
    this.onStartHandler = onStartHandler;
    this.onPlayHandler = onPlayHandler;
    this.onEndHandler = onEndHandler;
    this.onTickHandler = onTickHandler;

    this.playList = [];
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
  /**
   * Runs when game starts
   *
   * @memberof TicTacToe
   */
  onStart() {
    if (this.onStartHandler) this.onStartHandler(this.getGameData({}));
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
      } else {
        this.onTick();
      }
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
  /**
   * Called every second after game starts, stops when game ends
   *
   * @memberof TicTacToe
   */
  onTick() {
    if (this.onTickHandler) this.onTickHandler(this.getGameData({}));
  }
  /**
   * Called when game ends
   *
   * @param {JSON} reason
   * @returns {JSON} game data
   * @memberof TicTacToe
   */
  onEnd(reason) {
    this.gameState = GameState.ENDED;
    clearInterval(this.gameTimer);
    clearInterval(this.turnTimer);
    if (this.debugLevel) this.printData(reason);
    if (this.onEndHandler) this.onEndHandler(this.getGameData(reason));
    return this.getGameData(reason);
  }
  /**
   * Makes exactly one move on the board
   *
   * @param {*} { piece, position, isAI, aiDifficulty }
   * @returns
   * @memberof TicTacToe
   */
  makePlay({ piece, position, isAI, aiDifficulty }) {
    if (this.gameState !== GameState.RUNNING) return;

    if (isAI) {
      position = this.aiBrain.getMove({
        board: this.board,
        aiPiece: piece,
        aiDifficulty,
      });
    }
    // prevent a player from making consecutive plays
    if (this.nextTurnPiece !== piece) {
      return this.onEnd({
        isValid: false,
        winner: null,
        message: "Piece could not be placed: no consecutive turns allowed.",
      });
    } else {
      this.nextTurnPiece =
        this.nextTurnPiece === GamePiece.X ? GamePiece.O : GamePiece.X;
      this.nextTurnPlayer = this.nextTurnPlayer === this.Player1 ?  this.Player2 :  this.Player1;
    }

    // place or block wrong moves
    const isPlaced = this.board.placePiece({ player: piece, position });
    if (!isPlaced) {
      return this.onEnd({
        isValid: false,
        winner: null,
        message:
          "Piece could not be placed: slot filled or index out of bounds.",
      });
    }

    if (this.debugLevel) this.printData(this.board.board);

    this.playList.push({ piece, position, isAI, aiDifficulty });

    const decision = this.umpire.getDecision({
      board: this.board,
      piece,
      position,
    });
    if (decision.verdict) {
      if (this.debugLevel) this.printData(decision);
      return this.onEnd(decision);
    }
    if (this.onPlayHandler) this.onPlayHandler(this.getGameData({}));
    this.turnTimeElapsed = 0;

    // auto-play if AI player [STUB]
    if (this.nextTurnPlayer === PlayerType.AI) {
      this.gameState = GameState.THINKING;
      setTimeout(() => {
        if (this.gameState !== GameState.ENDED)
        this.gameState = GameState.RUNNING;
        this.makePlay({ piece: this.nextTurnPiece, position: null, isAI: true, aiDifficulty: Difficulty.BEGINNER });
      }, this.turnTimeLimit - 1000);
    }

    return {
      isValid: true,
      board: this.board,
      nextTurnPiece: this.nextTurnPiece,
      ...decision,
    };
  }

  /**
   * returns relevant data for the current instance
   *
   * @param {JSON} extras
   * @returns {JSON}
   * @memberof TicTacToe
   */
  getGameData(extras) {
    const {
      board,
      playList,
      nextTurnPiece,
      gameState,
      gameTimeLimit,
      gameTimeElapsed,
      turnTimeElapsed,
    } = this;
    return {
      board,
      playList,
      nextTurnPiece,
      gameState,
      gameTimeLeft: gameTimeLimit - gameTimeElapsed,
      gameTimeElapsed: gameTimeElapsed,
      turnTimeElapsed: turnTimeElapsed,
      ...extras,
    };
  }
  /**
   * Logs data to the console
   *
   * @param {JSON} extras
   * @memberof TicTacToe
   */
  printData(extras) {
    switch (this.debugLevel) {
      case DebugLevel.INFO:
        console.log(extras);
        break;
      case DebugLevel.VERBOSE:
        console.log(this.getGameData({}));
        break;

      default:
        break;
    }
  }

  timeMsToS(time) {
    return time / 1000;
  }
  timeSToMs(time) {
    return time * 1000;
  }
}

module.exports = TicTacToe;
