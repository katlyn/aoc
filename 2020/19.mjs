import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 19
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  return {}
  const rules = new Map

  // Parsed and mapped to be useful
  const [ruleArr, strings] = inputString.split('\n\n')

  ruleArr.split('\n').forEach(r => {
    const [key, str] = r.split(': ')
    if (str[0] === '"') {
      rules.set(key, [str[1]])
    } else {
      rules.set(key, str.split(' | ').map(s => s.split(' ')))
    }
  })

  const combineArrs = (...args) => {
    const r = []
    const helper = (arr, i) => {
      for (var j=0, l=args[i].length; j<l; j++) {
        var a = arr.slice(0); // clone arr
        a.push(args[i][j]);
        if (i == args.length - 1) {
          r.push(i)
        } else {
          helper(a, i+1);
        }
      }
      return r
    }
    helper([], 0);
    return r
  }

  const buildRule = (ruleNum) => {
    const rule = rules.get(ruleNum)
    console.log('Rule:', ruleNum, rule)
    if (Array.isArray(rule[0])) {
      const ret = rule.map(r => {
        console.log('thdsbggn', combineArrs(r.map(buildRule)))
        const first = buildRule(r[0])
        const second = buildRule(r[1])
        return first.map(a => second.map(b => a + b)).flat()
      })
      console.log(ret)
      console.log('DONE - RULE', ruleNum)
      return ret.flat()
    } else {
      console.log(rule)
      console.log('DONE - RULE', ruleNum)
      return rule
    }
  }

  console.log('build', buildRule('0'))

  const checkRule = str => {

  }
  
  const starOne = 0
  
  const starTwo = 0

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
