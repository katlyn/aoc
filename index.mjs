import chalk from 'chalk'
import { promises as fs } from 'fs'
import path from 'path'

// Get the directory this file is in, slice off file://
const __dirname = path.dirname(import.meta.url).slice(7)
const dirs = await fs.readdir(__dirname)

// All year dirs will be valid numbers, sort for the most recent one
const years = dirs.filter(y => !isNaN(y)).sort((a, b) => Number(b) - Number(a))
const recentYear = years [0]

const solutions = await fs.readdir(path.join(__dirname, recentYear))

console.log(`Solutions for ${recentYear}`)
console.log('__________________')
for (const solution of solutions) {
  const { day, starOne, starTwo } = await import(path.join(__dirname, recentYear, solution))
  console.log(
    day.toString().padEnd(3),
    chalk.blueBright(starOne.toString().padEnd(16)),
    chalk.greenBright(starTwo.toString().padEnd(16))
  )
}
