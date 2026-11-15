import type { _AddInt } from "./_AddInt";
import type { _Div10Pow } from "./_Div10Pow";
import type { _PadEnd } from "./_PadEnd";
import type { _RemoveLeadingZeroes } from "./_RemoveLeadingZeroes";

/**
 * Add two floats.
 * @private
 */
export type _AddFloat<N1 extends string, N2 extends string> =
  N1 extends `${infer I1S}.${infer F1S}` ?
    N2 extends `${infer I2S}.${infer F2S}` ?
      _Div10Pow<
        _AddInt<
          _RemoveLeadingZeroes<`${I1S}${_PadEnd<F1S, "0", F2S>}`>,
          _RemoveLeadingZeroes<`${I2S}${_PadEnd<F2S, "0", F1S>}`>
        >,
        _PadEnd<F1S, "0", F2S>
      >
    : _Div10Pow<
        _AddInt<
          _RemoveLeadingZeroes<`${I1S}${F1S}`>,
          _RemoveLeadingZeroes<`${N2}${_PadEnd<"", "0", F1S>}`>
        >,
        F1S
      >
  : N2 extends `${infer I2S}.${infer F2S}` ?
    _Div10Pow<
      _AddInt<
        _RemoveLeadingZeroes<`${N1}${_PadEnd<"", "0", F2S>}`>,
        _RemoveLeadingZeroes<`${I2S}${F2S}`>
      >,
      F2S
    >
  : _AddInt<N1, N2>;
