/**
 * @module
 * @private
 * @internal
 */

type MulMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 2, 4, 6, 8, 0, 2, 4, 6, 8],
  [0, 3, 6, 9, 2, 5, 8, 1, 4, 7],
  [0, 4, 8, 2, 6, 0, 4, 8, 2, 6],
  [0, 5, 0, 5, 0, 5, 0, 5, 0, 5],
  [0, 6, 2, 8, 4, 0, 6, 2, 8, 4],
  [0, 7, 4, 1, 8, 5, 2, 9, 6, 3],
  [0, 8, 6, 4, 2, 0, 8, 6, 4, 2],
  [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
];
type MulCarryMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 2, 2, 2, 3, 3],
  [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
  [0, 0, 1, 1, 2, 3, 3, 4, 4, 5],
  [0, 0, 1, 2, 2, 3, 4, 4, 5, 6],
  [0, 0, 1, 2, 3, 4, 4, 5, 6, 7],
  [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
];

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
type AddCarryMatrix = [
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
 * Multiply two digit tuples.
 * @private
 */
export type _MulDigits<
  N1Rev extends number[],
  N2Rev extends number[],
  N2CurrRev extends number[] = N2Rev,
  Carry extends number = 0,
  Temp extends number[] = [0],
  TempRev extends number[] = [0],
  TempDigitsCounter extends 0[] = [0],
  NextTemp extends number[] = [],
  NextTempRev extends number[] = [],
  NextTempDigitsCounter extends 0[] = [],
  Acc extends number[] = [],
  AccRev extends number[] = [],
  AccDigitsCounter extends 0[] = [],
> =
  // NOTE: Don't move this `N1Rev extends []` branch to the end (the `never` branch),
  // otherwise TS will complain about excessive stack depth comparing types in `_MulUnsigned`
  N1Rev extends [] ?
    [[...Temp, ...Acc], [...AccRev, ...TempRev], [...AccDigitsCounter, ...TempDigitsCounter]]
  : [N1Rev, N2CurrRev, Temp, TempRev, TempDigitsCounter] extends (
    [
      [infer D1 extends number, ...infer _RestDigitsRev1],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [...infer RestTemp extends number[], infer _],
      [infer T extends number, ...infer RestTempRev extends number[]],
      [0, ...infer RestTempDigitsCounter extends 0[]],
    ]
  ) ?
    _MulDigits<
      N1Rev,
      N2Rev,
      RestDigitsRev2,
      AddMatrix[AddMatrix[MulCarryMatrix[D1][D2]][AddCarryMatrix[MulMatrix[D1][D2]][Carry]]][AddCarryMatrix[AddMatrix[MulMatrix[D1][D2]][Carry]][T]],
      RestTemp,
      RestTempRev,
      RestTempDigitsCounter,
      [AddMatrix[AddMatrix[MulMatrix[D1][D2]][Carry]][T], ...NextTemp],
      [...NextTempRev, AddMatrix[AddMatrix[MulMatrix[D1][D2]][Carry]][T]],
      [0, ...NextTempDigitsCounter],
      Acc,
      AccRev,
      AccDigitsCounter
    >
  : [N1Rev, N2CurrRev] extends (
    [
      [infer D1 extends number, ...infer _RestDigitsRev1],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
    ]
  ) ?
    _MulDigits<
      N1Rev,
      N2Rev,
      RestDigitsRev2,
      AddMatrix[MulCarryMatrix[D1][D2]][AddCarryMatrix[MulMatrix[D1][D2]][Carry]],
      [],
      [],
      [],
      [AddMatrix[MulMatrix[D1][D2]][Carry], ...NextTemp],
      [...NextTempRev, AddMatrix[MulMatrix[D1][D2]][Carry]],
      [0, ...NextTempDigitsCounter],
      Acc,
      AccRev,
      AccDigitsCounter
    >
  : [N1Rev, NextTemp, NextTempRev, NextTempDigitsCounter, Carry] extends (
    [
      [infer _, ...infer RestDigitsRev1 extends number[]],
      [...infer RestNextTemp extends number[], infer _T],
      [infer T extends number, ...infer RestNextTempRev extends number[]],
      [0, ...infer RestNextTempDigitsCounter extends 0[]],
      0,
    ]
  ) ?
    _MulDigits<
      RestDigitsRev1,
      N2Rev,
      N2Rev,
      0,
      RestNextTemp,
      RestNextTempRev,
      RestNextTempDigitsCounter,
      [],
      [],
      [],
      [T, ...Acc],
      [...AccRev, T],
      [...AccDigitsCounter, 0]
    >
  : [N1Rev, NextTemp, NextTempRev, NextTempDigitsCounter] extends (
    [
      [infer _, ...infer RestDigitsRev1 extends number[]],
      [...infer RestNextTemp extends number[], infer _T],
      [infer T extends number, ...infer RestNextTempRev extends number[]],
      [0, ...infer RestNextTempDigitsCounter extends 0[]],
    ]
  ) ?
    _MulDigits<
      RestDigitsRev1,
      N2Rev,
      N2Rev,
      0,
      [Carry, ...RestNextTemp],
      [...RestNextTempRev, Carry],
      [0, ...RestNextTempDigitsCounter],
      [],
      [],
      [],
      [T, ...Acc],
      [...AccRev, T],
      [...AccDigitsCounter, 0]
    >
  : never;
