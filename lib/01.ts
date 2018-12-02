import { getInput, inputToNumberArray } from "./common";

export function day01(): void {
  let rawInput = getInput(1);
  let parsedInput = inputToNumberArray(rawInput);

  let partA = solvePartA(0, parsedInput);
  console.log('Day 01 Part A', partA);

  let partB = solvePartB(0, parsedInput);
  console.log('Day 01 Part B', partB);
}

function solvePartA(seed: number, changes: number[]): number {
  return changes.reduce((acc: number, cur: number) => {
    acc = acc + cur;
    return acc;
  }, seed);
}

function solvePartB(seed: number, changes: number[]): number {
  let frequencies: number[] = [];
  let answer: number | undefined;
  let frequency = seed;

  while (answer === undefined) {
    for (let change of changes) {
      frequency = frequency + change;
      if (frequencies.includes(frequency)) {
        answer = frequency;
        break;
      }
      frequencies.push(frequency);
    }
  }

  return answer;
}
