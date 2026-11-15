/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";

export type _Normalize<N extends Dec> =
  N[1] extends [0] ?
    [
      sign: N[0],
      coefficientDigits: [0],
      coefficientDigitsRev: [0],
      coefficientDigitsCounter: [0],
      exponentSign: "",
      exponentCounter: [],
      special: "Finite",
    ]
  : [N[1], N[2], N[3], N[4]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0],
      [0, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "",
    ]
  ) ?
    _Normalize<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: RestCoefficientDigitsCounter,
        exponentSign: "",
        exponentCounter: [...N[5], 0],
        special: "Finite",
      ]
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0],
      [0, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0],
    ]
  ) ?
    _Normalize<
      [
        sign: N[0],
        coefficientDigits: RestCoefficientDigits,
        coefficientDigitsRev: RestCoefficientDigitsRev,
        coefficientDigitsCounter: RestCoefficientDigitsCounter,
        exponentSign: "",
        exponentCounter: [],
        special: "Finite",
      ]
    >
  : [N[1], N[2], N[3], N[4], N[5]] extends (
    [
      [...infer RestCoefficientDigits extends number[], 0],
      [0, ...infer RestCoefficientDigitsRev extends number[]],
      [0, ...infer RestCoefficientDigitsCounter extends 0[]],
      "-",
      [0, ...infer RestExponentCounter extends 0[]],
    ]
  ) ?
    _Normalize<
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
