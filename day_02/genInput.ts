import * as process from "process";

const TOTAL_GAMES = 100000
const MIN_ROUNDS = 20
const MAX_ROUNDS = 50

const MAX_CUBES_OF_COLOR = 14

function write (str: string) {
  process.stdout.write(str)
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

for (let gameId = 1; gameId <= TOTAL_GAMES; gameId++) {
  write(`Game ${gameId}: `)
  const numRounds = rand(MIN_ROUNDS, MAX_ROUNDS)
  for (let round = 0; round < numRounds; round++) {
    const cubes = {
      red: rand(0, MAX_CUBES_OF_COLOR),
      green: rand(0, MAX_CUBES_OF_COLOR),
      blue: rand(0, MAX_CUBES_OF_COLOR)
    }
    if (cubes.red + cubes.green + cubes.blue === 0) {
      // If no cubes were drawn, redo the round
      round--
      continue
    }
    if (cubes.red > 0) {
      write(`${cubes.red} red`)
      if (cubes.green + cubes.blue > 0) {
        write(", ")
      }
    }
    if (cubes.green > 0) {
      write(`${cubes.green} green`)
      if (cubes.blue > 0) {
        write(", ")
      }
    }
    if (cubes.blue > 0) {
      write(`${cubes.blue} blue`)
    }

    if (round < numRounds-1) {
      // Print semi between rounds
      write("; ")
    }
  }
  write("\n")
}
