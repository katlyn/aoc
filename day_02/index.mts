import { readFileSync } from "node:fs"
const input = readFileSync(0, ).toString().trim().split('\n')

const total = {
  red: 12,
  green: 13,
  blue: 14
}

let starOne = 0
let starTwo = 0

for (let idx = 0; idx < input.length; idx++) {
  const line = input[idx]
  const minimums = { red: 0, green: 0, blue: 0 }
  let possible = true

  const drawStrings= line.split(": ")[1].split("; ")
  for (const drawString of drawStrings) {
    const counts = drawString.split(", ").map(s => s.split(" "))
    for (const count of counts) {
      const color = count[1]
      const num = Number(count[0])
      minimums[color] = Math.max(minimums[color], num)
      if (num > total[color]) possible = false
    }
  }
  starOne += possible ? idx + 1 : 0
  starTwo += minimums.red * minimums.green * minimums.blue
}

console.log(starOne, starTwo)
