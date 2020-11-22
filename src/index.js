import TicTacToe from './TicTacToe.js'
export * from './constants.js'


class Game{
    constructor(){
        this.TicTacToe = TicTacToe
    }
}
const game = new Game()
export default game

/* const ttt = new TicTacToe({ size: 3, gameTimeLimit: 5, turnTimeLimit: 3 })
ttt.makePlay({ player: GamePiece.X, position: 1 })
ttt.makePlay({ player: GamePiece.O, isAI:true, aiDifficulty: Difficulty.BEGINNER })
ttt.makePlay({ player: GamePiece.O, isAI:true, aiDifficulty: Difficulty.BEGINNER }) */