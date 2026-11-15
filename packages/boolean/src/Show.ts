import type { ImplShow } from "@tyda/typeclass";
import type { RawArg0, TypeLambda } from "hkt-core";

declare module "@tyda/typeclass" {
  interface ShowImpl {
    boolean: ImplShow<
      boolean,
      {
        Show$: Show$;
      }
    >;
  }
}

interface Show$ extends TypeLambda<[self: boolean], string> {
  return: boolean extends RawArg0<this> ? "boolean"
  : RawArg0<this> extends true ? "true"
  : "false";
}
