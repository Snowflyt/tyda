import type { _AddNat } from "./_AddNat";
import type { _FastToDigitsRev } from "./_ToDigits";

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

type MulDigits<
  N1 extends number[],
  N2 extends number[],
  N2Curr extends number[] = N2,
  Carry extends number = 0,
  Temp extends string = "",
  Acc extends string = "0",
  Shift extends string = "",
> =
  N1 extends [infer D1 extends number, ...infer RestDigits1 extends number[]] ?
    N2Curr extends [infer D2 extends number, ...infer RestDigits2 extends number[]] ?
      MulDigits<
        N1,
        N2,
        RestDigits2,
        AddMatrix[MulCarryMatrix[D1][D2]][AddCarryMatrix[MulMatrix[D1][D2]][Carry]],
        `${AddMatrix[MulMatrix[D1][D2]][Carry]}${Temp}`,
        Acc,
        Shift
      >
    : MulDigits<
        RestDigits1,
        N2,
        N2,
        0,
        "",
        _AddNat<Acc, `${Carry extends 0 ? "" : Carry}${Temp}${Shift}`>,
        `${Shift}0`
      >
  : Acc;

/**
 * Multiply two natural numbers.
 * @private
 */
export type _MulNat<N1 extends string, N2 extends string> =
  N1 extends "0" ? "0"
  : N2 extends "0" ? "0"
  : MulDigits<_FastToDigitsRev<N1>, _FastToDigitsRev<N2>>;
