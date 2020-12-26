import chalk from 'chalk'
import esmain from 'es-main'
import { promises as fs } from 'fs'
import path from 'path'

export const day = 17
const year = 2020

const __dirname = path.dirname(import.meta.url).slice(7)
const inputPath = path.join(__dirname, `../inputs/${year}/${day}.txt`)
const inputString = (await fs.readFile(inputPath)).toString()

export const solve = () => {
  // Parsed and mapped to be useful
  const initialWorld = new Set
  const initialWorld4D = new Set
  const initialBounds = Math.floor(inputString.indexOf('\n') / 2)
  inputString.split('\n').map((l, x) => {
    l.split('').forEach((val, y) => {
      if (val === '#') {
        initialWorld.add([x-initialBounds, y-initialBounds, 0].join())
        initialWorld.add([x-initialBounds, y-initialBounds, 0, 0].join())
      }
    })
  })

  let cycle = 0
  const runCycle = world => {
    ++cycle
    let bounds = initialBounds + cycle
    const newWorld = new Set

    for (let x = -bounds; x <= bounds; ++x) {
      for (let y = -bounds; y <= bounds; ++y) {
        for (let z = -bounds+1; z <= bounds-1; ++z) {
          let neighbors = 0
          for (let offsetX = -1; offsetX <= 1; ++offsetX) {
            for (let offsetY = -1; offsetY <= 1; ++offsetY) {
              for (let offsetZ = -1; offsetZ <= 1; ++offsetZ) {
                if (
                  !(offsetX === 0 && offsetY === 0 && offsetZ === 0) &&
                  world.has([x + offsetX, y + offsetY, z + offsetZ].join())
                ) {
                  ++neighbors
                }
              }
            }
          }

          if (world.has([x, y, z].join())) {
            if ([2, 3].includes(neighbors)) {
              newWorld.add([x, y, z].join())
            }
          } else {
            if (neighbors === 3) {
              newWorld.add([x, y, z].join())
            }
          }
        }
      }
    }
    return newWorld
  }

  let state = initialWorld
  while (cycle < 6) {
    state = runCycle(state)
  }

  
  const starOne = state.size

  let cycle4D = 0
  const runCycle4D = world => {++cycle
    ++cycle4D
    let bounds = initialBounds + cycle4D
    const newWorld = new Set

    for (let x = -bounds; x <= bounds; ++x) {
      for (let y = -bounds; y <= bounds; ++y) {
        for (let z = -bounds+1; z <= bounds-1; ++z) {
          for (let a = -bounds+1; a <= bounds-1; ++a) {
            let neighbors = 0
            for (let offsetX = -1; offsetX <= 1; ++offsetX) {
              for (let offsetY = -1; offsetY <= 1; ++offsetY) {
                for (let offsetZ = -1; offsetZ <= 1; ++offsetZ) {
                  for (let offsetA = -1; offsetA <= 1; ++offsetA) {
                    if (
                      !(offsetX === 0 && offsetY === 0 && offsetZ === 0 && offsetA === 0) &&
                      world.has([x + offsetX, y + offsetY, z + offsetZ, a + offsetA].join())
                    ) {
                      ++neighbors
                    }
                  }
                }
              }
            }

            if (world.has([x, y, z, a].join())) {
              if ([2, 3].includes(neighbors)) {
                newWorld.add([x, y, z, a].join())
              }
            } else {
              if (neighbors === 3) {
                newWorld.add([x, y, z, a].join())
              }
            }
          }
        }
      }
    }
    return newWorld
  }

  let state4D = initialWorld
  while (cycle4D < 6) {
    state4D = runCycle4D(state4D)
  }
  
  const starTwo = state4D.size

  return { starOne, starTwo }
}

if (esmain(import.meta)) {
  const { starOne, starTwo } = solve()
  console.log(`${year} | Day ${day}`)
  console.log(chalk.blueBright('Star 1:'), chalk.bold(starOne))
  console.log(chalk.greenBright('Star 2:'), chalk.bold(starTwo))
}
