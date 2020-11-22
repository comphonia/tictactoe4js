const WLD = Object.freeze({ WIN: "WIN", LOSS: "LOSS", DRAW: "DRAW" });
const GameState = Object.freeze({
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
});
const GamePiece = Object.freeze({ X: "X", O: "O" });
const Difficulty = Object.freeze({
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
});

exports.WLD = WLD
exports.GameState = GameState
exports.GamePiece = GamePiece
exports.Difficulty = Difficulty
