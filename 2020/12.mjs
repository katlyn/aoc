import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 12
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n')

  const followInput = () => {
    let bearing = 90
    let posX = 0
    let posY = 0

    const move = (dir, dist) => {
      switch (dir) {
        case 0:
          posX += dist
          break
        
        case 90:
          posY += dist
          break

        case 180:
          posX -= dist
          break

        case 270:
          posY -= dist
          break
      }
    }

    for (const instruction of input) {
      const ins = instruction[0]
      const val = Number(instruction.substr(1))
      
      switch (ins) {
        case 'F':
          move(bearing, val)
          break

        case 'N':
          move(0, val)
          break

        case 'E':
          move(90, val)
          break

        case 'S':
          move(180, val)
          break

        case 'W':
          move(270, val)
          break

        case 'L':
          bearing = (bearing - val + 360) % 360
          break

        case 'R':
          bearing = (bearing + val) % 360
          break
      }
    }

    return { bearing, posX, posY }
  }

  const res = followInput()
  
  const starOne = Math.abs(res.posX) + Math.abs(res.posY)
  
  const followInputTwo = () => {
    let bearing = 90
    let posX = 0
    let posY = 0

    let waypointX = 1
    let waypointY = 10

    const move = (dir, dist) => {
      switch (dir) {
        case 0:
          waypointX += dist
          break
        
        case 90:
          waypointY += dist
          break

        case 180:
          waypointX -= dist
          break

        case 270:
          waypointY -= dist
          break
      }
    }

    for (const instruction of input) {
      const ins = instruction[0]
      const val = Number(instruction.substr(1))
      
      switch (ins) {
        case 'F':
          posX += waypointX * val
          posY += waypointY * val
          break

        case 'N':
          move(0, val)
          break

        case 'E':
          move(90, val)
          break

        case 'S':
          move(180, val)
          break

        case 'W':
          move(270, val)
          break

        case 'L':
          for (let i = 0; i < val / 90; ++i) {
            const tempX = waypointX
            waypointX = waypointY
            waypointY = -tempX
          }
          break

        case 'R':
          for (let i = 0; i < val / 90; ++i) {
            const tempX = waypointX
            waypointX = -waypointY
            waypointY = tempX
          }
          break
      }
    }

    return { bearing, posX, posY }
  }

  const resTwo = followInputTwo()

  const starTwo = Math.abs(resTwo.posX) + Math.abs(resTwo.posY)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
