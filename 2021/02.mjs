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
  const input = inputString.split('\n').map(l => l.split(' '))

  let horizontal = 0
  let depth = 0
  let aim = 0

  for (const line of input) {
    switch (line[0]) {
      case 'down':
        aim += Number(line[1])
        break
      
      case 'up':
        aim -= Number(line[1])
        break

      case 'forward':
        horizontal += Number(line[1])
        depth += aim * Number(line[1])
        break
    }
  }
  
  const starOne = horizontal * aim
  const starTwo = horizontal * depth

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
