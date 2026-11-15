/**
 * @module
 * @private
 * @internal
 */

import type { _CompareDigits } from "./_CompareDigits";
import type { Dec } from "./_Dec";

/**
 * Compare two decimals as if they were unsigned.
 *
 * Return `0` if they are equal, `1` if {@linkcode N1} is greater than {@linkcode N2},
 * and `-1` if {@linkcode N1} is less than {@linkcode N2}.
 * @private
 */
export type _CompareUnsigned<N1 extends Dec, N2 extends Dec> =
  [N1[2], N2[2]] extends [[0], [0]] ? 0
  : N1[2] extends [0] ? -1
  : N2[2] extends [0] ? 1
  : [N1[4], N2[4], [...N1[5], ...N1[2]]] extends ["", "", [...N2[5], ...N2[2]]] ? 0
  : [N1[4], N2[4], [...N1[5], ...N1[3]]] extends ["", "", [...N2[5], ...N2[3]]] ?
    _CompareDigits<N1[1], N2[1]>
  : [N1[4], N2[4], [...N1[5], ...N1[3]]] extends ["", "", [...N2[5], ...N2[3], ...infer _]] ? 1
  : [N1[4], N2[4]] extends ["", ""] ? -1
  : [N1[4], N2[4], [...N2[5], ...N1[2]]] extends ["-", "-", [...N1[5], ...N2[2]]] ? 0
  : [N1[4], N2[4], [...N2[5], ...N1[3]]] extends ["-", "-", [...N1[5], ...N2[3]]] ?
    _CompareDigits<N1[1], N2[1]>
  : [N1[4], N2[4], [...N2[5], ...N1[3]]] extends ["-", "-", [...N1[5], ...N2[3], ...infer _]] ? 1
  : [N1[4], N2[4]] extends ["-", "-"] ? -1
  : [N1[4], N2[4], [...N1[5], ...N2[5], ...N1[2]]] extends ["", "-", N2[2]] ? 0
  : [N1[4], N2[4], [...N1[5], ...N2[5], ...N1[3]]] extends ["", "-", N2[3]] ?
    _CompareDigits<N1[1], N2[1]>
  : [N1[4], N2[4], [...N1[5], ...N2[5], ...N1[3]]] extends ["", "-", [...N2[3], ...infer _]] ? 1
  : [N1[4], N2[4]] extends ["", "-"] ? -1
  : [N1[4], N2[4], N1[2]] extends ["-", "", [...N1[5], ...N2[5], ...N2[2]]] ? 0
  : [N1[4], N2[4], N1[3]] extends ["-", "", [...N1[5], ...N2[5], ...N2[3]]] ?
    _CompareDigits<N1[1], N2[1]>
  : [N1[4], N2[4], N1[3]] extends ["-", "", [...N1[5], ...N2[5], ...N2[3], ...infer _]] ? 1
  : -1;
