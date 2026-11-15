import type { _AddNat } from "./_AddNat";
import type { _CompareNat } from "./_CompareNat";
import type { _SubNat } from "./_SubNat";

/**
 * Add two integers.
 * @private
 */
export type _AddInt<N1 extends string, N2 extends string> =
  N1 extends `-${infer M1}` ?
    N2 extends `-${infer M2}` ? `-${_AddNat<M1, M2>}`
    : _CompareNat<M1, N2> extends 1 ? `-${_SubNat<M1, N2>}`
    : _SubNat<N2, M1>
  : N2 extends `-${infer M2}` ?
    _CompareNat<N1, M2> extends -1 ?
      `-${_SubNat<M2, N1>}`
    : _SubNat<N1, M2>
  : _AddNat<N1, N2>;
