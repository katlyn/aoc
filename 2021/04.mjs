import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

const file = import.meta.url.slice(7)
const __dirname = path.dirname(import.meta.url).slice(7)

export const day = path.basename(file).slice(0, -4)
export const year = path.basename(__dirname)

const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const [ drawString, ...boardStrings] = inputString.split('\n\n')

  const drawings = drawString.split(',').map(Number)
  const boards = boardStrings.map(b => b.split('\n').map(l => l.match(/\s*\d+/g)).map(r => r.map(c => [Number(c), false])))
  const solvedBoards = []

  /**
   * Check if a board has won
   * @param {[number, boolean][][]} board
   */
  const checkBoard = board => {
    // Check rows
    for (const row of board) {
      if (row.every(c => c[1])) {
        return true
      }
    }

    // Check columns
    for (let i = 0; i < 5; ++i) {
      if (board[0][i][1] && board[1][i][1] && board[2][i][1] && board[3][i][1] && board[4][i][1]) {
        return true
      }
    }
    return false
  }

  /**
   * Calculate the total score of a board
   * @param {[number, boolean][][]} board
   */
  const calculateScore = (board, draw) => {
    return board.reduce((acc, row) => {
      return row.reduce((acc, cell) => {
        if (!cell[1]) {
          return acc + cell[0]
        } else {
          return acc
        }
      }, acc)
    }, 0) * draw
  }

  /**
   * Calculate the total score of a board
   * @param {[number, boolean][][]} board
   */
  const printBoard = board => {
    for (const row of board) {
      let line = ''
      for (const cell of row) {
        if (cell[1]) {
          line += chalk.bgCyan(cell[0].toString().padStart(3, ' '))
        } else {
          line += cell[0].toString().padStart(3, ' ')
        }
      }
      console.log(line)
    }
  }

  for (const draw of drawings) {
    for (const board of boards) {
      if (board.done) continue
      for (const row of board) {
        for (const cell of row) {
          if (cell[0] === draw) {
            cell[1] = true
          }
        }
      }
      const won = checkBoard(board)
      if (won) {
        solvedBoards.push([board, draw])
        board.done = true
      }
    }
  }
  
  const starOne = calculateScore(...solvedBoards[0])
  const starTwo = calculateScore(...solvedBoards[solvedBoards.length - 1])

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
