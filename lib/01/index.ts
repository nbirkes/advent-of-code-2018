import { readFileSync } from 'fs';

export async function day01(): Promise<void> {
  let rawInput = fetchInput(1);
  let parsedInput = parseInput(rawInput);

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

function parseInput(input: string): number[] {
  if (!input) throw new Error('input is undefined');
  return input.split('\n').reduce((acc: number[], cur: string) => {
    if (!cur) throw new Error(`Input line is falsey`);
    acc.push(Number(cur.trim()));
    return acc;
  }, []);
}

export function fetchInput(day: number): string {
  let sDay = dayString(day);
  let buf = readFileSync(`${process.cwd()}/static/${sDay}.txt`);
  return buf.toString('utf8');
}

export function dayString(day: number): string {
  return day.toString().length === 2 ? '' + day : '0' + day;
}
