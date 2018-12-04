import { expect } from 'chai';
import { Claim, ClaimSpecs, countOverlap, parseClaimSpecs } from "../03";

describe('03', function() {
  describe('parseClaimSpecs', function() {
    it('converts #1 @ 1,3: 4x4', function() {
      const expected: ClaimSpecs = {
        id: '#123',
        marginLeft: 3,
        marginTop: 2,
        width: 5,
        height: 4,
      };
      const input = '#123 @ 3,2: 5x4';
      const actual = parseClaimSpecs(input);
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('Claim', function() {
    describe('build', function() {
      it('returns false for 0,0', function() {
        const o = false;
        const x = true;

        const expected: boolean[][] = [
          [o,o,o,o,o,o,o,o,],
          [o,o,o,o,o,o,o,o,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
        ];

        let claim = new Claim(parseClaimSpecs('#123 @ 3,2: 5x4'));

        let expectedWidth = 8;
        let actualWidth = claim.totalWidth();
        expect(actualWidth).to.deep.equal(expectedWidth);

        const actual = claim.build();

        expect(actual).to.deep.equal(expected);
      });
      it('parses #1 @ 1,3: 4x4', function() {
        const o = false;
        const x = true;

        const expected: boolean[][] = [
          [o,o,o,o,o,o,o,o,],
          [o,o,o,o,o,o,o,o,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
          [o,o,o,x,x,x,x,x,],
        ];

        let claim = new Claim(parseClaimSpecs('#1 @ 1,3: 4x4'));

        let expectedWidth = 8;
        let actualWidth = claim.totalWidth();
        expect(actualWidth).to.deep.equal(expectedWidth);

        const actual = claim.build();

        expect(actual).to.deep.equal(expected);
      });
    });
  });
  describe('countOverlap', function() {
    it('returns 4', function() {
      const expected = 4;
      let claims = [
        new Claim(parseClaimSpecs('#1 @ 1,3: 4x4')),
        new Claim(parseClaimSpecs('#2 @ 3,1: 4x4')),
        new Claim(parseClaimSpecs('#3 @ 5,5: 2x2')),
      ];
      const actual = countOverlap(claims);
      expect(actual).to.equal(expected);
    });
  });
});
