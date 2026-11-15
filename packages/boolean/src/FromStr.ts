import type { Either, Left, Right } from "@tyda/core";
import type { ImplFromStr } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "@tyda/typeclass" {
  interface FromStrImpl {
    boolean: ImplFromStr<
      boolean,
      {
        FromStr$: FromStr$;
      }
    >;
  }
}

interface FromStr$ extends TypeLambda<[s: string], Either<string, boolean>> {
  return: RawArg0<this> extends "boolean" ? Right<boolean>
  : RawArg0<this> extends "true" ? Right<true>
  : RawArg0<this> extends "false" ? Right<false>
  : Left<`Cannot convert '${RawArg0<this> & string}' to boolean`>;
}
