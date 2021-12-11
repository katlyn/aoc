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
  const input = inputString.split(',').map(Number)

  let fishies = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  for (const fish of input) {
    fishies[fish]++
  }
  
  function spawn () {
    const toSpawn = fishies.shift()
    fishies.push(toSpawn)
    fishies[6] += toSpawn
  }

  for (let i = 0; i < 80; ++i) {
    spawn()
  }

  const starOne = fishies.reduce((acc, c) => acc + c, 0)
  

  for (let i = 80; i < 256; ++i) {
    spawn()
  }

  const starTwo = fishies.reduce((acc, c) => acc + c, 0)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
