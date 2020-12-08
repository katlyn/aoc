import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 4
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const input = inputString.split('\n\n').map(p => {
    const keys = p.split(/\s+/)
    const obj = {}
    keys.forEach(k => {
      const [key, value] = k.split(':')
      obj[key] = value
    })
    return obj
  })
  
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  
  const validators = {
    byr: val => Number(val) >= 1920 && Number(val) <= 2002,
    iyr: val => Number(val) >= 2010 && Number(val) <= 2020,
    eyr: val => Number(val) >= 2020 && Number(val) <= 2030,
    hgt: val => {
      const height = Number(val.slice(0, -2))
      if (val.endsWith('cm')) {
        return height >= 150 && height <= 195
      } else {
        return height >= 59 && height <= 76
      }
    },
    hcl: val => /^#[0-9a-f]{6}$/i.test(val),
    ecl: val => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
    pid: val => val.length === 9 && !isNaN(Number(val))
  }
  
  const starOne = input.filter(
    passport => requiredFields.every(
      key => Object.keys(passport).includes(key)
    )
  ).length
  
  const starTwo = input.filter(
    passport => requiredFields.every(
      key => (
        Object.keys(passport).includes(key) && validators[key](passport[key])
      )
    )
  ).length

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
