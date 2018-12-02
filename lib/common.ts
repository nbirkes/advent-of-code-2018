import { readFileSync } from "fs";

export function getInput(day: number): string {
  let sDay = dayString(day);
  let buf = readFileSync(`${process.cwd()}/static/${sDay}.txt`);
  return buf.toString('utf8');
}

export function dayString(day: number): string {
  return day.toString().length === 2 ? '' + day : '0' + day;
}

export function inputToNumberArray(rawInput: string): number[] {
  return rawInput.split('\n').reduce((acc: number[], cur: string) => {
    if (!cur) throw new Error(`Input line is falsey`);
    acc.push(Number(cur.trim()));
    return acc;
  }, []);
}

export function inputToStringArray(rawInput: string): string[] {
  return rawInput.split('\n');
}
