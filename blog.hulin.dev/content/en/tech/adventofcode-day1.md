---
title: Day 1, AdventOfCode
date: 2024-01-08T20:08:17+08:00
feature_image: /images/cache.png
slug: adventofcode
gitalk: true
---

Caching in js
<!--more-->


These days I am learning rust, I want to try with some small project, AdventOfCode is so good for this, so I wrote AdventOfCode 2023 with rust, which you can find [here](https://github.com/flyingalex/adventofcode-2023). I didn't finish all of them, a few of them are pure math problem, I don't interested in it right now, so I didn't take time to explore it(yeah, I can't find a solution for them :)). For the finished ones, If I go back to check these codes, I feel they are more imperative way, its not very rust. I want to refactor them with rustful way, but I am not sure if its really rustful 🤣, but which makes me feel better than current one. 

_Make it work_. _Make it right_. _Make it fast_

Let's give it a try.

## Day 1

In [Day 1](https://adventofcode.com/2023/day/1), its asking us to find the number in string, them combine them to be a _two-digit number_. Part1 only care about numeric char, Part2 need to consider the numeric string, one, two, etc.

In my previous solution:
```Rust
fn is_digit_word(idx: usize, chars: &Vec<char>) -> Option<u32> {
    ...
}

fn find_digit(idx: usize, chars: &Vec<char>, check_digit_word: bool) -> u32 {
    ...
}

pub fn calibration_value(file: &Path, check_digit_word: bool) -> u32 {
    read_lines(file)
        .unwrap()
        .map(|l| {
            let mut first = 0;
            let mut last = 0;
            let mut first_idx = 0;
            let chars = l.unwrap().chars().collect::<Vec<char>>();
            let mut last_idx = chars.len() - 1;

            loop {
                if first == 0 {
                    first = find_digit(first_idx, &chars, check_digit_word);
                }

                if last == 0 {
                    last = find_digit(last_idx, &chars, check_digit_word);
                }

                if first != 0 && last != 0 {
                    break
                }
                first_idx += 1;
                last_idx -= 1;
            }
            (first * 10) + last
        })
        .sum()
}

#[cfg(test)]
mod day1_tests {
    use super::*;

    #[test]
    fn day1_1_test() {
        let result = calibration_value(Path::new("src/day1/day1_input_test1.txt"), false);
        assert_eq!(result, 142);
    }

    #[test]
    fn day1_1_answer() {
        let result = calibration_value(Path::new("src/day1/day1_input.txt"), false);
        assert_eq!(result, 55621);
    }

    #[test]
    fn day1_2_test() {
        let result = calibration_value(Path::new("src/day1/day1_input_test2.txt"), true);
        assert_eq!(result, 281);
    }

    #[test]
    fn day1_2_answer() {
        let result = calibration_value(Path::new("src/day1/day1_input.txt"), true);
        assert_eq!(result, 53592);
    }
}

```

What's not good:
1. I am pass a `check_digit_word` bool to calibration_value(real calculation logic) to check which logic should be used. Its not extensible if we need a third way to calculate this.
2. A util function `read_lines` to read the file, after check a blog from [fasterthanlime](https://fasterthanli.me/series/advent-of-code-2022/part-1), found there is a more elegant way to do this with `include_str!`
3. `is_digit_word` and `find_digit` should be separated since they are belongs to different part solutions.

I am going to try to fix all of them.

I want to change the whole way to write all of these quizzes and have a same api for all days solutions. I decide to create a trait for it(this is rustful)

```Rust
trait Solution {  
    fn part1_test(&self) -> u32;  
    fn part1(&self) -> u32;  
    fn part2_test(&self) -> u32;  
    fn part2(&self) -> u32;  
}
```

Based on day1's quizzes, I think its good to use strategy pattern to write the solution. So `is_digit_word` and `find_digit` can be split to their own part solution.

```Rust
struct Day1;  
struct Part1;  
struct Part2;  
  
trait Part {  
    fn find_digit(&self, idx: usize, chars: &[char]) -> Option<u32>;  
}  
  
impl Part for Part2 {  
    fn find_digit(&self, idx: usize, chars: &[char]) -> Option<u32> {  
        if chars[idx].is_ascii_digit() {  
            return chars[idx].to_digit(10);  
        }  
  
        let digits: Vec<&str> = vec!["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];  
        let len = chars.len();  
        // check numbr word with 3,4,5 characters  
        for r in [2, 3, 4] {  
            if (idx + r) < len {  
                let s = chars[idx..=idx + r].iter().collect::<String>();  
                if let Some(found) = digits.iter().position(|&d| d == s) {  
                    return Some(found as u32 + 1);  
                }  
            }  
        }  
  
        None  
    }  
}  
  
impl Part for Part1 {  
    fn find_digit(&self, idx: usize, chars: &[char]) -> Option<u32> {  
        chars[idx].to_digit(10)  
    }  
}  
impl Day1 {  
    pub fn calibration_value<P: Part>(&self, part: P, input: &str) -> u32 {  
        input  
            .lines()  
            .map(|l| {  
                let mut first = None;  
                let mut last = None;  
                let mut first_idx = 0;  
                let chars = l.chars().collect::<Vec<char>>();  
                let mut last_idx = chars.len() - 1;  
  
                loop {  
                    if first.is_none() {  
                        first = part.find_digit(first_idx, &chars);  
                    }  
  
                    if last.is_none() {  
                        last = part.find_digit(last_idx, &chars);  
                    }  
  
                    if first.is_some() && last.is_some() {  
                        break  
                    }  
                    first_idx += 1;  
                    last_idx -= 1;  
                }  
                (first.unwrap() * 10) + last.unwrap()  
            })  
            .sum()  
    }  
}  
impl Solution for Day1 {  
    fn part1_test(&self) -> u32 {  
        self.calibration_value(Part1, include_str!("day1_input_test1.txt"))  
    }  
    fn part1(&self) -> u32 {  
        self.calibration_value(Part1, include_str!("day1_input.txt"))  
    }  
  
    fn part2_test(&self) -> u32 {  
        self.calibration_value(Part2, include_str!("day1_input_test2.txt"))  
    }  
  
    fn part2(&self) -> u32 {  
        self.calibration_value(Part2, include_str!("day1_input.txt"))  
    }  
}
```

Then you can call day1's solution like this:
```Rust
Day1.part1_test();
Day1.part1();
Day1.part2_test();
Day1.part2();
```
For me I think this is more readable, the codes also feel more clear.

What do you think?


Ref:
1. https://www.youtube.com/@hyper-neutrino
2. https://fasterthanli.me/series/advent-of-code-2022/part-1
3. https://github.com/flyingalex/adventofcode-2023