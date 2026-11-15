/**
 * @module
 * @private
 * @internal
 */

type AddMatrix = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  [2, 3, 4, 5, 6, 7, 8, 9, 0, 1],
  [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
  [4, 5, 6, 7, 8, 9, 0, 1, 2, 3],
  [5, 6, 7, 8, 9, 0, 1, 2, 3, 4],
  [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
  [7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
  [8, 9, 0, 1, 2, 3, 4, 5, 6, 7],
  [9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
];
type CarryMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

/**
 * Add two digit tuples.
 */
export type _AddDigits<
  N1 extends number[],
  N1Rev extends number[],
  N1DigitsCounter extends 0[],
  N2 extends number[],
  N2Rev extends number[],
  N2DigitsCounter extends 0[],
  Carry extends number = 0,
  Acc extends number[] = [],
  AccRev extends number[] = [],
  AccCounter extends 0[] = [],
> =
  [N1, N1Rev, N1DigitsCounter, N2, N2Rev, N2DigitsCounter] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [...infer RestDigits2 extends number[], infer _D2],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
    ]
  ) ?
    _AddDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      AddMatrix[CarryMatrix[D1][D2]][CarryMatrix[AddMatrix[D1][D2]][Carry]],
      [AddMatrix[AddMatrix[D1][D2]][Carry], ...Acc],
      [...AccRev, AddMatrix[AddMatrix[D1][D2]][Carry]],
      [...AccCounter, 0]
    >
  : Carry extends 0 ?
    [
      [...N1, ...N2, ...Acc],
      [...AccRev, ...N1Rev, ...N2Rev],
      [...AccCounter, ...N1DigitsCounter, ...N2DigitsCounter],
    ]
  : [N1, N1Rev, N1DigitsCounter] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1 extends number],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
    ]
  ) ?
    _AddDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      [],
      [],
      [],
      CarryMatrix[D1][Carry],
      [AddMatrix[D1][Carry], ...Acc],
      [...AccRev, AddMatrix[D1][Carry]],
      [...AccCounter, 0]
    >
  : [N2, N2Rev, N2DigitsCounter] extends (
    [
      [...infer RestDigits2 extends number[], infer _D2 extends number],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
    ]
  ) ?
    _AddDigits<
      [],
      [],
      [],
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      CarryMatrix[D2][Carry],
      [AddMatrix[D2][Carry], ...Acc],
      [...AccRev, AddMatrix[D2][Carry]],
      [...AccCounter, 0]
    >
  : [[Carry, ...Acc], [...AccRev, Carry], [...AccCounter, 0]];
