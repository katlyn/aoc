import chalk from 'chalk'
import { promises as fs } from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'

const SOLVER_ITERATIONS = process.env.SOLVER_ITERATIONS === undefined ? 1000 : Number(process.env.SOLVER_ITERATIONS)

// Get the directory this file is in, slice off file://
const __dirname = path.dirname(import.meta.url).slice(7)
const dirs = await fs.readdir(__dirname)

// All year dirs will be valid numbers, sort for the most recent one
const years = dirs.filter(y => !isNaN(y)).sort((a, b) => Number(b) - Number(a))
const recentYear = years[0]

const solutionFiles = await fs.readdir(path.join(__dirname, recentYear))
const solutionImports = await Promise.all(solutionFiles.map(f => import(path.join(__dirname, recentYear, f))))
const solutions = solutionImports.sort((a, b) => a.day - b.day)

console.log(`Solutions for ${recentYear} - Averaging over ${SOLVER_ITERATIONS} solves`)
console.log(chalk.dim('Day         Star One         Star Two      Avg Execution'))
let totalElapsed = 0
for (const solution of solutions) {
  const { day, solve } = solution
  const times = []
  for (let i = 0; i < SOLVER_ITERATIONS; ++i) {
    const before = performance.now()
    solve()
    const after = performance.now()
    times.push(after - before)
  }
  const { starOne, starTwo } = solve()
  const average = times.reduce((a, b) => a + b) / times.length
  totalElapsed += average
  console.log(
    day.toString().padStart(3),
    chalk.blueBright(starOne.toString().padStart(16)),
    chalk.greenBright(starTwo.toString().padStart(16)),
    chalk.dim(`${average.toFixed(3).padStart(16)}ms`)
  )
}
console.log(chalk.dim(`\nAll solutions run in an average of ${totalElapsed.toFixed(5)}ms`))
