import type { _Rem } from "./internal/_Rem";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Gets the remainder of dividing two `number`s.
 * The result is of the same sign as the dividend.
 *
 * Sig: `(n1: number, n2: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Rem<42, 3>; // => 0
 * type _2 = Rem<4356, 832>; // => 196
 * type _3 = Rem<-4356.791, 832.329>; // -195.146
 * type _4 = Rem<832.329, -56.791>; // => 37.255
 * ```
 */
export type Rem<N1, N2> =
  number extends N1 | N2 ? number
  : N1 extends number ?
    N2 extends number ?
      _StrToNum<_Rem<`${N1}`, `${N2}`>>
    : never
  : never;
