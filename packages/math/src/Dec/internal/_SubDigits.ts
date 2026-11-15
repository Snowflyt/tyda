/**
 * @module
 * @private
 * @internal
 */

type SubMatrix = [
  [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  [1, 0, 9, 8, 7, 6, 5, 4, 3, 2],
  [2, 1, 0, 9, 8, 7, 6, 5, 4, 3],
  [3, 2, 1, 0, 9, 8, 7, 6, 5, 4],
  [4, 3, 2, 1, 0, 9, 8, 7, 6, 5],
  [5, 4, 3, 2, 1, 0, 9, 8, 7, 6],
  [6, 5, 4, 3, 2, 1, 0, 9, 8, 7],
  [7, 6, 5, 4, 3, 2, 1, 0, 9, 8],
  [8, 7, 6, 5, 4, 3, 2, 1, 0, 9],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
type BorrowMatrix = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * Subtract two digit tuples.
 *
 * **⚠️ Warning:** {@linkcode N1} must be greater than or equal to {@linkcode N2}.
 * @private
 */
export type _SubDigits<
  N1 extends number[],
  N1Rev extends number[],
  N1DigitsCounter extends 0[],
  N2 extends number[],
  N2Rev extends number[],
  N2DigitsCounter extends 0[],
  Borrow extends number = 0,
  Acc extends number[] = [],
  AccRev extends number[] = [],
  AccDigitsCounter extends 0[] = [],
  AccWithoutLeadingZeros extends number[] = [0],
  AccWithoutLeadingZerosRev extends number[] = [0],
  AccWithoutLeadingZerosDigitsCounter extends 0[] = [0],
> =
  [
    N1,
    N1Rev,
    N1DigitsCounter,
    N2,
    N2Rev,
    N2DigitsCounter,
    // TODO: This is an awkward way to reduce instantiation depth and can be inefficient. Optimize?
    BorrowMatrix[N1Rev[0]][N2Rev[0]],
    SubMatrix[SubMatrix[N1Rev[0]][N2Rev[0]]][Borrow],
  ] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [...infer RestDigits2 extends number[], infer _D2],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
      1,
      0,
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      1,
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0],
      AccWithoutLeadingZeros,
      AccWithoutLeadingZerosRev,
      AccWithoutLeadingZerosDigitsCounter
    >
  : [
    N1,
    N1Rev,
    N1DigitsCounter,
    N2,
    N2Rev,
    N2DigitsCounter,
    BorrowMatrix[N1Rev[0]][N2Rev[0]],
  ] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [...infer RestDigits2 extends number[], infer _D2],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
      1,
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      1,
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0],
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0]
    >
  : [
    N1,
    N1Rev,
    N1DigitsCounter,
    N2,
    N2Rev,
    N2DigitsCounter,
    SubMatrix[SubMatrix[N1Rev[0]][N2Rev[0]]][Borrow],
  ] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [...infer RestDigits2 extends number[], infer _D2],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
      0,
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      BorrowMatrix[SubMatrix[D1][D2]][Borrow],
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0],
      AccWithoutLeadingZeros,
      AccWithoutLeadingZerosRev,
      AccWithoutLeadingZerosDigitsCounter
    >
  : [N1, N1Rev, N1DigitsCounter, N2, N2Rev, N2DigitsCounter] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      [...infer RestDigits2 extends number[], infer _D2],
      [infer D2 extends number, ...infer RestDigitsRev2 extends number[]],
      [0, ...infer RestDigitsCounter2 extends 0[]],
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      RestDigits2,
      RestDigitsRev2,
      RestDigitsCounter2,
      BorrowMatrix[SubMatrix[D1][D2]][Borrow],
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0],
      [SubMatrix[SubMatrix[D1][D2]][Borrow], ...Acc],
      [...AccRev, SubMatrix[SubMatrix[D1][D2]][Borrow]],
      [...AccDigitsCounter, 0]
    >
  : [Borrow, N1] extends [0, []] ?
    [AccWithoutLeadingZeros, AccWithoutLeadingZerosRev, AccWithoutLeadingZerosDigitsCounter]
  : Borrow extends 0 ?
    [[...N1, ...Acc], [...AccRev, ...N1Rev], [...AccDigitsCounter, ...N1DigitsCounter]]
  : [N1, N1Rev, N1DigitsCounter, SubMatrix[N1Rev[0]][Borrow]] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
      0,
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      [],
      [],
      [],
      BorrowMatrix[D1][Borrow],
      [SubMatrix[D1][Borrow], ...Acc],
      [...AccRev, SubMatrix[D1][Borrow]],
      [...AccDigitsCounter, 0],
      AccWithoutLeadingZeros,
      AccWithoutLeadingZerosRev,
      AccWithoutLeadingZerosDigitsCounter
    >
  : [N1, N1Rev, N1DigitsCounter] extends (
    [
      [...infer RestDigits1 extends number[], infer _D1],
      [infer D1 extends number, ...infer RestDigitsRev1 extends number[]],
      [0, ...infer RestDigitsCounter1 extends 0[]],
    ]
  ) ?
    _SubDigits<
      RestDigits1,
      RestDigitsRev1,
      RestDigitsCounter1,
      [],
      [],
      [],
      BorrowMatrix[D1][Borrow],
      [SubMatrix[D1][Borrow], ...Acc],
      [...AccRev, SubMatrix[D1][Borrow]],
      [...AccDigitsCounter, 0],
      [SubMatrix[D1][Borrow], ...Acc],
      [...AccRev, SubMatrix[D1][Borrow]],
      [...AccDigitsCounter, 0]
    >
  : [Acc, AccRev, AccDigitsCounter];
