import type { Dec } from "..";

import type { _Add } from "./_Add";
import type { _Mul } from "./_Mul";
import type { _Mul10Pow } from "./_Mul10Pow";
import type { _Parse } from "./_Parse";
import type { _Round } from "./_Round";
import type { _Stringify } from "./_Stringify";
import type { _Sub } from "./_Sub";

type LN10 = _Parse<"2.302585092994046">;
type INV_LN10 = _Parse<"0.43429448190325176">;

type INV_2 = _Parse<"0.5">;
type INV_6 = _Parse<"0.16666666666666666">;
type INV_24 = _Parse<"0.041666666666666664">;
type INV_120 = _Parse<"0.008333333333333333">;
type INV_720 = _Parse<"0.001388888888888889">;

type ONE = _Parse<"1">;

export type _Exp<N extends Dec> =
  _Round<_Mul<N, INV_LN10>> extends infer K extends Dec ?
    _Sub<N, _Mul<K, LN10>> extends infer R extends Dec ?
      _Mul10Pow<
        _Add<
          ONE,
          _Mul<
            R,
            _Add<
              ONE,
              _Mul<
                R,
                _Add<
                  INV_2,
                  _Mul<
                    R,
                    _Add<INV_6, _Mul<R, _Add<INV_24, _Mul<R, _Add<INV_120, _Mul<R, INV_720>>>>>>
                  >
                >
              >
            >
          >
        >,
        K
      >
    : never
  : never;

type test0 = _Stringify<_Exp<Dec<5>>>; // =>
