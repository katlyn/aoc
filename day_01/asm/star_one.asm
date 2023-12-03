; Registers in use:
;   Input:
;     No input registers
;   Ouput:
;     rax: return, the solution to the problem (accumulator)
;   Data:
;     rdi: current index within the input string
;     rdx: first number in dl
;     rcx: last number in cl
;     r11: whether the first number has been populated or not. 1 if true, 0 if false

%define index rdi
%define accumulator rax
%define first dl
%define last cl
%define first_seen r11

%define TRUE 1
%define FALSE 0

%define ascii_one 0x31
%define ascii_nine 0x39
%define ascii_newline 0x0A

%define current_char BYTE [input + index]

section .data
input:
  incbin "../big.txt"
  db 0x00

section .text

global star_one
star_one:
  ; Takes no parameters
  ; Returns an integer

  ; push all used registers
  ; we don't actually need to push anything because we're only using scratch registers
  ; push index
  ; push accumulator
  ; push first
  ; push last

  ; reset the current index to -1
  ; we use -1 as that allows us to increment early when checking characters
  mov index, -1

  ; zero out the full registers for first and last
  ; needed to prevent any junk data
  xor rcx, rcx
  xor rdx, rdx

  ; reset the accumulator to 0
  xor accumulator, accumulator

line_loop:
  ; Processes each line
  ; reset first_seen to false
  mov first_seen, FALSE
char_loop:
  ; Processes each character
  ; Increment the index by one
  add index, 1
  ; Check if the character is less than an ascii "1"
  ; jump to less_than_one if true
  cmp current_char, ascii_one
  jl less_than_one
  ; Check if the character is greater than an ascii "9"
  ; jump to next character if true
  cmp current_char, ascii_nine
  jg char_loop

char_is_number:
  ; If we have gotten this far, the current character is a digit
  ; Set the last seen digit to this one. It will be overwritten by later digits if needed.
  mov last, current_char
  ; Convert the byte from ASCII to an actual number by subtracting the value of ASCII "0"
  sub last, 0x30

  ; If the first digit hasn't been found yet, set it to the current character and mark it as found
  ; if the first has already been seen, jump to the next character
  cmp first_seen, TRUE
  je char_loop

  mov first_seen, TRUE
  mov first, current_char
  ; Convert from ASCII to a number
  sub first, 0x30

  ; Jump to the next character
  jmp char_loop

join_and_loop:
  ; If the first number has not been found, the line was empty - skip
  cmp first_seen, FALSE
  je line_loop
  ; Combines the first and last digits and adds to the accumulator
  imul rdx, BYTE 10 ; full register of first
  add first, last
  add accumulator, rdx ; full register of first
  jmp line_loop

less_than_one:
  ; Check if the character is a newline. If it is, combine the first and last then continue the loop
  cmp current_char, ascii_newline
  je join_and_loop

  ; Check if the character is a null byte. If it isn't, continue to the next character
  cmp current_char, 0x00
  jne char_loop


clean_return:
  ; restore all used registers
  ; pop last
  ; pop first
  ; pop accumulator
  ; pop index
  ret
