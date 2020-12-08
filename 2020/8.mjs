import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 8
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n').map(i => {
    const [instruction, numString] = i.split(' ')
    return {
      instruction,
      arg: Number(numString)
    }
  })
  
  const runVM = input => {
    let acc = 0
    let i = 0
    const visited = Array(input.length).fill(false)
    const trace = []
  
    while (i < input.length && !visited[i]) {
      trace.push(i)
      //console.log(acc, i, input[i].instruction, input[i].arg, visited[i], trace.length)
      visited[i] = true
      //console.log(acc, i, input[i].instruction, input[i].arg, visited[i], trace.length)
      switch (input[i].instruction) {
        case 'nop':
          ++i
          break
        
        case 'acc':
          acc += input[i].arg
          ++i
          break
        
        case 'jmp':
          i += input[i].arg
          break
      }
    }
    return { acc, i, trace }
  }
  
  const { acc: starOne } = runVM(input)
  
  const repairInput = input => {
    let res = runVM(input)
    const { trace } = res
  
    for (const ins of trace) {
      if (input[ins].instruction === 'nop') {
        input[ins].instruction = 'jmp'
      } else if (input[ins].instruction === 'jmp') {
        input[ins].instruction = 'nop'
      }
  
      res = runVM(input)
  
      if (res.i === input.length) {
        return res
      }
  
      if (input[ins].instruction === 'nop') {
        input[ins].instruction = 'jmp'
      } else if (input[ins].instruction === 'jmp') {
        input[ins].instruction = 'nop'
      }
    }
  }
  
  const { acc: starTwo } = repairInput(input)

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
