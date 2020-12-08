import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 5
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(p => {
    let high = 127
    let low = 0
    for (let i = 0; i < 7; ++i) {
      if (p[i] === 'F') {
        high -= Math.ceil((high-low) / 2)
      } else {
        low += Math.ceil((high - low) / 2)
      }
    }
    
    let seatHigh = 7
    let seatLow = 0
    for (let i = 7; i < 10; ++i) {
      if (p[i] === 'L') {
        seatHigh -= Math.ceil((seatHigh-seatLow) / 2)
      } else {
        seatLow += Math.ceil((seatHigh - seatLow) / 2)
      }
    }
  
    return { row: low, seat: seatLow, id: low * 8 + seatLow }
  })
  
  const sorted = input.sort((a, b) => Number(a.id) - Number(b.id))
  
  const starOne = sorted[sorted.length - 1].id
  
  let starTwo
  
  for (let i = 0; i < sorted.length; i++) {
    const seat = sorted[i]
    if (sorted[i+1] && sorted[i+1].id !== seat.id + 1) {
      starTwo = seat.id + 1
      break
    }
  }

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
