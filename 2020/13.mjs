import chalk from 'chalk'
import { time } from 'console'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

import crt from 'nodejs-chinese-remainder/chinese_remainder.js'

export const day = 13
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n')
  const leave = Number(input[0])
  const busses = input[1].split(',').map(Number)

  const nextArrival = busses.filter(b => !isNaN(b)).map(bus => ({ bus, time: Math.ceil(leave / bus) * bus }))
  
  let nextBus = nextArrival[0]

  for (let i = 1; i < nextArrival.length; ++i) {
    if (nextArrival[i].time < nextBus.time) {
      nextBus = nextArrival[i]
    }
  }
  
  const starOne = nextBus.bus * (nextBus.time - leave)

  const checkTimestamp = timestamp => {
    if (timestamp % 100000000 === 0) {
      console.log('checking ', timestamp)
    }
    for (let i = 0; i < busses.length; ++i) {
      if (isNaN(busses[i])) {
        continue
      }
      if ((timestamp + i) % busses[i] !== 0) {
        return false
      }
    }
    return true
  }

  // let timestamp = 100000000000000
  // let works = checkTimestamp(timestamp)
  // while (!works) {
  //   timestamp += 1
  //   works = checkTimestamp(timestamp)
  // }

  const args = [[], []]
  for (let i = 0; i < busses.length; ++i) {
    if (isNaN(busses[i])) {
      continue
    }
    args[0].push(busses[i] - i % busses[i])
    console.log(i, busses[i], i % busses[i])
    args[1].push(busses[i])
  }
  
  console.log(args)

  // TODO: write this myselt without an external library
  const starTwo = crt(...args)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
