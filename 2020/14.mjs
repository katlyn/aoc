import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 14
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(l => {
    const [ins, val] = l.split(' = ')
    return {
      ins,
      val
    }
  })

  const runProgram = instructions => {
    const mem = new Map
    let mask = ''

    for (const instruction of instructions) {
      switch (instruction.ins) {
        case 'mask':
          mask = instruction.val
          break

        default:
          const position = Number(instruction.ins.slice(4, -1))
          let num = Number(instruction.val).toString(2).padStart(36, 0)

          for (let i = 0; i < mask.length; ++i) {
            if (mask[i] === 'X') {
              continue
            }
            num = num.substring(0,i) + mask[i] + num.substring(i+1)
          }

          mem.set(position, parseInt(num, 2))
      }
    }

    let acc = 0
    for (const [key, val] of mem) {
      acc += val
    }

    return acc
  }

  const starOne = runProgram(input)

  const runProgramTwo = instructions => {
    const mem = new Map
    let mask = ''

    const writeMem = (pos, value) => {
      if (pos.includes('X')) {
        writeMem(pos.replace('X', '0'), value)
        writeMem(pos.replace('X', '1'), value)
      } else {
        mem.set(parseInt(pos, 2), value)
      }
    }

    for (const instruction of instructions) {
      switch (instruction.ins) {
        case 'mask':
          mask = instruction.val
          break

        default:
          let position = Number(instruction.ins.slice(4, -1)).toString(2).padStart(36, 0).split('')
          const num = Number(instruction.val)

          for (let i = 0; i < mask.length; ++i) {
            if (mask[0] !== '0') {
              position[i] = mask[i]
            }
          }

          writeMem(position.join(''), num)
      }
    }

    let acc = 0
    for (const [key, val] of mem) {
      acc += val
    }

    return acc
  }

  const starTwo = runProgramTwo(input)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
