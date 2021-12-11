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
  const input = inputString.split('\n').map(v => parseInt(v, 2))
  const bits = inputString.indexOf('\n') // First newline happens after the first full number

  let gamma = 0
  let epsilon = 0

  let o2Rating = [...input]
  let co2Rating = [...input]

  for (let bit = bits - 1; bit >= 0; --bit) {
    let count = 0
    for (const num of input) {
      count += (num >>> bit) & 1
    }

    let bitVal = Number(count > input.length / 2)
    gamma |= bitVal << bit
    epsilon |= !bitVal << bit

    // Part 2 - O2 Generator Rating
    count = 0
    for (const num of o2Rating) {
      count += (num >>> bit) & 1
    }

    bitVal = Number(count >= o2Rating.length / 2)
    if (o2Rating.length > 1) {
      o2Rating = o2Rating.filter(v => (v >>> bit & 1) === bitVal)
    }

    // Part 2 - CO2 Scrubber Rating
    count = 0
    for (const num of co2Rating) {
      count += (num >>> bit) & 1
    }

    bitVal = Number(count < co2Rating.length / 2)
    if (co2Rating.length > 1) {
      co2Rating = co2Rating.filter(v => (v >>> bit & 1) === bitVal)
    }
  }

  const starOne = gamma * epsilon
  const starTwo = o2Rating[0] * co2Rating[0]

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log('Star 1:', starOne, '\nStar 2:', starTwo)
}
