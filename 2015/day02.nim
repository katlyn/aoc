import algorithm
import parseutils
import sequtils
import strutils

let input = readFile("./inputs/2015/02.txt").split('\n')

var paperNeeded = 0
var ribbonNeeded = 0
for gift in input:
  var dims = gift.split('x').map(parseInt)
  dims.sort()
  paperNeeded += 2 * (dims[0] * dims[1] + dims[1] * dims[2] + dims[2] * dims[0]) + dims[0] * dims[1]
  ribbonNeeded += dims[0] * 2 + dims[1] * 2 + dims.foldl(a * b)

echo "Star one: ", paperNeeded
echo "Star two: ", ribbonNeeded
