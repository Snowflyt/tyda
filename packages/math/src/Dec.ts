import type { _AddFloat } from "./internal/_AddFloat";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Subtract 1 from a `number`.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Dec<3>; // => 2
 * type _2 = Dec<0>; // => -1
 * type _3 = Dec<480>; // => 479
 * type _4 = Dec<3.14>; // => 2.14
 * type _5 = Dec<0.718>; // => -0.282
 * type _6 = Dec<-2.718>; // => -3.718
 * ```
 */
export type Dec<N> =
  number extends N ? number
  : N extends number ? _StrToNum<_AddFloat<`${N}`, "-1">>
  : never;
