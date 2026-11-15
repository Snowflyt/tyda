import type { _ToDigitsRev } from "./_ToDigits";

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

type SubDigits<
  N1 extends number[],
  N2 extends number[],
  Borrow extends number = 0,
  Acc extends string = "",
> =
  [N1, N2] extends (
    [
      [infer D1 extends number, ...infer RestDigits1 extends number[]],
      [infer D2 extends number, ...infer RestDigits2 extends number[]],
    ]
  ) ?
    SubDigits<
      RestDigits1,
      RestDigits2,
      BorrowMatrix[D1][D2] extends 1 ? 1 : BorrowMatrix[SubMatrix[D1][D2]][Borrow],
      `${SubMatrix[SubMatrix[D1][D2]][Borrow]}${Acc}`
    >
  : Acc extends "0" ? "0"
  : Acc extends `0${infer NextAcc}` ? SubDigits<[], [], 0, NextAcc>
  : Acc;

/**
 * Subtract two natural numbers.
 *
 * **⚠️ Warning:** {@linkcode N1} must be greater than or equal to {@linkcode N2}.
 * @private
 */
export type _SubNat<N1 extends string, N2 extends string> = SubDigits<
  _ToDigitsRev<`${N1}`, `${N2}`>,
  _ToDigitsRev<`${N2}`, `${N1}`>
>;
