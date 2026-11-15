/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _DivDigits } from "./_DivDigits";

/**
 * Divide two decimals as if they were unsigned.
 */
export type _DivUnsigned<N1 extends Dec, N2 extends Dec> =
  [N1[4], N2[4], N1[5]] extends ["", "", [...N2[5], ...infer Rest extends 0[]]] ?
    [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[4],
      special: "Finite",
    ]
  : [N1[4], N2[4], N2[5]] extends ["", "", [...N1[5], ...infer Rest extends 0[]]] ?
    [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[4],
      special: "Finite",
    ]
  : [N1[4], N2[4], N1[5]] extends ["-", "-", [...N2[5], ...infer Rest extends 0[]]] ?
    [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "-", Rest>[4],
      special: "Finite",
    ]
  : [N1[4], N2[4], N2[5]] extends ["-", "-", [...N1[5], ...infer Rest extends 0[]]] ?
    [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "", Rest>[4],
      special: "Finite",
    ]
  : [N1[4], N2[4]] extends ["", "-"] ?
    [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "", [...N1[5], ...N2[5]]>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "", [...N1[5], ...N2[5]]>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "", [...N1[5], ...N2[5]]>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "", [...N1[5], ...N2[5]]>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "", [...N1[5], ...N2[5]]>[4],
      special: "Finite",
    ]
  : [
      sign: "",
      coefficientDigits: _DivDigits<N1[1], N1[3], N2[2], "-", [...N1[5], ...N2[5]]>[0],
      coefficientDigitsRev: _DivDigits<N1[1], N1[3], N2[2], "-", [...N1[5], ...N2[5]]>[1],
      coefficientDigitsCounter: _DivDigits<N1[1], N1[3], N2[2], "-", [...N1[5], ...N2[5]]>[2],
      exponentSign: _DivDigits<N1[1], N1[3], N2[2], "-", [...N1[5], ...N2[5]]>[3],
      exponentCounter: _DivDigits<N1[1], N1[3], N2[2], "-", [...N1[5], ...N2[5]]>[4],
      special: "Finite",
    ];
