import chalk from 'chalk'
import { sign } from 'crypto'
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
  let maxX = 0
  let maxY = 0
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(i => {
    const [x, y] = i.split(' -> ')
    const [x1, y1] = x.split(',').map(Number)
    const [x2, y2] = y.split(',').map(Number)
    maxX = Math.max(maxX, x1, x2)
    maxY = Math.max(maxY, y1, y2)
    return { x1, y1, x2, y2 }
  })

  const printMap = map => {
    for (let x = 0; x <= maxX; ++x) {
      let line = ''
      for (let y = 0; y <= maxY; ++y) {
        line += (map.get([x, y].toString()) || '.').toString().padStart(3, ' ')
      }
      console.log(line)
    }
  }

  const countMap = map => {
    let counter = 0
    for (const [key, val] of map) {
      if (val > 1) {
        ++counter
      }
    }
    return counter
  }

  const freqMap = new Map

  const setOrUpdate = (key, val) => {
    if (freqMap.has(key)) {
      freqMap.set(key, freqMap.get(key) + val)
    } else {
      freqMap.set(key, val)
    }
  }
  
  for (const path of input) {
    if (path.x1 === path.x2) {
      for (let i = Math.min(path.y1, path.y2); i <= Math.max(path.y1, path.y2); ++i) {
        setOrUpdate([path.x1, i].toString(), 1)
      }
    } else if (path.y1 === path.y2) {
      for (let i = Math.min(path.x1, path.x2); i <= Math.max(path.x1, path.x2); ++i) {
        setOrUpdate([i, path.y1].toString(), 1)
      }
    }
  }

  // printMap(freqMap)
  const starOne = countMap(freqMap)
  
  for (const path of input) {
    const {x1, x2, y1, y2} = path
    if (!(x1 === x2 || y1 === y2)) {
      let xInc = -Math.sign(x1 - x2)
      let yInc = -Math.sign(y1 - y2)
      
      let x = x1
      let y = y1
      while (x !== x2 + xInc) {
        setOrUpdate([x, y].toString(), 1)
        x += xInc
        y += yInc
      }
    }
  }

  // console.log()
  // printMap(freqMap)
  const starTwo = countMap(freqMap)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
