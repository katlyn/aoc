import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 1
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

// Parsed and mapped to be useful
const input = inputString.split('\n').map(Number)

export let starOne

for (let i = 0; i < input.length; ++i) {
  for (let j = i; j < input.length; ++j) {
    if (input[i] + input[j] === 2020) {
      starOne = input[i] * input[j]
    }
  }
}

export let starTwo

for (let i = 0; i < input.length; ++i) {
  for (let j = i; j < input.length; ++j) {
    for (let k = j; k < input.length; ++k) {
      if (input[i] + input[j] + input[k] === 2020) {
        starTwo = input[i] * input[j] * input[k]
      }
    }
  }
}

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
