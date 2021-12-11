import benchy
import std/parseutils
import std/sequtils
import std/strutils

var minOne = high(int)
var minTwo = high(int)

timeIt "Day 07":
  const input = readFile("./inputs/2021/07.txt").split(',').map(parseInt)
  for i in 0..input.max():
    block check:
      var scoreOne = 0
      var scoreTwo = 0
      for crab in input:
        let value = abs(i - crab)
        scoreOne += value
        scoreTwo += value * (value + 1) div 2
        if scoreOne > minOne and scoreTwo > minTwo:
          break check
      if scoreOne < minOne:
        minOne = scoreOne
      if scoreTwo < minTwo:
        minTwo = scoreTwo

echo "Star one: ", minOne
echo "Star two: ", minTwo
