import strutils
import sequtils
import parseutils

let input = readFile("./inputs/2021/06.txt").split(',').map(parseInt)

var fishies = @[0, 0, 0, 0, 0, 0, 0, 0, 0]

for fish in input:
  fishies[fish] += 1

proc spawn(): void =
  let toSpawn = fishies[0]
  fishies.delete(0)
  fishies[6] += toSpawn
  fishies.add(toSpawn)

for i in 0..<80:
  spawn()

echo "Star one: ", fishies.foldl(a + b)

for i in 80..<256:
  spawn()

echo "Star two: ", fishies.foldl(a + b)
