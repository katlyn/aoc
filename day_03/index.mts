import { readFileSync } from "node:fs"
const raw = readFileSync(0, ).toString().trim()

const solve = () => {
  const input = raw.split("\n")
  let partsSum = 0
  let gearRatios = 0
// Each gear has at most two parts next to it, no need to worry about
  const gears = new Map<string, number>()

  const nonSymbols = "1234567890."

  for (let x = 0; x < input.length; x++) {
    const line = input[x]
    for (let y = 0; y < line.length; y++) {
      if (line[y] === "." || !nonSymbols.includes(line[y])) {
        continue
      }

      let isPartNum = false
      const num = parseInt(line.substring(y))
      const numString = num.toString()

      symbolCheck: for (let offsetY = -1; offsetY <= numString.length; offsetY++) {
        // How much we should increment x by, done so we skip checking chars that are part of number
        const xInc = offsetY >= numString.length && offsetY < numString.length ? 2 : 1
        for (let offsetX = -1; offsetX <= 1; offsetX += xInc) {
          const char = input[x + offsetX]?.[y + offsetY]
          if (char !== undefined && !nonSymbols.includes(char)) {
            isPartNum = true

            if (char === "*") {
              const key = `${x + offsetX},${y + offsetY}`
              if (!gears.has(key)) {
                gears.set(key, num)
              } else {
                gearRatios += gears.get(key) * num
              }
            }
            break symbolCheck
          }
        }
      }
      if (isPartNum) {
        process.stdout.write(num.toString() + " ")
      }
      partsSum += +isPartNum * num
      y += numString.length
    }
  }
  return [partsSum, gearRatios]
}

// const times: number[] = []
// const runs = 50000
// for (let i = 0; i < runs; i++) {
//   const start = performance.now()
//   solve()
//   const end = performance.now()
//   times.push(end - start)
// }
// console.log("took an average of", times.reduce((a, b) => a + b) / times.length, "ms across", runs, "runs")

const [starOne, starTwo] = solve()
console.log(starOne, starTwo)
