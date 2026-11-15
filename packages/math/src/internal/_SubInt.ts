import type { _AddInt } from "./_AddInt";

/**
 * Subtract two integers.
 * @private
 */
export type _SubInt<N1 extends string, N2 extends string> =
  N2 extends "0" ? N1
  : `${N2}` extends `-${infer N2Abs}` ? _AddInt<N1, N2Abs>
  : _AddInt<N1, `-${N2}`>;
