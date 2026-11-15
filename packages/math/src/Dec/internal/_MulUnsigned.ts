/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";
import type { _MulDigits } from "./_MulDigits";
import type { _RoundPrec } from "./_RoundPrec";

/**
 * Multiply two decimals as if they were unsigned.
 */
export type _MulUnsigned<N1 extends Dec, N2 extends Dec> =
  [N1[4], N2[4], N1[5]] extends ["", "-", [...N2[5], ...infer Rest extends 0[]]] ?
    _RoundPrec<
      [
        sign: "",
        coefficientDigits: _MulDigits<N1[2], N2[2]>[0],
        coefficientDigitsRev: _MulDigits<N1[2], N2[2]>[1],
        coefficientDigitsCounter: _MulDigits<N1[2], N2[2]>[2],
        exponentSign: "",
        exponentCounter: Rest,
        special: "Finite",
      ]
    >
  : [N1[4], N2[4], N2[5]] extends ["", "-", [...N1[5], ...infer Rest extends 0[]]] ?
    _RoundPrec<
      [
        sign: "",
        coefficientDigits: _MulDigits<N1[2], N2[2]>[0],
        coefficientDigitsRev: _MulDigits<N1[2], N2[2]>[1],
        coefficientDigitsCounter: _MulDigits<N1[2], N2[2]>[2],
        exponentSign: "-",
        exponentCounter: Rest,
        special: "Finite",
      ]
    >
  : [N1[4], N2[4], N1[5]] extends ["-", "", [...N2[5], ...infer Rest extends 0[]]] ?
    _RoundPrec<
      [
        sign: "",
        coefficientDigits: _MulDigits<N1[2], N2[2]>[0],
        coefficientDigitsRev: _MulDigits<N1[2], N2[2]>[1],
        coefficientDigitsCounter: _MulDigits<N1[2], N2[2]>[2],
        exponentSign: "-",
        exponentCounter: Rest,
        special: "Finite",
      ]
    >
  : [N1[4], N2[4], N2[5]] extends ["-", "", [...N1[5], ...infer Rest extends 0[]]] ?
    _RoundPrec<
      [
        sign: "",
        coefficientDigits: _MulDigits<N1[2], N2[2]>[0],
        coefficientDigitsRev: _MulDigits<N1[2], N2[2]>[1],
        coefficientDigitsCounter: _MulDigits<N1[2], N2[2]>[2],
        exponentSign: "",
        exponentCounter: Rest,
        special: "Finite",
      ]
    >
  : _RoundPrec<
      [
        sign: "",
        coefficientDigits: _MulDigits<N1[2], N2[2]>[0],
        coefficientDigitsRev: _MulDigits<N1[2], N2[2]>[1],
        coefficientDigitsCounter: _MulDigits<N1[2], N2[2]>[2],
        exponentSign: N1[4],
        exponentCounter: [...N1[5], ...N2[5]],
        special: "Finite",
      ]
    >;
