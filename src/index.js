import TicTacToe, {Players} from './TicTacToe.js'

const ttt = new TicTacToe({ size: 3, gameTimeLimit: 2 });
ttt.makePlay({ player: Players.O, position: 1 });
ttt.makePlay({ player: Players.O, position: 2 });
ttt.makePlay({ player: Players.O, position: 3 });