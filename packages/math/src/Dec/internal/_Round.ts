/**
 * @module
 * @private
 * @internal
 */

import type { _AddDigits } from "./_AddDigits";
import type { Dec } from "./_Dec";

/**
 * Rounds a decimal to the nearest integer.
 * @private
 */
export type _Round<N extends Dec> =
  [N[1], N[2], N[4], N[5]] extends [[0 | 1 | 2 | 3 | 4], [0 | 1 | 2 | 3 | 4], "-", [0]] ?
    [
      sign: N[0],
      coefficientDigits: [0],
      coefficientDigitsRev: [0],
      coefficientDigitsCounter: [0],
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0 | 1 | 2 | 3 | 4],
      [0 | 1 | 2 | 3 | 4, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0],
    ]
  ) ?
    [
      sign: N[0],
      coefficientDigits: RestCoefficientDigits,
      coefficientDigitsRev: RestCoefficientDigitsRev,
      coefficientDigitsCounter: RestCoefficientDigitsCounter,
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [[5 | 6 | 7 | 8 | 9], [5 | 6 | 7 | 8 | 9], [0], "-", [0]]
  ) ?
    [
      sign: N[0],
      coefficientDigits: [1],
      coefficientDigitsRev: [1],
      coefficientDigitsCounter: [0],
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 5 | 6 | 7 | 8 | 9],
      [5 | 6 | 7 | 8 | 9, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0],
    ]
  ) ?
    [
      sign: N[0],
      coefficientDigits: _AddDigits<
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        [1],
        [1],
        [0]
      >[0],
      coefficientDigitsRev: _AddDigits<
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        [1],
        [1],
        [0]
      >[1],
      coefficientDigitsCounter: _AddDigits<
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        [1],
        [1],
        [0]
      >[2],
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], infer _1],
      [infer _2, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [infer _, ...infer RestExponentCounter extends 0[]],
    ]
  ) ?
    _Round<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: RestCoefficientDigitsCounter,
        exponentSign: "-",
        exponentCounter: RestExponentCounter,
        special: "Finite",
      ]
    >
  : N;
