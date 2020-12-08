import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 3
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

// Parsed and mapped to be useful
const input = inputString.split('\n').map(l => l.split('').map(c => c === '#'))
 
const countTrees = (run, rise) => {
  let acc = 0;
  let x = 0
  for (let i = 0; i < input.length; i += rise) {
      if (input[i][x%input[i].length]) {
          acc += 1
      }
      x += run
  }
  return acc
}

export const starOne = countTrees(3, 1)

export const starTwo = countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2)

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
