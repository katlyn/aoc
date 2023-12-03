import { readFileSync } from "node:fs"
const input = readFileSync(0, ).toString().trim()

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const lines = input.split("\n")

let starOne = lines.map(line => {
  return line.split("").map(Number).filter(v => !isNaN(v))
}).reduce((acc, curr) => {
  return acc + curr[0] * 10 + curr[curr.length - 1]
}, 0)

let starTwo = lines.map(line => {
  const arr = new Array(line.length)
  for (let i = 0; i < line.length; i++) {
    for (const num in numberMap) {
      if (line.startsWith(num, i)) {
        arr[i] = numberMap[num]
      } else {
        arr[i] = line[i]
      }
    }
  }
  return arr.map(Number).filter(v => !isNaN(v))
}).reduce((acc, curr) => {
  return acc + curr[0] * 10 + curr[curr.length - 1]
}, 0)

// Solve here


console.log(starOne, starTwo)
