// Umpire
const { WLD } = require("./constants.js");
// TODO: Cleanup, make DRY
class Umpire {
  constructor() {
    this.moves = 0;
  }
  getDecision({ board, piece, position }) {
    this.moves++;
    const _tempBoard = [...board.board];
    const boardSize = board.size;
    const coord = board.getCoordinatePos({ position });
    let verdict = null;
    let winner = null;
    let winSlots = [];

    //check DRAW
    if (this.moves === Math.pow(boardSize, 2)) {
      verdict = WLD.DRAW;
      return { verdict, winner, winSlots };
    }

    // check horizontal -
    for (let i = 0; i < boardSize; i++) {
      if (_tempBoard[coord.x][i] !== piece) break;
      else winSlots.push(board.getNormalizedPos({ x: coord.x, y: i }));
      if (i == boardSize - 1) {
        //WIN detected
        winner = piece;
        verdict = winner === piece ? WLD.WIN : WLD.LOSS;
        return { verdict, winner, winSlots };
      }
    }
    winSlots = [];

    // check vertical |
    for (let i = 0; i < boardSize; i++) {
      if (_tempBoard[i][coord.y] !== piece) break;
      else winSlots.push(board.getNormalizedPos({ x: i, y: coord.y }));
      if (i == boardSize - 1) {
        //WIN detected
        winner = piece;
        verdict = winner === piece ? WLD.WIN : WLD.LOSS;
        return { verdict, winner, winSlots };
      }
    }
    winSlots = [];

    // check diagonal \
    if (coord.x === coord.y) {
      for (let i = 0; i < boardSize; i++) {
        if (_tempBoard[i][i] !== piece) break;
        else winSlots.push(board.getNormalizedPos({ x: i, y: i }));
        if (i == boardSize - 1) {
          //WIN detected
          winner = piece;
          verdict = winner === piece ? WLD.WIN : WLD.LOSS;
          return { verdict, winner, winSlots };
        }
      }
    }
    winSlots = [];

    // check anti-diagonal /
    if (coord.x + coord.y === boardSize - 1) {
      for (let i = 0; i < boardSize; i++) {
        if (_tempBoard[i][boardSize - 1 - i] !== piece) break;
        else
          winSlots.push(board.getNormalizedPos({ x: i, y: boardSize - 1 - i }));
        if (i == boardSize - 1) {
          //WIN detected
          winner = piece;
          verdict = winner === piece ? WLD.WIN : WLD.LOSS;
          return { verdict, winner, winSlots };
        }
      }
    }
    winSlots = [];

    return { verdict: null, winner: null, winSlots: null };
  }
}

module.exports = Umpire;
