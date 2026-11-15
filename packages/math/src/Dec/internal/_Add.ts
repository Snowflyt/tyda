/**
 * @module
 * @private
 * @internal
 */

import type { _AddUnsigned } from "./_AddUnsigned";
import type { _CompareUnsigned } from "./_CompareUnsigned";
import type { Dec } from "./_Dec";
import type { _SubUnsigned } from "./_SubUnsigned";

/**
 * Add two decimals.
 */
export type _Add<N1 extends Dec, N2 extends Dec> =
  N1[6] extends "NaN" ? Dec.NaN
  : N2[6] extends "NaN" ? Dec.NaN
  : [`${N1[0]}${N2[0]}`, N1[6], N2[6]] extends ["-", "Infinity", "Infinity"] ? Dec.NaN
  : N1[6] extends "Infinity" ?
    [
      sign: N1[0],
      coefficientDigits: [],
      coefficientDigitsRev: [],
      coefficientDigitsCounter: [],
      exponentSign: "",
      exponentCounter: [],
      special: "Infinity",
    ]
  : N2[6] extends "Infinity" ?
    [
      sign: N2[0],
      coefficientDigits: [],
      coefficientDigitsRev: [],
      coefficientDigitsCounter: [],
      exponentSign: "",
      exponentCounter: [],
      special: "Infinity",
    ]
  : N1[0] extends N2[0] ?
    [
      sign: N1[0],
      coefficientDigits: _AddUnsigned<N1, N2>[1],
      coefficientDigitsRev: _AddUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _AddUnsigned<N1, N2>[3],
      exponentSign: _AddUnsigned<N1, N2>[4],
      exponentCounter: _AddUnsigned<N1, N2>[5],
      special: "Finite",
    ]
  : [N1[0], N2[0], _CompareUnsigned<N1, N2>] extends ["", "-", -1] ?
    [
      sign: "-",
      coefficientDigits: _SubUnsigned<N2, N1>[1],
      coefficientDigitsRev: _SubUnsigned<N2, N1>[2],
      coefficientDigitsCounter: _SubUnsigned<N2, N1>[3],
      exponentSign: _SubUnsigned<N2, N1>[4],
      exponentCounter: _SubUnsigned<N2, N1>[5],
      special: "Finite",
    ]
  : [N1[0], N2[0]] extends ["", "-"] ?
    [
      sign: "",
      coefficientDigits: _SubUnsigned<N1, N2>[1],
      coefficientDigitsRev: _SubUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _SubUnsigned<N1, N2>[3],
      exponentSign: _SubUnsigned<N1, N2>[4],
      exponentCounter: _SubUnsigned<N1, N2>[5],
      special: "Finite",
    ]
  : _CompareUnsigned<N1, N2> extends 0 | -1 ?
    [
      sign: "",
      coefficientDigits: _SubUnsigned<N2, N1>[1],
      coefficientDigitsRev: _SubUnsigned<N2, N1>[2],
      coefficientDigitsCounter: _SubUnsigned<N2, N1>[3],
      exponentSign: _SubUnsigned<N2, N1>[4],
      exponentCounter: _SubUnsigned<N2, N1>[5],
      special: "Finite",
    ]
  : [
      sign: "-",
      coefficientDigits: _SubUnsigned<N1, N2>[1],
      coefficientDigitsRev: _SubUnsigned<N1, N2>[2],
      coefficientDigitsCounter: _SubUnsigned<N1, N2>[3],
      exponentSign: _SubUnsigned<N1, N2>[4],
      exponentCounter: _SubUnsigned<N1, N2>[5],
      special: "Finite",
    ];
