import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 11
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(r => {
    return r.split('')
  })
  
  const simulateRound = round => {
    let changes = 0
    const nextRound = Array(round.length)
    for (let x = 0; x < round.length; ++x) {
      nextRound[x] = Array(round[x].length)
      for (let y = 0; y < round[x].length; ++y) {
        // Don't calculate floor
        if (round[x][y] === '.') {
          nextRound[x][y] = '.'
        } else {
          let nearby = 0
          for (let up = -1; up <= 1; ++up) {
            for (let side = -1; side <=1; ++side) {
              // Don't count current square
              if (up === 0 && side === 0) {
                continue
              }
              if (round[x + up]?.[y + side] === '#') {
                nearby += 1
              }
            }
          }
          if (nearby >= 4 && round[x][y] !== 'L') {
            // Die
            nextRound[x][y] = 'L'
            changes++
          } else if (nearby === 0 && round[x][y] !== '#') {
            // Birth
            nextRound[x][y] = '#'
            changes++
          } else {
            nextRound[x][y] = round[x][y]
          }
        }
      }
    }
    return [nextRound, changes]
  }

  let changes
  let round = input
  while (changes !== 0) {
    [round, changes] = simulateRound(round)
    // printRound(round)
  }

  const starOne = round.reduce((acc, r) => {
    return r.reduce((acc, s) => s === '#' ? acc + 1 : acc, 0) + acc
  }, 0)
  
  const findSeat = (round, x, y, x1, y1) => {
    let nx = x + x1
    let ny = y + y1
    while (round[nx]?.[ny] !== undefined) {
      if (round[nx][ny] === '#') {
        return true
      } else if (round[nx][ny] === 'L') {
        return false
      }
      nx += x1
      ny += y1
    }
    return false
  }

  const simulateTwo = round => {
    let changes = 0
    const nextRound = Array(round.length)
    for (let x = 0; x < round.length; ++x) {
      nextRound[x] = Array(round[x].length)
      for (let y = 0; y < round[x].length; ++y) {
        // Don't calculate floor
        if (round[x][y] === '.') {
          nextRound[x][y] = '.'
        } else {
          let nearby = 0

          for (let up = -1; up <= 1; ++up) {
            for (let side = -1; side <=1; ++side) {
              // Don't count current square
              if (up === 0 && side === 0) {
                continue
              }
              if (findSeat(round, x, y, up, side)) {
                nearby += 1
              }
            }
          }

          if (nearby >= 5 && round[x][y] !== 'L') {
            // Die
            nextRound[x][y] = 'L'
            changes++
          } else if (nearby === 0 && round[x][y] !== '#') {
            // Birth
            nextRound[x][y] = '#'
            changes++
          } else {
            nextRound[x][y] = round[x][y]
          }
        }
      }
    }
    return [nextRound, changes]
  }

  let changesTwo
  let roundTwo = input
  while (changesTwo !== 0) {
    [roundTwo, changesTwo] = simulateTwo(roundTwo)
  }

  const starTwo = roundTwo.reduce((acc, r) => {
    return r.reduce((acc, s) => s === '#' ? acc + 1 : acc, 0) + acc
  }, 0)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
