import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 6
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

// Parsed and mapped to be useful
const input = inputString.split('\n\n').map(g => {
  const members = g.split('\n')
  const answers = []
  const answerMap = new Map
  for (const m of members) {
    const q = m.split('')
    q.forEach(a => {
      answerMap.set(a, 1 + (answerMap.get(a) ?? 0))
    })
  }
  answerMap.forEach((c, k) => {
    if (c === members.length) {
      answers.push(k)
    }
  })
  return [Array.from(answerMap.keys()), answers]
})

export const starOne = input.reduce((acc, i) => acc + i[0].length, 0)

export const starTwo = input.reduce((acc, i) => acc + i[1].length, 0)

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
