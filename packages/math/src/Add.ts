import type { _AddFloat } from "./internal/_AddFloat";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Add two `number`s.
 *
 * Sig: `(n1: number, n2: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Add<42, 8>; // => 50
 * type _2 = Add<4356, 832>; // => 5188
 * type _3 = Add<4356.791, 832.329>; // => 5189.12
 * type _4 = Add<832.329, -4356.791>; // => -3524.462
 * ```
 */
export type Add<N1, N2> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      _StrToNum<_AddFloat<`${N1}`, `${N2}`>>
    : never
  : never;
