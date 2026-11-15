/**
 * @module
 * @private
 * @internal
 */

import type { Dec } from "./_Dec";

/**
 * Parses a decimal string into its components.
 */
export type _Parse<
  S extends string,
  ParsingFrac extends boolean = false,
  Sign extends "" | "-" = "",
  CoefficientDigits extends number[] = [],
  CoefficientDigitsRev extends number[] = [],
  CoefficientDigitsCounter extends 0[] = [],
  ExponentSign extends "" | "-" = "",
  ExponentCounter extends 0[] = [],
> =
  string extends S ? Dec
  : `${number}` extends S ? Dec
  : S extends "NaN" | "Infinity" ?
    [
      sign: Sign,
      coefficientDigits: [],
      coefficientDigitsRev: [],
      coefficientDigitsCounter: [],
      exponentSign: "",
      exponentCounter: [],
      special: S,
    ]
  : S extends `-${infer Rest}` ?
    _Parse<
      Rest,
      ParsingFrac,
      "-",
      CoefficientDigits,
      CoefficientDigitsRev,
      CoefficientDigitsCounter,
      ExponentSign,
      ExponentCounter
    >
  : S extends `.${infer Rest}` ?
    _Parse<
      Rest,
      true,
      Sign,
      CoefficientDigits,
      CoefficientDigitsRev,
      CoefficientDigitsCounter,
      "-",
      ExponentCounter
    >
  : [S, ParsingFrac, CoefficientDigits] extends [`0${infer Rest}`, true, []] ?
    _Parse<Rest, ParsingFrac, Sign, [], [], [], ExponentSign, [...ExponentCounter, 0]>
  : [S, ParsingFrac] extends [`${infer D extends number}${infer Rest}`, true] ?
    _Parse<
      Rest,
      ParsingFrac,
      Sign,
      [...CoefficientDigits, D],
      [D, ...CoefficientDigitsRev],
      [...CoefficientDigitsCounter, 0],
      ExponentSign,
      [...ExponentCounter, 0]
    >
  : [S, CoefficientDigits] extends [`0${infer Rest}`, []] ?
    _Parse<Rest, ParsingFrac, Sign, [], [], [], ExponentSign, ExponentCounter>
  : S extends `${infer D extends number}${infer Rest}` ?
    _Parse<
      Rest,
      ParsingFrac,
      Sign,
      [...CoefficientDigits, D],
      [D, ...CoefficientDigitsRev],
      [...CoefficientDigitsCounter, 0],
      ExponentSign,
      ExponentCounter
    >
  : CoefficientDigits extends [] ?
    [
      sign: Sign,
      coefficientDigits: [0],
      coefficientDigitsRev: [0],
      coefficientDigitsCounter: [0],
      exponentSign: ExponentSign,
      exponentCounter: ExponentCounter,
      special: "Finite",
    ]
  : [
      sign: Sign,
      coefficientDigits: CoefficientDigits,
      coefficientDigitsRev: CoefficientDigitsRev,
      coefficientDigitsCounter: CoefficientDigitsCounter,
      exponentSign: ExponentSign,
      exponentCounter: ExponentCounter,
      special: "Finite",
    ];
