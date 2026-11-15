import type { _FastToDigits } from "./_ToDigits";

/**
 * Compare two natural numbers.
 * @private
 */
export type _CompareNat<N1 extends string, N2 extends string> =
  CompareStrLength<N1, N2> extends 1 ? 1
  : CompareStrLength<N1, N2> extends -1 ? -1
  : CompareSameLengthDigits<_FastToDigits<N1>, _FastToDigits<N2>>;

type CompareStrLength<S1 extends string, S2 extends string> =
  S1 extends `${string}${infer Rest1}` ?
    S2 extends `${string}${infer Rest2}` ?
      CompareStrLength<Rest1, Rest2>
    : 1
  : S2 extends "" ? 0
  : -1;

type DigitComparisonMatrix = [
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [1, 0, -1, -1, -1, -1, -1, -1, -1, -1],
  [1, 1, 0, -1, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 0, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 0, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 0, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 0, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1, 0, -1, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

type CompareSameLengthDigits<N1 extends number[], N2 extends number[]> =
  N1 extends [infer D1 extends number, ...infer Rest1 extends number[]] ?
    N2 extends [infer D2 extends number, ...infer Rest2 extends number[]] ?
      DigitComparisonMatrix[D1][D2] extends 1 ? 1
      : DigitComparisonMatrix[D1][D2] extends -1 ? -1
      : CompareSameLengthDigits<Rest1, Rest2>
    : never
  : 0;
