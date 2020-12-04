const WLD = Object.freeze({ WIN: "WIN", LOSS: "LOSS", DRAW: "DRAW" });
const GameState = Object.freeze({
  RUNNING: "RUNNING",
  THINKING: "THINKING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
});
const GamePiece = Object.freeze({ X: "X", O: "O" });
const PlayerType = Object.freeze({ HUMAN: "HUMAN", AI: "AI" });
const Difficulty = Object.freeze({
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
});
const DebugLevel = Object.freeze({
  NONE: "NONE",
  INFO: "INFO",
  VERBOSE: "VERBOSE",
});

exports.WLD = WLD;
exports.GameState = GameState;
exports.GamePiece = GamePiece;
exports.PlayerType = PlayerType;
exports.Difficulty = Difficulty;
exports.DebugLevel = DebugLevel;
