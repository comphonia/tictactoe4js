// AIBrain
import {Difficulty} from './constants.js'
import Player from './Player.js'
class Move {
  constructor({ score, point }) {
    this.score = score
    this.point = point
  }
}
class AIBrain extends Player {
  getMove({ board, aiPiece, aiDifficulty }) {
    switch (aiDifficulty) {
      case Difficulty.BEGINNER:
        return this.getBeginnerAIMove(board)
      default:
        break;
    }
  }

  // get random empty position
  getBeginnerAIMove(board) {
    const emptySpots = board.getEmptySpots()
    const index = Math.floor(Math.random() * Math.floor(emptySpots.length))
    return emptySpots[index]
  }
}

export default AIBrain;
