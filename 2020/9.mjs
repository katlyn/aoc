import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 9
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(Number)

  const findBreak = cmp => {
    for (let i = cmp; i < input.length; ++i) {
      let solution = false
      for (let first = i - cmp; first < i; ++first) {
        for (let second = first + 1; second < i; ++second) {
          if (input[first] + input[second] === input[i]) {
            solution = true
            break
          }
        }
      }
      if (!solution) {
        return input[i]
      }
    }
  }
  
  const starOne = findBreak(25)
  
  const findContiguous = sum => {
    for (let i = 0; i < input.length; ++i) {
      let acc = input[i]
      for (let j = i + 1; j < input.length; ++j) {
        acc += input[j]
        if (acc === sum) {
          return [i, j]
        }
      }
    }
  }

  const starTwoIndexes = findContiguous(starOne)
  const nums = input.slice(starTwoIndexes[0], starTwoIndexes[1] + 1)
  const min = Math.min(...nums)
  const max = Math.max(...nums)

  const starTwo = min + max

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
