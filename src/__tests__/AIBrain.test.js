const AIBrain = require("../AIBrain");
const TicTacToe = require("../TicTacToe");
const { GamePiece, Difficulty } = require("../constants.js");
const Player = require("../Player");

let aiBrain = null;
let tictactoe = null;
let play = {};
let board = [];

beforeEach(() => {
  aiBrain = new AIBrain();
  tictactoe = new TicTacToe({ size: 3, gameTimeLimit: 5, turnTimeLimit: 3 });
  board = tictactoe.board;
  play = {
    board,
    aiPiece: GamePiece.O,
    aiDifficulty: Difficulty.BEGINNER,
  };
});

test("should be instance of Player", () => {
  expect(aiBrain).toBeInstanceOf(Player);
});

test("should return a Number > 0", () => {
  expect(aiBrain.getMove(play)).toEqual(expect.any(Number));
  expect(aiBrain.getMove(play)).toBeGreaterThan(0);
});

test("should return -1 with no difficulty selected", () => {
  expect(aiBrain.getMove({...play, aiDifficulty: null})).toBe(-1);
});

test("should return a Number contained in the board's empty spot", () => {
  const emptySpots = board.getEmptySpots();
  const move = aiBrain.getBeginnerAIMove(board);
  expect(move).toEqual(expect.any(Number));
  expect(move).toBeGreaterThan(0);
  expect(move).toBeLessThanOrEqual(board.length);
  expect(emptySpots).toContain(move);
});
