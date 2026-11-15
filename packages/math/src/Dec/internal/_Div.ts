/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _DivUnsigned } from "./_DivUnsigned";
import type { _Parse } from "./_Parse";

/**
 * Divide two decimals.
 */
export type _Div<N1 extends Dec, N2 extends Dec> =
  N1[6] extends "NaN" ? Dec.NaN
  : N2[6] extends "NaN" ? Dec.NaN
  : [N1[6], N2[6]] extends ["Infinity", "Infinity"] ? Dec.NaN
  : [N1[0], N2[6]] extends [N2[0], "Infinity"] ? Dec.Zero
  : N2[6] extends "Infinity" ? Dec.NegativeZero
  : [N1[0], N1[6]] extends [N2[0], "Infinity"] ? Dec.Infinity
  : N1[6] extends "Infinity" ? Dec.NegativeInfinity
  : [N1[2], N2[2]] extends [[0], [0]] ? Dec.NaN
  : [N1[0], N2[2]] extends [N2[0], [0]] ? Dec.Infinity
  : N2[2] extends [0] ? Dec.NegativeInfinity
  : [N1[0], N1[2]] extends [N2[0], [0]] ? Dec.Zero
  : N1[2] extends [0] ? Dec.NegativeZero
  : N1[0] extends N2[0] ?
    [
      sign: "",
      coefficientDigits: _DivUnsigned<N1, N2>[1],
      coefficientDigitsRev: _DivUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _DivUnsigned<N1, N2>[3],
      exponentSign: _DivUnsigned<N1, N2>[4],
      exponentCounter: _DivUnsigned<N1, N2>[5],
      special: "Finite",
    ]
  : [
      sign: "-",
      coefficientDigits: _DivUnsigned<N1, N2>[1],
      coefficientDigitsRev: _DivUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _DivUnsigned<N1, N2>[3],
      exponentSign: _DivUnsigned<N1, N2>[4],
      exponentCounter: _DivUnsigned<N1, N2>[5],
      special: "Finite",
    ];

type test0 = _Div<_Parse<"1">, _Parse<"0.25">>;
