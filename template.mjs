import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'

const day = 1
const year = 2020

const inputString = (await fs.readFile(`./inputs/${year}/${day}.txt`)).toString()

const input = inputString

export const starOne = 0

export const starTwo = 0

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.yellowBright('Star 2:'), chalk.bold(starTwo))
}
