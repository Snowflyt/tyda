import type { _ToDigitsRev } from "./_ToDigits";

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

type AddDigits<
  N1 extends number[],
  N2 extends number[],
  Carry extends number = 0,
  Acc extends string = "",
> =
  [N1, N2] extends (
    [
      [infer D1 extends number, ...infer RestDigits1 extends number[]],
      [infer D2 extends number, ...infer RestDigits2 extends number[]],
    ]
  ) ?
    AddDigits<
      RestDigits1,
      RestDigits2,
      AddMatrix[CarryMatrix[D1][D2]][CarryMatrix[AddMatrix[D1][D2]][Carry]],
      `${AddMatrix[AddMatrix[D1][D2]][Carry]}${Acc}`
    >
  : Carry extends 0 ? Acc
  : `${Carry}${Acc}`;

/**
 * Add two natural numbers.
 * @private
 */
export type _AddNat<N1 extends string, N2 extends string> = AddDigits<
  _ToDigitsRev<N1, N2>,
  _ToDigitsRev<N2, N1>
>;
