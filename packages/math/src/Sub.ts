import type { _StrToNum } from "./internal/_StrToNum";
import type { _SubFloat } from "./internal/_SubFloat";

/**
 * Subtract two `number`s.
 *
 * Sig: `(n1: number, n2: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Sub<42, 8>; // => 34
 * type _2 = Sub<4356, 832>; // => 3524
 * type _3 = Sub<4356.791, 832.329>; // => 3524.462
 * type _4 = Sub<4356.791, -832.329>; // => 5189.12
 * ```
 */
export type Sub<N1, N2> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      _StrToNum<_SubFloat<`${N1}`, `${N2}`>>
    : never
  : never;
