import type { _AddFloat } from "./_AddFloat";
import type { _DivFloat } from "./_DivFloat";
import type { _Mul10Pow } from "./_Mul10Pow";
import type { _MulFloat } from "./_MulFloat";
import type { _MulNat } from "./_MulNat";
import type { _Round } from "./_Round";
import type { _StrToNum } from "./_StrToNum";
import type { _SubFloat } from "./_SubFloat";

type LN10 = "2.302585092994046";
type INV_LN10 = "0.43429448190325176";

type Factorial<N extends void[], Acc extends string = "1"> =
  N extends [void, ...infer Rest extends void[]] ? Factorial<Rest, _MulNat<Acc, `${N["length"]}`>>
  : Acc;

type Exp<
  R extends string,
  Precision extends void[] = [void, void, void, void, void, void],
  Acc extends string = "0",
> =
  Precision extends [void, ...infer Rest extends void[]] ?
    _DivFloat<"1", Factorial<Precision>> extends infer Inv extends string ?
      _StrToNum<_MulFloat<R, _AddFloat<Inv, Acc>>> extends infer NewAcc extends number ?
        Exp<R, Rest, `${NewAcc}`>
      : never
    : never
  : Acc;

type RepeatStr<
  S extends string,
  N extends string,
  Counter extends void[] = [],
  Acc extends string = "",
> = `${Counter["length"]}` extends N ? Acc : RepeatStr<S, N, [void, ...Counter], `${Acc}${S}`>;

export type _Exp<N extends string> =
  _Round<_MulFloat<N, INV_LN10>> extends infer K extends string ?
    _SubFloat<N, _MulFloat<K, LN10>> extends infer R extends string ?
      _Mul10Pow<_AddFloat<"1", Exp<R>>, RepeatStr<"x", K>>
    : never
  : never;

type __Exp<N extends number> = _StrToNum<_Exp<`${N}`>>;
export type { __Exp as Exp };

type test0 = __Exp<7>; // =>
