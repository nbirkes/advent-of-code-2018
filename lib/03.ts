import { getInput, inputToStringArray } from "./common";

export function day03(): void {
  let rawInput = getInput(3);
  let parsedInput = inputToStringArray(rawInput);

  let partA = solvePartA(parsedInput);
  console.log('Day 01 Part A', partA);
}

function solvePartA(claimSpecs: string[]): number {
  return countOverlap(claimSpecs.map(it => new Claim(parseClaimSpecs(it))));
}

export function parseClaimSpecs(input: string): ClaimSpecs {
  let parts = input.split(' ');

  let id = parts[0];
  let marginLeft = Number(parts[2].split(',')[0]);
  let marginTop = Number(parts[2].split(',')[1].replace(':', ''));
  let width = Number(parts[3].split('x')[0]);
  let height = Number(parts[3].split('x')[1]);

  return {
    id,
    marginLeft: marginLeft,
    marginTop: marginTop,
    width,
    height,
  };
}

export interface ClaimSpecs {
  id: string;
  marginLeft: number;
  marginTop: number;
  width: number;
  height: number;
}

export class Claim {
  readonly specs: ClaimSpecs;

  constructor(specs: ClaimSpecs) {
    this.specs = specs;
  }

  totalWidth(): number {
    return this.specs.marginLeft + this.specs.width;
  }

  totalHeight(): number {
    return this.specs.marginTop + this.specs.height;
  }

  topEdge(): number {
    return this.specs.marginTop;
  }

  leftEdge(): number {
    return this.specs.marginLeft;
  }

  build(): boolean[][] {
    let grid: boolean[][] = [];

    for (let row = 1; row <= this.totalHeight(); row++) {
      let rows = [];
      for (let col = 1; col <= this.totalWidth(); col++) {
        rows.push(this.buildCell(col, row));
      }
      grid.push(rows);
    }
    return grid;
  }

  buildCell(column: number, row: number): boolean {
    const result = this.buildCellOrDefault(column, row);
    if (result === undefined) throw new Error('column or row out of bounds');
    return result;
  }

  buildCellOrDefault(col: number, row: number): boolean | undefined {
    if (col > this.totalWidth()) return undefined;
    if (row > this.totalHeight()) return undefined;

    return this.columnOn(col) && this.rowOn(row);
  }

  columnOn(column: number): boolean {
    return (column > this.leftEdge());
  }

  rowOn(row: number): boolean {
    return (row > this.topEdge());
  }
}

export function countOverlap(claims: Claim[]): number {
  let maxWidth = 0;
  let maxHeight = 0;

  let total = 0;
  let totals: string[][] = [];

  for (let claim of claims) {
    if (claim.totalWidth() > maxWidth) maxWidth = claim.totalWidth();
    if (claim.totalHeight() > maxHeight) maxHeight = claim.totalHeight();
  }

  for (let row = 1;row < maxHeight;row++) {
    for (let col = 1;col < maxWidth;col++) {
      for (let claim of claims) {
        const result = claim.buildCellOrDefault(col, row);
        if (totals[row - 1] === undefined) totals[row - 1] = [];
        if (totals[row - 1][col - 1] === undefined) totals[row - 1][col - 1] = '';
        if (!result) continue;
        totals[row - 1][col - 1] = totals[row - 1][col - 1] + claim.specs.id + ';';
      }
    }
  }

  for (let row = 0;row < totals.length;row++) {
    for (let col = 0;col < totals[row].length;col++) {
      if (totals[row][col].split(';').filter(x=>x).length >= 2) total++;
    }
  }

  return total;
}
