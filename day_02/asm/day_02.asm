; Registers used
;   r14: the accumulator for star one (preserved). The number of possible games.
;   r15: the accumulator for star two (preserved). The sum of the powers of the minimum number of cubes in each game.
;   r13: the current index within the input
;   r8!:  max # red cubes
;   r9!:  max # green cubes
;   r10!: max # blue cubes
;   rdi: currently parsed integer
;   r11!: current game id
;   rcx!: if the current game is possible. 0 if false, 1 if true
;   rsi: used to pass parameter between calls
;   rdx: general scratch register

; unused registers: rax, rbx!, r12!, rcx

%define star_one r14
%define star_two r15
%define index r13

%define game_id r11
%define game_possible rcx

%define max_red r8
%define max_green r9
%define max_blue r10

%define parsed rdi
%define scratch rdx
%define scratch_byte dl
%define parameter rsi
%define parameter_byte sil

%define base_red 12
%define base_green 13
%define base_blue 14

%define ascii_zero 0x30
%define ascii_nine 0x39
%define ascii_newline 0x0A

%define FALSE 0
%define TRUE 1

%define current_char BYTE [input + index]

EXTERN printf
GLOBAL main

SECTION .data
input:
  incbin "../large.txt"
  db 0x00
format_string:
  db `%d\n`, 0x00


SECTION .text
main:
  ; Save preserved register
  push star_one
  push star_two

  ; zero out any registers that need it
  xor index, index
  xor star_one, star_one
  xor star_two, star_two
  xor game_id, game_id

line_loop:
  ; Increment the current game ID
  inc game_id
  ; Reset the game_possible to true
  mov game_possible, TRUE
  ; Zero out the max cube counters
  xor max_red, max_red
  xor max_green, max_green
  xor max_blue, max_blue
  ; Skip until the current char is ":". This is after the game ID.
  mov parameter, ':'
  call skip_until_char

draw_loop:
  ; Skip until the first digit in the draw
  call skip_until_digit
  call parse_digit

  ; Now that the number is in parsed, figure out which register it needs to be moved into by checking the first char of the color
  ; Increment the index to skip the space
  inc index

color_switch:
  ; Check the first letter of the color to the char 'g'
  ; less than is b, equal is green, greater than is red
  cmp current_char, 'g'
  jl check_blue
  je check_green
  jg check_red

check_blue:
  ; Skip past the length of the color name
  add index, 4
  ; Check if the game is possible with this many cubes
  cmp parsed, base_blue
  jle count_blue
  mov game_possible, FALSE
count_blue:
  ; Set blue to parsed if it's greater than what is already in the register
  cmp parsed, max_blue
  jle check_draw_loop
  mov max_blue, parsed
  jmp check_draw_loop

check_green:
  ; Skip past the length of the color name
  add index, 5
  ; Check if the game is possible with this many cubes
  cmp parsed, base_green
  jle count_green
  mov game_possible, FALSE
count_green:
  ; Set green to parsed if it's greater than what is already in the register
  cmp parsed, max_green
  jle check_draw_loop
  mov max_green, parsed
  jmp check_draw_loop

check_red:
  ; Skip past the length of the color name
  add index, 3
  ; Check if the game is possible with this many cubes
  cmp parsed, base_red
  jle count_red
  mov game_possible, FALSE
count_red:
  ; Set red to parsed if it's greater than what is already in the register
  cmp parsed, max_red
  jle check_draw_loop
  mov max_red, parsed
  ; fall through
  ; jmp check_draw_loop

check_draw_loop:
  ; Check if we need to continue to loop over more rounds of the game
  ; if the current char is ",", then more rounds follow
  cmp current_char, ","
  je draw_loop
  cmp current_char, ";"
  je draw_loop

compute_power:
  ; Multiply all values into the scratch register, then add it to the total
  mov scratch, max_red
  imul scratch, max_green
  imul scratch, max_blue
  add star_two, scratch

add_possible_game:
  ; Check if the current game was possible or not
  cmp game_possible, TRUE
  jne check_continue
  ; If the game was possible, add the current game ID to the sum
  add star_one, game_id

check_continue:
  ; Check if we're at the end of the file or not, and if we should continue
  ; if newline, increment and check again
  cmp current_char, ascii_newline
  inc index
  je check_continue

  ; If null char, we're at the end. Otherwise, loop over the next line
  cmp current_char, 0x00
  jne line_loop

print_results:
  ; Now that we're all done, print the results
  mov parameter, star_one
  call print_num
  mov parameter, star_two
  call print_num

main_ret:
  ; Restore preserved registers
  pop star_two
  pop star_one
  ; return with zero exit code
  mov rax, 0
  ret

; skips characters in the input until the character given in parameter_byte is found
skip_until_char_loop:
  inc index
skip_until_char:
  cmp current_char, parameter_byte
  jne skip_until_char_loop
  ret


; skips characters in the input until the current character is a digit
skip_until_digit_loop:
  inc index
skip_until_digit:
  ; Check if the character is less than an ascii "1"
  ; continue the loop if true
  cmp current_char, ascii_zero
  jl skip_until_digit_loop
  ; Check if the character is greater than an ascii "9"
  ; continue the loop if true
  cmp current_char, ascii_nine
  jg skip_until_digit_loop

  ; if we've made it this far then we have a digit at the current index
  ret

parse_digit:
  ; Parse a number from a string starting from the current index
  ; Zero out the return register
  xor parsed, parsed
  ; Zero out the scratch register (used for easier reading of byte numbers)
  xor scratch, scratch
parse_digit_loop:
  ; Check if the character is less than an ascii "0"
  ; jump to less_than_one if true
  cmp current_char, ascii_zero
  jl parse_digit_ret
  ; Check if the character is greater than an ascii "9"
  ; jump to next character if true
  cmp current_char, ascii_nine
  jg parse_digit_ret

  ; If we have gotten this far, the current character is a digit
  ; Move the current index into the scratch register
  mov scratch_byte, current_char
  ; Subtract the ASCII value of "0" to get the true number value
  sub scratch, ascii_zero
  ; Multiply the current value of the parsed register by 10 before adding additional digits
  imul parsed, 10
  add parsed, scratch
  ; Increment and continue the loop to parse any additional digits of the given number
  inc index
  jmp parse_digit_loop
parse_digit_ret:
  ret


print_num:
  ; Number to print should go in rsi
  ; Align the stack for printf
  ; push 0

  ; Make sure that our format string will be used
  mov rdi, format_string
  call printf

  ; Undo stack alignment
  ; pop rdi
  ret
