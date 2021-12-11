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
  const input = inputString.split('\n').map(Number)
  
  const starOne = input.reduce((acc, curr, i) => {
    if (input[i] > input[i - 1]) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
  
  const starTwo = input.reduce((acc, curr, i) => {
    if (i < 2) {
      return acc
    } else if (input[i - 1] + input[i] + input[i + 1] > input[i - 2] + input[i - 1] + input[i]) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
