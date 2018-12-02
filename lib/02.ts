import { getInput, inputToStringArray } from "./common";

export function day02(): void {
  let rawInput = getInput(2);
  let boxIds = inputToStringArray(rawInput);

  let partA = solvePartA(boxIds);
  console.log('Day 02 Part A', partA);
}

export function solvePartA(boxIds: string[]): number {
  let numMatch2 = 0;
  let numMatch3 = 0;

  for (let boxId of boxIds) {
    let chexksum = getChecksum(boxId);
    if (countMatches(2, chexksum) > 0) numMatch2++;
    if (countMatches(3, chexksum) > 0) numMatch3++;
  }

  return numMatch2 * numMatch3;
}

export function countMatches(numMatches: number, checksum: Record<string, number>): number {
  return Object.keys(checksum).filter(it => checksum[it] === numMatches).length;
}

export function getChecksum(boxId: string): Record<string, number> {
  let checksum: Record<string, number> = {};
  for (let char of boxId.split('')) {
    checksum[char] = (checksum[char] === undefined) ? 1 : checksum[char] + 1;
  }
  return checksum;
}
