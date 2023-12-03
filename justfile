current_day := `TX="America/New_York" date +%d`
day_string := "day_" + current_day

# default recipe to display help information
default:
  @{{just_executable()}} --list --justfile {{justfile()}}

# clone the template and set up a new directory for the provided day
create day=(current_day):
  @if [ -d day_{{day}} ]; then echo "Day already exists!"; exit 1; fi
  @cp -r template day_{{day}}
  @vim {{ join(("day_" + day), "example.txt") }}
  @vim {{ join(("day_" + day), "input.txt") }}
  @printf "\nrun_day_{{day}}:\n  @<day_{{day}}/input.txt node --loader @swc-node/register/esm ./day_{{day}}/index.mts\n\ntest_day_{{day}}:\n  @<day_{{day}}/example.txt node --loader @swc-node/register/esm ./day_{{day}}/index.mts\n" >> {{justfile()}}

# run today's solution with your input
run day=(current_day):
  @{{just_executable()}} --justfile {{justfile()}} run_day_{{day}}

# run today's solution with example input
test day=(current_day):
  @{{just_executable()}} --justfile {{justfile()}} test_day_{{day}}

run_day_01:
  @<day_01/input.txt node --loader @swc-node/register/esm ./day_01/index.mts

test_day_01:
  @<day_01/example.txt node --loader @swc-node/register/esm ./day_01/index.mts

run_day_02:
  @<day_02/input.txt node --loader @swc-node/register/esm ./day_02/index.mts

test_day_02:
  @<day_02/example.txt node --loader @swc-node/register/esm ./day_02/index.mts

run_day_03:
  @<day_03/input.txt node --loader @swc-node/register/esm ./day_03/index.mts

test_day_03:
  @<day_03/example.txt node --loader @swc-node/register/esm ./day_03/index.mts
