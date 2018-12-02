import { readFileSync } from 'fs';

export async function day01(): Promise<void> {
  let rawInput = fetchInput(1);
  let parsedInput = parseInput(rawInput);
  let answer = solve(0, parsedInput);
  console.log('Answer', answer);
}

function solve(seed: number, changes: number[]): number {
  return changes.reduce((acc: number, cur: number) => {
    acc = acc + cur;
    return acc;
  }, seed);
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
