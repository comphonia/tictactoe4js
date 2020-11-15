// Board
class Board {
  constructor({ size }) {
    this.board = [];
    this.size = size;
    const s = parseInt(size);
    for (let i = 0; i < s; i++) {
      this.board.push([]);
      for (let j = 0; j < s; j++) {
        this.board[i].push(" ");
      }
    }
  }

  placePiece({ player, position }) {
    let coord = this.getCoordinatePos({ position });
    if (coord) {
      this.board[coord.x][coord.y] = player;
      return true;
    } else return false;
  }

  getCoordinatePos({ position }) {
    let tempPos = position - 1;
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (tempPos === count++) {
          return { x: i, y: j };
        }
      }
    }
    return null;
  }
  getNormalizedPos({ x, y }) {
    let tempPos = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        tempPos++;
        if (i == x && j == y) {
          return tempPos;
        }
      }
    }
    return null;
  }

  print() {
    console.log(this.board);
  }
}

export default Board;
