import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 16
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n\n')

  const rules = input[0].split('\n').map(r => {
    const [name, valuesString] = r.split(': ')
    const values = valuesString.split(' or ').map(v => v.split('-').map(Number))
    return { name, values }
  })

  const myTicket = input[1].split('\n')[1].split(',').map(Number)
  const nearbyTickets = input[2].split('\n').map(l => l.split(',').map(Number))
  nearbyTickets.shift() // remove dummy line

  const validateTickets = () => {
    let invalidSum = 0
    const validTickets = []

    for (const ticket of nearbyTickets) {
      let validTicket = true
      for (const field of ticket) {
        let valid = false
        for (const rule of rules) {
          for (const value of rule.values) {
            if (value[0] <= field && field <= value[1]) {
              valid = true
              break
            }
          }
        }
        if (!valid) {
          invalidSum += field
          validTicket = false
        }
      }
      if (validTicket) {
        validTickets.push(ticket)
      }
    }
    return [invalidSum, validTickets]
  }
  
  const [starOne, validTickets] = validateTickets()

  const ruleMatches = []
  
  for (let i = 0; i < myTicket.length; i++) {
    ruleMatches.push([])
    for (const rule of rules) {
      if (ruleMatches.includes(rule)) {
        continue
      }
      let failure = false
      for (const ticket of validTickets) {
        let valid = false
        for (const value of rule.values) {
          if (value[0] <= ticket[i] && ticket[i] <= value[1]) {
            valid = true
            break
          }
        }
        if (!valid) {
          failure = true
        }
        if (failure) {
          break
        }
      }
      if (!failure) {
        ruleMatches[i].push(rule.name)
      }
    }
  }
  
  const rows = new Array(ruleMatches.length)

  while (rows.includes(undefined)) {
    for (let i = 0; i < ruleMatches.length; ++i) {
      if (rows[i] !== '' && ruleMatches[i].length === 1) {
        rows[i] = ruleMatches[i][0]

        // Remove rule from other things
        for (let r = 0; r < ruleMatches.length; ++r) {
          ruleMatches[r] = ruleMatches[r].filter(s => s !== rows[i])
        }
      }
    }
  }

  let starTwo = 1

  for (let i = 0; i < rows.length; ++i) {
    if (rows[i].startsWith('departure')) {
      starTwo *= myTicket[i]
    }
  }

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
