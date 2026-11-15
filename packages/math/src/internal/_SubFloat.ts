import type { _AddFloat } from "./_AddFloat";

/**
 * Subtract two floats.
 * @private
 */
export type _SubFloat<N1 extends string, N2 extends string> =
  N2 extends "0" ? N1
  : `${N2}` extends `-${infer N2Abs}` ? _AddFloat<N1, N2Abs>
  : _AddFloat<N1, `-${N2}`>;
