import { getInput, inputToStringArray } from "./common";

export function day02(): void {
  let rawInput = getInput(2);
  let boxIds = inputToStringArray(rawInput);

  let partA = solvePartA(boxIds);
  console.log('Day 02 Part A', partA);

  let partB = solvePartB(boxIds);
  console.log('Day 02 Part B', partB);
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

export function solvePartB(boxIds: string[]): string {
  const allowMismatchNo = 1;
  for (let box1 of boxIds) {
    for (let box2 of boxIds) {
      if (box1 === box2) continue;
      if (!isMatch(box1, box2, allowMismatchNo)) continue;
      return removeDifferingCharacters(box1, box2);
    }
  }

  throw new Error('No match found');
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

export function isMatch(box1: string, box2: string, allowedMismatchNo: number): boolean {
  if (box1.length !== box2.length) throw new Error('Box id lengths do not match');

  let mismatchNo = 0;
  for (let i = 0;i < box1.length;i++) {
    if (box1[i] !== box2[i]) {
      mismatchNo++;
      if (mismatchNo > allowedMismatchNo) return false;
    }
  }

  return true;
}

export function removeDifferingCharacters(box1: string, box2: string): string {
  if (box1.length !== box2.length) throw new Error('Box id lengths do not match');

  let result = '';
  for (let i = 0;i < box1.length;i++) {
    if (box1[i] !== box2[i]) continue;
    result += box1[i];
  }

  return result;
}
