let directions = readFile("./inputs/2015/01.txt")

var floor = 0
var pos = 0
for idx, c in directions:
  floor += (if c == '(': 1 else: -1)
  if pos == 0 and floor < 0:
    pos = idx + 1

echo "Star one: ", floor
echo "Star two: ", pos
