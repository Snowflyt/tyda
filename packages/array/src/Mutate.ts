import type { RawArg0, RawArg1, TArg, TypeLambda, TypeLambdaG } from "hkt-core";

declare module "." {
  namespace Arr {
    /**
     * Mutates the element type of the given array into another type.
     *
     * Sig: `<A, B>(self: readonly A[], b: B) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Arr.Mutate<string[], number>; // => number[]
     * type _2 = Arr.Mutate<readonly number[], "foo">; // => readonly "foo"[]
     * ```
     */
    export type Mutate<Self extends readonly unknown[], B> =
      0 extends 1 & Self ? readonly B[] : _Mutate<Self, B>;

    /**
     * [Fn] Mutates the element type of the given array into another type.
     *
     * Sig: `<A, B>[b: B](self: readonly A[]) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Pipe<string[], Arr.Mutate$<number>>; // => number[]
     * type _2 = Pipe<readonly number[], Arr.Mutate$<"foo">>; // => readonly "foo"[]
     * ```
     */
    export interface Mutate$<B> extends TypeLambda<[self: readonly unknown[]], readonly B[]> {
      return: 0 extends 1 & RawArg0<this> ? readonly B[] : _Mutate<RawArg0<this>, B>;
    }

    /**
     * [Fn] Mutates the element type of an array into another type.
     *
     * Sig: `<A, B>(self: readonly A[], b: B) => readonly B[]`
     *
     * **Example**
     *
     * ```typescript
     * type _1 = Call2<Arr.Mutate$$, string[], number>; // => number[]
     * type _2 = Call2<Arr.Mutate$$, readonly number[], "foo">; // => readonly "foo"[]
     * ```
     */
    export interface Mutate$$ extends TypeLambdaG<["B"]> {
      signature: (self: readonly unknown[], b: TArg<this, "B">) => readonly TArg<this, "B">[];
      return: 0 extends 1 & RawArg0<this> ? readonly RawArg1<this>[]
      : _Mutate<RawArg0<this>, RawArg1<this>>;
    }
  }
}

type _Mutate<Self, B> = { [I in keyof Self]: B };
