/**
 * @module
 * @private
 * @internal
 */

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

export type _CompareDigits<N1 extends number[], N2 extends number[]> =
  [N1, N2] extends [[], []] ? 0
  : N1 extends [] ? -1
  : N2 extends [] ? 1
  : DigitComparisonMatrix[N1[0]][N2[0]] extends -1 | 1 ? DigitComparisonMatrix[N1[0]][N2[0]]
  : [N1, N2] extends (
    [
      [infer _D1, ...infer RestDigits1 extends number[]],
      [infer _D2, ...infer RestDigits2 extends number[]],
    ]
  ) ?
    _CompareDigits<RestDigits1, RestDigits2>
  : 0;
