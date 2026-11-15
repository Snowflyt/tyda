/**
 * @module
 * @private
 * @internal
 */

/**
 * Converts a decimal to its string representation.
 */
export type _Stringify<D, Acc extends string = ""> =
  D extends (
    [
      infer Sign,
      [...infer RestCoefficientDigits, infer _],
      [infer Digit extends number, ...infer RestCoefficientDigitsRev],
      [0, ...infer RestCoefficientDigitsCounter],
      "-",
      [],
      infer Special,
    ]
  ) ?
    _Stringify<
      [
        Sign,
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        "",
        [],
        Special,
      ],
      `${Digit}.${Acc}`
    >
  : D extends (
    [
      infer Sign,
      [...infer RestCoefficientDigits, infer _],
      [infer Digit extends number, ...infer RestCoefficientDigitsRev],
      [0, ...infer RestCoefficientDigitsCounter],
      "-",
      [infer _, ...infer RestExponentCounter],
      infer Special,
    ]
  ) ?
    _Stringify<
      [
        Sign,
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        "-",
        RestExponentCounter,
        Special,
      ],
      `${Digit}${Acc}`
    >
  : D extends [infer Sign, [], [], [], "-", [], infer Special] ?
    _Stringify<[Sign, [], [], [], "", [], Special], `0.${Acc}`>
  : D extends (
    [infer Sign, [], [], [], "-", [infer _, ...infer RestExponentCounter], infer Special]
  ) ?
    _Stringify<[Sign, [], [], [], "-", RestExponentCounter, Special], `0${Acc}`>
  : D extends (
    [
      infer Sign,
      [...infer RestCoefficientDigits, infer _],
      [infer Digit extends number, ...infer RestCoefficientDigitsRev],
      [0, ...infer RestCoefficientDigitsCounter],
      "",
      infer RestExponentCounter,
      infer Special,
    ]
  ) ?
    _Stringify<
      [
        Sign,
        RestCoefficientDigits,
        RestCoefficientDigitsRev,
        RestCoefficientDigitsCounter,
        "",
        RestExponentCounter,
        Special,
      ],
      `${Digit}${Acc}`
    >
  : D extends [infer Sign, [], [], [], "", [infer _, ...infer RestExponentCounter], infer Special] ?
    _Stringify<[Sign, [], [], [], "", RestExponentCounter, Special], `${Acc}0`>
  : D extends (
    [
      infer Sign extends string,
      infer _CoefficientDigits,
      infer _CoefficientDigitsRev,
      infer _CoefficientDigitsCounter,
      infer _ExponentSign,
      infer _ExponentCounter,
      "Finite",
    ]
  ) ?
    `${Sign}${Acc}`
  : D extends (
    [
      infer _Sign,
      infer _CoefficientDigits,
      infer _CoefficientDigitsRev,
      infer _CoefficientDigitsCounter,
      infer _ExponentSign,
      infer _ExponentCounter,
      "NaN",
    ]
  ) ?
    "NaN"
  : D extends (
    [
      infer Sign extends string,
      infer _CoefficientDigits,
      infer _CoefficientDigitsRev,
      infer _CoefficientDigitsCounter,
      infer _ExponentSign,
      infer _ExponentCounter,
      infer Special extends string,
    ]
  ) ?
    `${Sign}${Special}`
  : never;
