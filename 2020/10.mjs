import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 10
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(Number).sort((a, b) => a - b)
  input.unshift(0)

  const getDifferences = () => {
    const acc = {
      1: 0,
      2: 0,
      3: 1 // Laptop charger
    }

    for (let i = 1; i < input.length; ++i) {
      acc[input[i] - input[i-1]] += 1
    }

    return acc
  }

  const diffs = getDifferences()
  
  const starOne = diffs[1] * diffs[3]

  const target = input[input.length - 1] + 3
  const cache = new Map
  const findCombinations = index => {
    const cached = cache.get(index)
    if (cached !== undefined) {
      return cached
    }

    let acc = 0

    if (target <= input[index] + 3) {
      return 1
    }

    for (let i = index + 1; i <= index + 3 && i < input.length; ++i) {
      if (index === 0) {
      }
      if (input[i] <= input[index] + 3) {
        acc += findCombinations(i)
      }
    }

    cache.set(index, acc)
    return acc
  }
  
  const starTwo = findCombinations(0)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
