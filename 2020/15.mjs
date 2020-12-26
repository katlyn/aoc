import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 15
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const indexCache = new Map
  const input = inputString.split(',').map((n, i) => {
    const num = Number(n)
    indexCache.set(num, i)
    return num
  })

  const runGame = target => {
    while (input[target - 1] === undefined) {
      const cached = indexCache.get(input[input.length - 1])
      indexCache.set(input[input.length - 1], input.length - 1)
      if (cached === undefined) {
        input.push(0)
      } else {
        input.push(input.length - cached - 1)
      }
    }
    return input[target - 1]
  }
  
  const starOne = runGame(2020)
  
  const starTwo = runGame(30000000)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
