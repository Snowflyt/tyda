import type { _Div10Pow } from "./_Div10Pow";
import type { _MulInt } from "./_MulInt";
import type { _RemoveLeadingZeroes } from "./_RemoveLeadingZeroes";

/**
 * Multiply two floats.
 * @private
 */
export type _MulFloat<N1 extends string, N2 extends string> =
  N1 extends `${infer I1S}.${infer F1S}` ?
    N2 extends `${infer I2S}.${infer F2S}` ?
      _Div10Pow<
        _MulInt<_RemoveLeadingZeroes<`${I1S}${F1S}`>, _RemoveLeadingZeroes<`${I2S}${F2S}`>>,
        `${F1S}${F2S}`
      >
    : _Div10Pow<_MulInt<_RemoveLeadingZeroes<`${I1S}${F1S}`>, N2>, F1S>
  : N2 extends `${infer I2S}.${infer F2S}` ?
    _Div10Pow<_MulInt<N1, _RemoveLeadingZeroes<`${I2S}${F2S}`>>, F2S>
  : _MulInt<N1, N2>;
