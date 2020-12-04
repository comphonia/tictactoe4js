const Board = require("../Board");
const { GamePiece, Difficulty } = require("../constants.js");

const size = 3;
let board = new Board({ size });

test("Should have a length twice its size", () => {
  expect(board.length).toBe(size * size);
});

test("Should have valid move", () => {
  expect(board.placePiece({ player: GamePiece.X, position: 1 })).toBeTruthy();
});

test("Should have invalid move", () => {
  expect(board.placePiece({ player: GamePiece.X, position: 1 })).toBeFalsy();
});

test("Should return valid coordinate position", () => {
  expect(board.getCoordinatePos({position: 5})).toHaveProperty('x',1)
  expect(board.getCoordinatePos({position: 5})).toHaveProperty('y',1)
});

test("Should return an null coordinate position", () => {
  expect(board.getCoordinatePos({position: 15})).toBeNull()
});

test("Should return valid normalized position", () => {
  expect(board.getNormalizedPos({x: 1, y:1})).toBe(5)
});

test("Should return an null normalized position", () => {
  expect(board.getNormalizedPos({x: 12, y:12})).toBeNull()
});

test("Should return an array", () => {
  expect(board.getEmptySpots()).toEqual(expect.any(Object));
});
