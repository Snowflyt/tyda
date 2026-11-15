/**
 * @module
 * @private
 * @internal
 */

import type { _AddDigits } from "./_AddDigits";
import type { Dec } from "./_Dec";

// up to 16 decimal places
type DEFAULT_PRECISION = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * Round a decimal to a given precision.
 */
export type _RoundPrec<N extends Dec, Prec extends 0[] = DEFAULT_PRECISION> =
  [N[1], N[2], N[3], N[4]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0 | 1 | 2 | 3 | 4],
      [0 | 1 | 2 | 3 | 4, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "",
    ]
  ) ?
    [
      sign: N[0],
      coefficientDigits: RestCoefficientDigits,
      coefficientDigitsRev: RestCoefficientDigitsRev,
      coefficientDigitsCounter: Prec,
      exponentSign: "",
      exponentCounter: [...N[5], 0],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 5 | 6 | 7 | 8 | 9],
      [5 | 6 | 7 | 8 | 9, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "",
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[0],
        coefficientDigitsRev: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[1],
        coefficientDigitsCounter: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[2],
        exponentSign: "",
        exponentCounter: [...N[5], 0],
        special: "Finite",
      ],
      Prec
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0 | 1 | 2 | 3 | 4],
      [0 | 1 | 2 | 3 | 4, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "-",
      [0],
    ]
  ) ?
    [
      sign: N[0],
      coefficientDigits: RestCoefficientDigits,
      coefficientDigitsRev: RestCoefficientDigitsRev,
      coefficientDigitsCounter: Prec,
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 5 | 6 | 7 | 8 | 9],
      [5 | 6 | 7 | 8 | 9, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "-",
      [0],
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[0],
        coefficientDigitsRev: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[1],
        coefficientDigitsCounter: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[2],
        exponentSign: "",
        exponentCounter: [],
        special: "Finite",
      ],
      Prec
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0 | 1 | 2 | 3 | 4],
      [0 | 1 | 2 | 3 | 4, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "-",
      [0, ...infer RestExponentCounter extends 0[]],
    ]
  ) ?
    [
      sign: N[0],
      coefficientDigits: RestCoefficientDigits,
      coefficientDigitsRev: RestCoefficientDigitsRev,
      coefficientDigitsCounter: Prec,
      exponentSign: "-",
      exponentCounter: RestExponentCounter,
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 5 | 6 | 7 | 8 | 9],
      [5 | 6 | 7 | 8 | 9, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0],
      "-",
      [0, ...infer RestExponentCounter extends 0[]],
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[0],
        coefficientDigitsRev: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[1],
        coefficientDigitsCounter: _AddDigits<
          RestCoefficientDigits,
          RestCoefficientDigitsRev,
          Prec,
          [1],
          [1],
          [0]
        >[2],
        exponentSign: "-",
        exponentCounter: RestExponentCounter,
        special: "Finite",
      ],
      Prec
    >
  : [N[1], N[2], N[3], N[4]] extends (
    [
      [...infer RestCoefficientDigits extends number[], infer _1],
      [infer _2, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "",
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: [...Prec, ...RestCoefficientDigitsCounter],
        exponentSign: "",
        exponentCounter: [...N[5], 0],
        special: "Finite",
      ],
      Prec
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], infer _1],
      [infer _2, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0],
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: [...Prec, ...RestCoefficientDigitsCounter],
        exponentSign: "",
        exponentCounter: [],
        special: "Finite",
      ],
      Prec
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], infer _1],
      [infer _2, ...infer RestCoefficientDigitsRev extends number[]],
      [...Prec, 0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0, ...infer RestExponentCounter extends 0[]],
    ]
  ) ?
    _RoundPrec<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: [...Prec, ...RestCoefficientDigitsCounter],
        exponentSign: "-",
        exponentCounter: RestExponentCounter,
        special: "Finite",
      ],
      Prec
    >
  : N;
