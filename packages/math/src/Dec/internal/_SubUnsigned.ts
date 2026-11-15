/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _SubDigits } from "./_SubDigits";

/**
 * Subtract two decimals as if they were unsigned.
 *
 * **⚠️ Warning:** {@linkcode N1} must be greater than or equal to {@linkcode N2}.
 * @private
 */
export type _SubUnsigned<N1 extends Dec, N2 extends Dec> =
  [N1[4], N1[5]] extends [N2[4], N2[5]] ?
    [
      sign: "",
      coefficientDigits: _SubDigits<N1[1], N1[2], N1[3], N2[1], N2[2], N2[3]>[0],
      coefficientDigitsRev: _SubDigits<N1[1], N1[2], N1[3], N2[1], N2[2], N2[3]>[1],
      coefficientDigitsCounter: _SubDigits<N1[1], N1[2], N1[3], N2[1], N2[2], N2[3]>[2],
      exponentSign: N1[4],
      exponentCounter: N1[5],
      special: "Finite",
    ]
  : [N1[4], N2[4]] extends ["", "-"] ?
    [
      sign: "",
      coefficientDigits: _SubDigits<
        [...N1[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N1[2]],
        [...N1[3], ...N1[5], ...N2[5]],
        N2[1],
        N2[2],
        N2[3]
      >[0],
      coefficientDigitsRev: _SubDigits<
        [...N1[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N1[2]],
        [...N1[3], ...N1[5], ...N2[5]],
        N2[1],
        N2[2],
        N2[3]
      >[1],
      coefficientDigitsCounter: _SubDigits<
        [...N1[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N1[2]],
        [...N1[3], ...N1[5], ...N2[5]],
        N2[1],
        N2[2],
        N2[3]
      >[2],
      exponentSign: "-",
      exponentCounter: N2[5],
      special: "Finite",
    ]
  : [N1[4], N2[4]] extends ["-", ""] ?
    [
      sign: "",
      coefficientDigits: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N2[2]],
        [...N1[3], ...N1[5], ...N2[5]]
      >[0],
      coefficientDigitsRev: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N2[2]],
        [...N1[3], ...N1[5], ...N2[5]]
      >[1],
      coefficientDigitsCounter: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...N1[5], ...N2[5]],
        [...N1[5], ...N2[5], ...N2[2]],
        [...N1[3], ...N1[5], ...N2[5]]
      >[2],
      exponentSign: "-",
      exponentCounter: N1[5],
      special: "Finite",
    ]
  : N1[5] extends [...N2[5], ...infer Rest extends 0[]] ?
    [
      sign: "",
      coefficientDigits: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...Rest],
        [...Rest, ...N2[2]],
        [...N2[3], ...Rest]
      >[0],
      coefficientDigitsRev: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...Rest],
        [...Rest, ...N2[2]],
        [...N2[3], ...Rest]
      >[1],
      coefficientDigitsCounter: _SubDigits<
        N1[1],
        N1[2],
        N1[3],
        [...N2[1], ...Rest],
        [...Rest, ...N2[2]],
        [...N2[3], ...Rest]
      >[2],
      exponentSign: N1[4],
      exponentCounter: N1[5],
      special: "Finite",
    ]
  : N2[5] extends [...N1[5], ...infer Rest extends 0[]] ?
    [
      sign: "",
      coefficientDigits: _SubDigits<
        [...N1[1], ...Rest],
        [...Rest, ...N1[2]],
        [...N1[3], ...Rest],
        N2[1],
        N2[2],
        N2[3]
      >[0],
      coefficientDigitsRev: _SubDigits<
        [...N1[1], ...Rest],
        [...Rest, ...N1[2]],
        [...N1[3], ...Rest],
        N2[1],
        N2[2],
        N2[3]
      >[1],
      coefficientDigitsCounter: _SubDigits<
        [...N1[1], ...Rest],
        [...Rest, ...N1[2]],
        [...N1[3], ...Rest],
        N2[1],
        N2[2],
        N2[3]
      >[2],
      exponentSign: N1[4],
      exponentCounter: N2[5],
      special: "Finite",
    ]
  : never;
