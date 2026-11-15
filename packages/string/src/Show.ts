import type { ImplShow } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "@tyda/typeclass" {
  interface ShowImpl {
    string: ImplShow<
      string,
      {
        Show$: Show$;
      }
    >;
  }
}

interface Show$ extends TypeLambda<[self: string], string> {
  return: string extends RawArg0<this> ? "string" : `'${RawArg0<this> & string}'`;
}
