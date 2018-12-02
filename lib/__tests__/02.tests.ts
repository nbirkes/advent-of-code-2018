import { expect } from 'chai';
import { countMatches, getChecksum, solvePartA } from "../02";

describe('02', function () {
  describe('getChecksum', function() {
    it('parsed abcdef', function() {
      const expected = {
        a: 1,
        b: 1,
        c: 1,
        d: 1,
        e: 1,
        f: 1,
      };
      const boxId = 'abcdef';
      const actual = getChecksum(boxId);
      expect(actual).to.deep.equal(expected);
    });
    it('parsed bababc', function() {
      const expected = {
        a: 2,
        b: 3,
        c: 1,
      };
      const boxId = 'bababc';
      const actual = getChecksum(boxId);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('countMatches', function() {
    it('returns 1 for num matches 2', function() {
      const expected = 1;
      const input = {
        a: 2,
        b: 3,
        c: 1,
      };
      const actual = countMatches(2, input);
      expect(actual).to.deep.equal(expected);
    });
    it('returns 0 for num matches 2', function() {
      const expected = 0;
      const input = {
        a: 1,
        b: 1,
        c: 1,
        d: 1,
        e: 1,
        f: 1,
      };
      const actual = countMatches(2, input);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('solvePartA', function() {
    it('returns 12', function () {
      const expected = 12;
      const input = [
        'abcdef',
        'bababc',
        'abbcde',
        'abcccd',
        'aabcdd',
        'abcdee',
        'ababab',
      ];
      const actual = solvePartA(input);
      expect(actual).to.deep.equal(expected);
    });
  });
});
