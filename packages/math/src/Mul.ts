import type { _MulFloat } from "./internal/_MulFloat";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Multiply two `number`s.
 *
 * Sig: `(n1: number, n2: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Mul<42, 3>; // => 126
 * type _2 = Mul<4356, 832>; // => 3624192
 * type _3 = Mul<4356.791, 832.329>; // => 3626283.496239
 * type _4 = Mul<832.329, -4356.791>; // => -3626283.496239
 * ```
 */
export type Mul<N1, N2> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      _StrToNum<_MulFloat<`${N1}`, `${N2}`>>
    : never
  : never;
