import std/md5
import std/strformat
import std/strutils

let secret = readFile("./inputs/2015/04.txt")

for i in 1..high(int):
  let hash = getMD5(fmt"{secret}{i}")
  if hash.startsWith("00000"):
    echo "Star one: ", i
    break

for i in 1..high(int):
  let hash = getMD5(fmt"{secret}{i}")
  if hash.startsWith("000000"):
    echo "Star two: ", i
    break
