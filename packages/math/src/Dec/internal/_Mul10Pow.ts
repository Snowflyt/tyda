/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _Parse } from "./_Parse";
import type { _SubUnsigned } from "./_SubUnsigned";

type ONE = _Parse<"1">;

/**
 * Multiply a float by 10 raised to the power of the length of `PowStr`.
 * @private
 */
export type _Mul10Pow<N extends Dec, Pow extends Dec> =
  N[1] extends [0] ? N
  : Pow[1] extends [0] ? N
  : N[4] extends "" ?
    _Mul10Pow<
      [
        sign: N[0],
        coefficientDigits: N[1],
        coefficientDigitsRev: N[2],
        coefficientDigitsCounter: N[3],
        exponentSign: "",
        exponentCounter: [...N[5], 0],
        special: "Finite",
      ],
      _SubUnsigned<Pow, ONE>
    >
  : [N[4], N[5]] extends ["-", [0]] ?
    _Mul10Pow<
      [
        sign: N[0],
        coefficientDigits: N[1],
        coefficientDigitsRev: N[2],
        coefficientDigitsCounter: N[3],
        exponentSign: "",
        exponentCounter: [],
        special: "Finite",
      ],
      _SubUnsigned<Pow, ONE>
    >
  : N[5] extends [0, ...infer Rest extends 0[]] ?
    _Mul10Pow<
      [
        sign: N[0],
        coefficientDigits: N[1],
        coefficientDigitsRev: N[2],
        coefficientDigitsCounter: N[3],
        exponentSign: "-",
        exponentCounter: Rest,
        special: "Finite",
      ],
      _SubUnsigned<Pow, ONE>
    >
  : never;
