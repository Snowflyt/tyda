import type { _Round } from "./internal/_Round";
import type { _StrToNum } from "./internal/_StrToNum";

/**
 * Rounds a `number` to the nearest integer.
 *
 * Sig: `(n: number) => number`
 *
 * **Example**
 *
 * ```typescript
 * type _1 = Round<3>; // => 3
 * type _2 = Round<3.14>; // => 3
 * type _3 = Round<3.5>; // => 4
 * type _4 = Round<-2.718>; // => -3
 * ```
 */
export type Round<N> =
  number extends N ? number
  : N extends number ? _StrToNum<_Round<`${N}`>>
  : never;
