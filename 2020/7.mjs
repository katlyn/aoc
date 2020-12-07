import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 7
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

// Parsed and mapped to be useful
const input = new Map
inputString.split('\n').forEach(line => {
  const [bag, containsString] = line.split('bags contain').map(s => s.trim())
  if (containsString === 'no other bags.') {
    input.set(bag, [])
    return
  }
  const contains = containsString.split(/bags?,\s+/g).map(b => {
    const count = Number(b.substr(0, b.indexOf(' ')))
    const color = b.substr(b.indexOf(' ') + 1).replace(/bags?\.?/, '').trim()
    return {color, count}
  })
  input.set(bag, contains)
})

const findCount = (color, target) => {
  const contains = input.get(color)
  let acc = 0
  for (const bag of contains) {
    if (bag.color === target) {
      acc += bag.count
    }
    acc += findCount(bag.color, target)
  }
  return acc
}

export let starOne = 0

for (const [key] of input) {
  if (findCount(key, 'shiny gold') > 0) {
    ++starOne
  }
}

const countBags = bag => {
  let acc = 0
  const contains = input.get(bag)
  for (const b of contains) {
    acc += b.count
    acc += countBags(b.color) * b.count
  }
  return acc
}

export const starTwo = countBags('shiny gold')

if (esmain(import.meta)) {
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
