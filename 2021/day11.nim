import std/sequtils
import std/strutils
import std/sugar

var octos = readFile("./inputs/2021/11.txt").split('\n').map(l => l.toSeq().map(s => parseInt($s)))
var flashes = 0
var allFlash = -1

proc doTick (): int =
  for x in 0..<octos.len:
    for y in 0..<octos[x].len:
      octos[x][y] += 1

  while true:
    var flashCount = 0
    for x in 0..<octos.len:
      for y in 0..<octos[x].len:
        if octos[x][y] > 9:
          octos[x][y] = low(int)
          flashCount += 1
          for dx in -1..1:
            for dy in -1..1:
              let nx = x + dx
              let ny = y + dy
              if nx > -1 and nx < octos.len and ny > -1 and ny < octos[x].len:
                  octos[nx][ny] += 1
    if flashCount == 0:
      break

  for x in 0..<octos.len:
    for y in 0..<octos[x].len:
      if octos[x][y] < 0:
        octos[x][y] = 0
        result += 1

for i in 0..<100:
  flashes += doTick()

for i in 100..high(int):
  discard doTick()
  if octos.allIt(it.allIt(it == 0)):
    allFlash = i + 1
    break


echo "Star one: ", flashes
echo "Star two: ", allFlash
