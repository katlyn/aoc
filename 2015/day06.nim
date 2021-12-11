import std/parseutils
import std/sequtils
import std/strutils
import unpack

let input = readFile("./inputs/2015/06.txt").split('\n')

var lights = newSeqWith(1000, newSeq[bool](1000))
var lightLevels = newSeqWith(1000, newSeq[int](1000))
for line in input:
  var instruction: string
  let index = line.parseUntil(instruction, Digits)
  let coords = line.substr(index).split(' ')
  [x1, y1] <- coords[0].split(',').map(parseInt)
  [x2, y2] <- coords[2].split(',').map(parseInt)
  for x in x1..x2:
    for y in y1..y2:
      if instruction == "toggle ":
        lights[x][y] = not lights[x][y]
        lightLevels[x][y] += 2
      elif instruction == "turn on ":
        lights[x][y] = true
        lightLevels[x][y] += 1
      else:
        lights[x][y] = false
        if lightLevels[x][y] > 0:
          lightLevels[x][y] -= 1

echo "Star one: ", lights.foldl(a + b.foldl(a.ord() + b.ord(), 0), 0)
echo "Star two: ", lightLevels.foldl(a + b.foldl(a + b), 0)
