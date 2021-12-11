import std/algorithm
import std/sets
import std/sequtils
import std/strutils
import std/sugar

from unpack import `<-`

type Coordinate = array[2, int]

let input = readFile("./inputs/2021/09.txt").split('\n').map(l => l.toSeq().map(s => parseInt($s)))

var lowPoints: seq[Coordinate] = @[]
var basins: seq[HashSet[Coordinate]] = @[]

proc fillBasin (start: Coordinate): HashSet[Coordinate] =
  var queue: seq[Coordinate] = @[start]
  while queue.len > 0:
    let coord = queue.pop()
    [x, y] <- coord
    if input[x][y] == 9 or coord in result: continue
    result.incl(coord)
    if x > 0:
      queue.add([x-1, y])
    if x < input.len - 1:
      queue.add([x+1, y])
    if y > 0:
      queue.add([x, y-1])
    if y < input[x].len - 1:
      queue.add([x, y+1])

lowPoints = @[]
basins = @[]
for x in 0..<input.len:
  for y in 0..<input[x].len:
    var lower = true
    if x > 0:
      lower = lower and (input[x][y] < input[x-1][y])
    if x < input.len - 1:
      lower = lower and (input[x][y] < input[x+1][y])
    if y > 0:
      lower = lower and (input[x][y] < input[x][y-1])
    if y < input[x].len - 1:
      lower = lower and (input[x][y] < input[x][y+1])
    if lower:
      lowPoints.add([x, y])
      # echo fmt"{x}, {y}: {input[x][y]}"

for lowPoint in lowPoints:
  let basin = fillBasin(lowPoint)
  if not (basin in basins):
    basins.add(basin)

basins.sort((a, b) => a.len < b.len)

echo "Star one: ", lowPoints.foldl(input[b[0]][b[1]] + a + 1, 0)
echo "Star two: ", basins[0..2].foldl(a * b.len, 1)
