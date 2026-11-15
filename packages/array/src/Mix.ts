import type { RawArg0, RawArg1, TArg, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Mixes another type into the element type of the given array.
     *
     * Sig: `<A, B>(self: readonly A[], b: B) => readonly (A | B)[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Mix<string[], number>; // => (string | number)[]
     * type _2 = Arr.Mix<readonly number[], "foo">; // => readonly (number | "foo")[]
     * ```
     */
    export type Mix<Self extends readonly unknown[], B> =
      0 extends 1 & Self ? readonly any[] : _Mix<Self, B>;

    /**
     * [Fn] Mixes another type into the element type of the given array.
     *
     * Sig: `<A, B>[b: B](self: readonly A[]) => readonly (A | B)[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.Mix$<number>>; // => (string | number)[]
     * type _2 = Pipe<readonly number[], Arr.Mix$<"foo">>; // => readonly (number | "foo")[]
     * ```
     */
    export interface Mix$<B> extends TypeLambdaG<["A"]> {
      signature: (self: readonly TArg<this, "A">[]) => readonly (TArg<this, "A"> | B)[];
      return: 0 extends 1 & RawArg0<this> ? readonly any[] : _Mix<RawArg0<this>, B>;
    }

    /**
     * [Fn] Mixes another type into the element type of an array.
     *
     * Sig: `<A, B>(self: readonly A[], b: B) => readonly (A | B)[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Arr.Mix$$, string[], number>; // => (string | number)[]
     * type _2 = Call2<Arr.Mix$$, readonly number[], "foo">; // => readonly (number | "foo")[]
     * ```
     */
    export interface Mix$$ extends TypeLambdaG<["A", "B"]> {
      signature: (
        self: readonly TArg<this, "A">[],
        b: TArg<this, "B">,
      ) => readonly (TArg<this, "A"> | TArg<this, "B">)[];
      return: 0 extends 1 & RawArg0<this> ? readonly any[] : _Mix<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _Mix<Self, B> = { [I in keyof Self]: Self[I] | B };
