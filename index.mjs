import chalk from 'chalk'
import { promises as fs } from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'

// Get the directory this file is in, slice off file://
const __dirname = path.dirname(import.meta.url).slice(7)
const dirs = await fs.readdir(__dirname)

// All year dirs will be valid numbers, sort for the most recent one
const years = dirs.filter(y => !isNaN(y)).sort((a, b) => Number(b) - Number(a))
const recentYear = years [0]

const solutions = await fs.readdir(path.join(__dirname, recentYear))

console.log(`Solutions for ${recentYear}`)
console.log(chalk.dim('Day         Star One         Star Two     Execution time'))
let totalElapsed = 0
for (const solution of solutions) {
  const before = performance.now()
  const { day, starOne, starTwo } = await import(path.join(__dirname, recentYear, solution))
  const after = performance.now()
  const elapsed = after - before
  totalElapsed += elapsed
  console.log(
    day.toString().padStart(3),
    chalk.blueBright(starOne.toString().padStart(16)),
    chalk.greenBright(starTwo.toString().padStart(16)),
    chalk.dim(`${elapsed.toFixed(3).padStart(16)}ms`)
  )
}
console.log(chalk.dim(`\nAll solutions run in ${totalElapsed.toFixed(5)}ms`))
