import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 18
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  const equationParser = str => {
    const eq = []
    let currentNum = 0
    for (let i = 0; i < str.length; ++i) {
      switch (str[i]) {
        case ' ':
          continue

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          currentNum = currentNum * 10 + Number(str[i])
          break

        case '(':
          // scan for closing paren
          let opens = 1
          let origIndex = i
          while (opens !== 0) {
            ++i
            if (str[i] === '(') {
              ++opens
            } else if (str[i] === ')') {
              --opens
            }
          }
          const nested = equationParser(str.substring(origIndex + 1, i))
          eq.push(nested)
          break

        default:
          if (currentNum !== 0) {
            eq.push(currentNum)
            currentNum = 0
          }
          eq.push(str[i])
      }
    }
    if (currentNum !== 0) {
      eq.push(currentNum)
    }
    return eq
  }

  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(equationParser)

  const euqationSolver = eq => {
    let res = 0
    let op = '+'
    for (let term of eq) {
      if ('+*'.includes(term)) {
        op = term
        continue
      }
      if (Array.isArray(term)) {
        term = euqationSolver(term)
      }

      switch (op) {
        case '+':
          res += term
          break

        case '*':
          res *= term
          break
      }
    }
    return res
  }

  const starOne = input.map(euqationSolver).reduce((acc, r) => acc + r, 0)
  
  const euqationSolverPrecidence = eq => {
    let opIndex = eq.indexOf('+')
    while (opIndex !== -1) {
      const items = eq.splice(opIndex, 2)
      if (Array.isArray(eq[opIndex - 1])) {
        eq[opIndex - 1] = euqationSolverPrecidence(eq[opIndex - 1])
      }
      if (Array.isArray(items[1])) {
        items[1] = euqationSolverPrecidence(items[1])
      }
      eq[opIndex - 1] = eq[opIndex - 1] + items[1]
      opIndex = eq.indexOf('+')
    }

    opIndex = eq.indexOf('*')
    while (opIndex !== -1) {
      const items = eq.splice(opIndex, 2)
      if (Array.isArray(eq[opIndex - 1])) {
        eq[opIndex - 1] = euqationSolverPrecidence(eq[opIndex - 1])
      }
      if (Array.isArray(items[1])) {
        items[1] = euqationSolverPrecidence(items[1])
      }
      eq[opIndex - 1] = eq[opIndex - 1] * items[1]
      opIndex = eq.indexOf('*')
    }
    
    return eq[0]
  }

  const starTwo = input.map(euqationSolverPrecidence).reduce((acc, r) => acc + r, 0)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
