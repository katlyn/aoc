import std/strutils

const input = readFile("./inputs/2015/05.txt").split('\n')

const vowels = ['a', 'e', 'i', 'o', 'u']
const naughty = ["ab", "cd", "pq", "xy"]

var niceStrings = 0
for str in input:
  block checkloop:
    var vowelCount = 0
    var hasDouble = false
    for idx in 0..<str.len:
      if str[idx] in vowels:
        vowelCount += 1
      if idx < str.len - 1:
        if str[idx] == str[idx + 1]:
          hasDouble = true
        if str[idx] & str[idx + 1] in naughty:
          break checkloop
    if vowelCount >= 3 and hasDouble:
      niceStrings += 1

echo "Star one: ", niceStrings

niceStrings = 0
for str in input:
  var hasPair = false
  var hasMirror = false
  for idx in 0 ..< str.len - 2:
    if str[idx] == str[idx+2]:
      hasMirror = true
    if str.count(str[idx..idx+1]) > 1:
      hasPair = true
  if hasPair and hasMirror:
    niceStrings += 1
      
echo "Star two: ", niceStrings
