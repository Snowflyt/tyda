import type { Either, Left, Right } from "@tyda/core";
import type { ImplFromStr } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

import type { _StrToNum } from "./internal/_StrToNum";

declare module "@tyda/typeclass" {
  interface FromStrImpl {
    number: ImplFromStr<
      number,
      {
        FromStr$: FromStr$;
      }
    >;
  }
}

interface FromStr$ extends TypeLambda<[s: string], Either<string, number>> {
  return: FromStr<RawArg0<this>>;
}

type FromStr<S> =
  S extends "number" ? Right<number>
  : [_StrToNum<S>] extends [never] ? Left<`Cannot convert '${S & string}' to number`>
  : Right<_StrToNum<S>>;
