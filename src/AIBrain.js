// AIBrain
const { Difficulty } = require("./constants.js");
const Player = require("./Player.js");
class Move {
  constructor({ score, point }) {
    this.score = score;
    this.point = point;
  }
}
class AIBrain extends Player {
  getMove({ board, aiPiece, aiDifficulty }) {
    switch (aiDifficulty) {
      case Difficulty.BEGINNER:
        return this.getBeginnerAIMove(board);
      default:
        break;
    }
  }

  // get random empty position
  getBeginnerAIMove(board) {
    const emptySpots = board.getEmptySpots();
    const index = Math.floor(Math.random() * Math.floor(emptySpots.length));
    return emptySpots[index];
  }
}

module.exports = AIBrain;
