import std/algorithm
import std/strutils
import std/tables

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}.toTable
const errorScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}.toTable
const completionScores = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}.toTable

const input = readFile("./inputs/2021/10.txt").split('\n')

var errorScore = 0
var completions: seq[int] = @[]

for idx, line in input:
  block checkSyntax:
    var tree: seq[char] = @[]
    for c in line:
      if pairs.hasKey(c):
        tree.add(c)
      elif pairs[tree[^1]] == c:
        discard tree.pop()
      else:
        errorScore += errorScores[c]
        break checkSyntax
    if tree.len > 0:
      var score = 0
      while tree.len > 0:
        score *= 5
        score += completionScores[tree.pop()]
      completions.add(score)

completions.sort()

echo "Star one: ", errorScore
echo "Star two: ", completions[(completions.len / 2).int]
