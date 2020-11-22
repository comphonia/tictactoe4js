// Umpire
const { WLD } = require("./constants.js");
// TODO: Cleanup, make DRY
class Umpire {
  constructor() {
    this.moves = 0;
  }
  getDecision({ board, player, position }) {
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
      if (_tempBoard[coord.x][i] !== player) break;
      else winSlots.push(board.getNormalizedPos({ x: coord.x, y: i }));
      if (i == boardSize - 1) {
        //WIN detected
        winner = player;
        verdict = winner === player ? WLD.WIN : WLD.LOSS;
        return { verdict, winner, winSlots };
      }
    }
    winSlots = [];

    // check vertical |
    for (let i = 0; i < boardSize; i++) {
      if (_tempBoard[i][coord.y] !== player) break;
      else winSlots.push(board.getNormalizedPos({ x: i, y: coord.y }));
      if (i == boardSize - 1) {
        //WIN detected
        winner = player;
        verdict = winner === player ? WLD.WIN : WLD.LOSS;
        return { verdict, winner, winSlots };
      }
    }
    winSlots = [];

    // check diagonal \
    if (coord.x === coord.y) {
      for (let i = 0; i < boardSize; i++) {
        if (_tempBoard[i][i] !== player) break;
        else winSlots.push(board.getNormalizedPos({ x: i, y: i }));
        if (i == boardSize - 1) {
          //WIN detected
          winner = player;
          verdict = winner === player ? WLD.WIN : WLD.LOSS;
          return { verdict, winner, winSlots };
        }
      }
    }
    winSlots = [];

    // check anti-diagonal /
    if (coord.x + coord.y === boardSize - 1) {
      for (let i = 0; i < boardSize; i++) {
        if (_tempBoard[i][boardSize - 1 - i] !== player) break;
        else
          winSlots.push(board.getNormalizedPos({ x: i, y: boardSize - 1 - i }));
        if (i == boardSize - 1) {
          //WIN detected
          winner = player;
          verdict = winner === player ? WLD.WIN : WLD.LOSS;
          return { verdict, winner, winSlots };
        }
      }
    }
    winSlots = [];

    return { verdict: null, winner: null, winSlots: null };
  }
}

module.exports = Umpire;
