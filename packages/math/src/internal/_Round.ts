import type { _AddNat } from "./_AddNat";

/**
 * Rounds a numeric string to the nearest integer.
 * @private
 */
export type _Round<N extends string> =
  N extends `-${infer I}.${infer F}` ?
    F extends `${"0" | "1" | "2" | "3" | "4"}${string}` ?
      `-${I}`
    : `-${_AddNat<I, "1">}`
  : N extends `${infer I}.${infer F}` ?
    F extends `${"0" | "1" | "2" | "3" | "4"}${string}` ?
      I
    : _AddNat<I, "1">
  : N;
