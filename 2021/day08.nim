import std/math
import std/sequtils
import std/strutils
import std/sugar

import benchy
import unpack

proc findIndex*[T](s: openArray[T], pred: proc(x: T): bool {.closure.}): int {.inline.}=
  ## Returns the first index where `predicate(item)` returns true, or -1 if not found.
  result = 0
  for i in 0 ..< s.len:
    if pred(s[i]):
      return
    inc(result)
  result = -1


const input = readFile("./inputs/2021/08.txt").split('\n')
var easyDigits = 0
var sum = 0
timeIt "Day 08":
  easyDigits = 0
  sum = 0
  for line in input:
    [uniqueDigits, toDecode] <- line.split(" | ").map(s => s.splitWhitespace().map(proc(s: string): set[char] =
      result = {}
      for c in s:
        result.incl(c)
    ))
    var digitLengths = newSeqWith(8, newSeq[set[char]]())
    var hints = newSeq[set[char]](10)
    for digit in uniqueDigits:
      case digit.len:
        of 2:
          hints[1] = digit
        of 3:
          hints[7] = digit
        of 4:
          hints[4] = digit
        of 7:
          hints[8] = digit
        else:
          digitLengths[digit.len].add(digit)

    let three = digitLengths[5].findIndex(s => s > hints[7])
    hints[3] = digitLengths[5][three]
    digitLengths[5].del(three)

    let nine = digitLengths[6].findIndex(s => s > hints[3])
    hints[9] = digitLengths[6][nine]
    digitLengths[6].del(nine)

    let five = digitLengths[5].findIndex(s => s < hints[9])
    hints[5] = digitLengths[5][five]
    digitLengths[5].del(five)

    hints[2] = digitLengths[5][0]

    let six = digitLengths[6].findIndex(s => s > hints[5])
    hints[6] = digitLengths[6][six]
    digitLengths[6].del(six)

    hints[0] = digitLengths[6][0]

    for idx, digit in toDecode:
      if digit.len in [2, 3, 4, 7]: easyDigits += 1
      let val = hints.find(digit)
      sum += val * 10 ^ (3 - idx)


echo "Star one: ", easyDigits
echo "Star two: ", sum
