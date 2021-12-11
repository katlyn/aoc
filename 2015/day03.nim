import strformat
import strutils
import tables

let input = readFile("./inputs/2015/03.txt")

var x = 0
var y = 0

var nextPos = [[0, 0], [0, 0]]

var houseMap = initTable[string, int]()
var roboHouseMap = initTable[string, int]()

for idx, c in input:
  houseMap[fmt"{x},{y}"] = houseMap.getOrDefault(fmt"{x},{y}", 0) + 1

  let robo = idx %% 2
  roboHouseMap[fmt"{nextPos[robo][0]},{nextPos[robo][1]}"] = roboHouseMap.getOrDefault(fmt"{nextPos[robo][0]},{nextPos[robo][1]}", 0) + 1
  case c:
    of '<':
      x -= 1
      nextPos[robo][0] -= 1
    of '>':
      x += 1
      nextPos[robo][0] += 1
    of 'v':
      y -= 1
      nextPos[robo][1] -= 1
    of '^':
      y += 1
      nextPos[robo][1] += 1
    else: discard

var doubleHouses = 0
for key, value in houseMap:
  if value > 0:
    doubleHouses += 1

var roboDoubles = 0
for key, value in roboHouseMap:
  if value > 0:
    roboDoubles += 1

echo "Star one: ", doubleHouses
echo "Star two: ", roboDoubles
