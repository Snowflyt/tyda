/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _MulUnsigned } from "./_MulUnsigned";

/**
 * Multiply two decimals.
 */
export type _Mul<N1 extends Dec, N2 extends Dec> =
  N1[6] extends "NaN" ? Dec.NaN
  : N2[6] extends "NaN" ? Dec.NaN
  : [N1[2], N2[6]] extends [[0], "Infinity"] ? Dec.NaN
  : [N1[6], N2[2]] extends ["Infinity", [0]] ? Dec.NaN
  : [N1[0], N1[6]] extends [N2[0], "Infinity"] ? Dec.Infinity
  : [N1[0], N2[6]] extends [N2[0], "Infinity"] ? Dec.Infinity
  : N1[6] extends "Infinity" ? Dec.NegativeInfinity
  : N2[6] extends "Infinity" ? Dec.NegativeInfinity
  : N1[0] extends N2[0] ?
    [
      sign: "",
      coefficientDigits: _MulUnsigned<N1, N2>[1],
      coefficientDigitsRev: _MulUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _MulUnsigned<N1, N2>[3],
      exponentSign: _MulUnsigned<N1, N2>[4],
      exponentCounter: _MulUnsigned<N1, N2>[5],
      special: "Finite",
    ]
  : [
      sign: "-",
      coefficientDigits: _MulUnsigned<N1, N2>[1],
      coefficientDigitsRev: _MulUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _MulUnsigned<N1, N2>[3],
      exponentSign: _MulUnsigned<N1, N2>[4],
      exponentCounter: _MulUnsigned<N1, N2>[5],
      special: "Finite",
    ];
