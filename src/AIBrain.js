// AIBrain
export const AIDifficulty = Object.freeze({
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
});

class Move {
  constructor({ score, point }) {
    this.score = score;
    this.point = point;
  }
}
class AIBrain {
  constructor(aiDifficulty = AIDifficulty.BEGINNER) {
    this.aiDifficulty = aiDifficulty;
  }
}

export default AIBrain;
