import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 2
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

// Parsed and mapped to be useful
const input = inputString.split('\n').map(s => {
  let minmax = s.split(':')[0]
  let min = Number(minmax.split('-')[0])
  let max = Number(minmax.split('-')[1].split(' ')[0])
  let char = minmax.split(' ')[1]
  return { pass: s.split(':')[1].trim(), min, max, char }
})

export const starOne = input.reduce((acc, v) => {
  const c = (v.pass.match(new RegExp(v.char, 'g')) || []).length
  if (c >= v.min && c <= v.max) {
      return acc + 1
  }
  return acc
}, 0)

export const starTwo = input.reduce((acc, v) => {
  if (v.pass[v.min - 1] == v.char && v.pass[v.max - 1] == v.char) {
      return acc
  } else if (v.pass[v.min - 1] == v.char || v.pass[v.max - 1] == v.char) {
      return acc + 1
  }
  return acc
}, 0)

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
