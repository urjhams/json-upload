#!/bin/bash

# split the latest tag into array
input=$1
arr=(${input//./ })

# get the last minor number which we need to increase
minor=${arr[${#arr[@]}-1]}
((minor=minor+1))

# get the last index
last=${#arr[@]}-1

# set the new value to the last index element which is the desired minor number
((arr[$last]=$minor))

# merging function with special character between
function join_by { local d=${1-} f=${2-}; if shift 2; then printf %s "$f" "${@/#/$d}"; fi; }

# merging the array to the new tag number to bump
result=$(join_by . "${arr[@]}")

# return the new tag number
echo "$result"
