import type { _MulNat } from "./_MulNat";

/**
 * Multiply two integers.
 * @private
 */
export type _MulInt<N1 extends string, N2 extends string> =
  `${N1}` extends `-${infer M1}` ?
    `${N2}` extends `-${infer M2}` ?
      _MulNat<M1, M2>
    : `-${_MulNat<M1, N2>}`
  : `${N2}` extends `-${infer M2}` ?
    N1 extends "0" ?
      "0"
    : `-${_MulNat<N1, M2>}`
  : _MulNat<N1, N2>;
