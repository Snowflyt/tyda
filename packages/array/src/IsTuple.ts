import type { Arg0, TypeLambda } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Checks if the given array is a tuple.
     *
     * Sig: `(self: readonly unknown[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.IsTuple<string[]>; // => false
     * type _2 = Arr.IsTuple<readonly number[]>; // => false
     * type _3 = Arr.IsTuple<[]>; // => true
     * type _4 = Arr.IsTuple<["foo", "bar"]>; // => true
     * type _5 = Arr.IsTuple<readonly [42, 1337, ...string[]]>; // => true
     * type _6 = Arr.IsTuple<[...(number | boolean)[], string]>; // => true
     * type _7 = Arr.IsTuple<readonly [...string[]]>;
     * //   ^?: false, because TypeScript treats `readonly [...string[]]` equivalently to
     * //              `readonly string[]`; the same applies to non-readonly arrays as well,
     * //              e.g., `[...(number | string)[]]` is equivalent to `(number | string)[]`
     * ```
     *
     * @see {@linkcode Arr.IsFixedLengthTuple}
     */
    export type IsTuple<Self extends readonly unknown[]> =
      0 extends 1 & Self ? boolean
      : // HACK: We use the famous `Equals` trick here to check if `Self` is exactly the same
      // as the array type constructed from its first element's type.
      // This is considered hacky and not quite recommended by the TypeScript team, an alternative
      // solution would be checking `[Extract<keyof Self, `${number}`>] extends [never]` and
      // manually handle tuples starting with rest elements, but that approach also seems awkward
      // and not quite consistent. I prefer the current approach despite its hackiness.
      Self extends unknown[] ?
        (<G>() => G extends Self ? 1 : 2) extends <G>() => G extends Self[0][] ? 1 : 2 ?
          false
        : true
      : (<G>() => G extends Self ? 1 : 2) extends <G>() => G extends readonly Self[0][] ? 1 : 2 ?
        false
      : true;

    /**
     * [Fn] Checks if the given array is a tuple.
     *
     * Sig: `(self: readonly unknown[]) => boolean`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.IsTuple$>; // => false
     * type _2 = Pipe<readonly number[], Arr.IsTuple$>; // => false
     * type _3 = Pipe<[], Arr.IsTuple$>; // => true
     * type _4 = Pipe<["foo", "bar"], Arr.IsTuple$>; // => true
     * type _5 = Pipe<readonly [42, 1337, ...string[]], Arr.IsTuple$>; // => true
     * type _6 = Pipe<[...(number | boolean)[], string], Arr.IsTuple$>; // => true
     * type _7 = Pipe<readonly [...string[]], Arr.IsTuple$>;
     * //   ^?: false, because TypeScript treats `readonly [...string[]]` equivalently to
     * //              `readonly string[]`; the same applies to non-readonly arrays as well,
     * //              e.g., `[...(number | string)[]]` is equivalent to `(number | string)[]`
     * ```
     *
     * @see {@linkcode Arr.IsFixedLengthTuple$}
     */
    export interface IsTuple$ extends TypeLambda<[self: readonly unknown[]], boolean> {
      return: IsTuple<Arg0<this>>;
    }
  }
}
