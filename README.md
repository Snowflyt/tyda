<!-- markdownlint-disable MD033 MD041 MD010 -->
<h1 align="center">Tyda = <span style="color: cornflowerblue">Ty</span>pe + Lamb<span style="color: lightcoral">da</span></h1>

<p align="center">
A <strong>composable</strong> <strong>type-level</strong> programming toolkit for TypeScript.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tyda">
    <img src="https://img.shields.io/npm/dm/tyda.svg" alt="downloads" height="18">
  </a>
  <a href="https://www.npmjs.com/package/tyda">
    <img src="https://img.shields.io/npm/v/tyda.svg" alt="npm version" height="18">
  </a>
  <a href="https://github.com/Snowflyt/tyda/actions/workflows/test.yml">
    <img src="https://github.com/Snowflyt/tyda/actions/workflows/test.yml/badge.svg" alt="test status" height="18">
  </a>
  <a href="https://github.com/gvergnaud/tyda">
    <img src="https://img.shields.io/npm/l/tyda.svg" alt="MIT license" height="18">
  </a>
</p>

```typescript
import type { Pipe, List, Nat, Str } from "tyda";

type Join$ = List.Reduce$<Str.Concat$$, ", ">; // [1]

type ConcatNames<Names extends string[]> = Pipe<
  Names,
  List.Filter$<Flow<Str.Length$, Nat.Gt$<2>>>, // Skip short names
  List.Map$<Str.Cap$>, // Capitalize each name
  Join$ // Join names with a comma
>;

type _ = ConcatNames<["alice", "bob", "i"]>; // => "Alice, Bob"
```

<small>[1]: <code>List.Join$</code> is already defined in Tyda, but for illustration, here is how you could define it yourself.</small>

## Features

- A large collection of type-level utilities that can either be used standalone or composed together.
- Compose **type-level functions** in a **type-safe** way (early error detection at compile time).
- Easily create your own type-level functions that are compatible with Tyda (see [hkt-core](https://github.com/Snowflyt/hkt-core) which Tyda is built upon).

## Installation

To install Tyda via npm (or any other package manager you prefer):

```shell
npm install --save-dev tyda
```

## Getting Started

Tyda groups its type-level utilities into modules such as `List`, `Str`, `Nat`, etc.

Here’s a simple example that shows how to manipulate a list of names at the type level:

```typescript
import type { List, Flow, Nat, Pipe, Str } from "tyda";

type Join$ = List.Reduce$<Str.Concat$$, ", ">; // [1]

type ConcatNames<Names extends string[]> = Pipe<
  Names,
  List.Filter$<Flow<Str.Length$, Nat.Gt$<2>>>, // Skip short names
  List.Map$<Str.Cap$>, // Capitalize each name
  Join$ // Join names with a comma
>;

type _ = ConcatNames<["alice", "bob", "i"]>; // => "Alice, Bob"
```

<small>[1]: <code>List.Join$</code> is already defined in Tyda, but for illustration, here is how you could define it yourself.</small>

In Tyda, the number of `$` suffixes in a utility name indicates the number of arguments that the utility takes. For example, `Str.Length$` is a type-level function that takes one argument (a string type) and returns its length, while `Str.Concat$$` takes two string types and concatenates them.

Tyda ensures type safety during composition, so if you try to compose incompatible type-level functions, TypeScript will catch the error at compile time:

```typescript
import type { Flow, List, Nat, Str } from "tyda";

type ConcatNamesWrong = Flow<
  List.Filter$<Flow<Str.Length$, Nat.Gt$<2>>>,
  List.Map$<Nat.Add$<1>>,
  //        ~~~~~~~~~~~
  // ... Type 'string' is not assignable to type 'number'.
  List.Join$<", ">
>;
```

In the example above, Tyda infers the return type of `List.Filter$<Flow<Str.Length$, Nat.Gt$<2>>>` as `readonly string[]`, which is incompatible with the input type `readonly number[]` expected by `List.Map$<Nat.Add$<1>>`, resulting in a compile-time error.

Such type safety is particularly useful in large codebases where type-level logic can become complex. It helps prevent bugs and ensures correctness.

While the `$`-suffixed type-level functions are convenient for composition, you are not tied to them. Tyda also exports all type-level functions without the `$` suffix, which you can use in a more traditional way:

```typescript
import type { List, Nat, Str } from "tyda";

type LengthGt2<S extends string> = Nat.Gt<Str.Length<S>, 2>;

type FilterLongNames<Names extends string[], Out extends string[] = []> =
  Names extends [infer Head extends string, ...infer Tail extends string[]] ?
    LengthGt2<Head> extends true ?
      FilterLongNames<Tail, [...Out, Head]>
    : FilterLongNames<Tail, Out>
  : Out;

type MapCapitalize<Names extends string[]> = {
  [K in keyof Names]: Str.Cap<Names[K]>;
};

type ConcatNames<Names extends string[]> = List.Join<MapCapitalize<FilterLongNames<Names>>, ", ">;
```

The example above achieves the same result as the previous one. It simply replaces the `$`-suffixed type-level functions with their regular counterparts, and replaces higher-order utilities like `List.Filter$` and `List.Map$` with explicit recursive type definitions. While this is also a valid way to use Tyda, it is more verbose and less composable. In practice, you don’t have to choose one style over the other; you can freely mix and match both.

All type-level functions in Tyda are built upon [hkt-core](https://github.com/Snowflyt/hkt-core), a foundational library for higher-kinded types in TypeScript. Refer to the [hkt-core documentation](https://github.com/Snowflyt/hkt-core) if you want to define your own type-level functions compatible with Tyda.

## Available Modules

Documentation for available modules is coming soon. For now, please refer to the source code and tests for usage examples.

## FAQ

### What’s the difference between the `Arr`, `List`, and `Tuple` modules?

All three work with array-like types, but they target different use cases:

- **`Arr`**
  Designed for regular array types such as `number[]` or `readonly (string | boolean)[]`. For example, `Arr.Elem<number[]>` extracts the element type `number`, and `Arr.Mutate<string[], boolean>` turns `string[]` into `boolean[]`.
  Some utilities may also work on tuples, but they are written with arrays in mind and may behave inconsistently on tuple types.
- **`List`**
  Focused on homogeneous tuples, where all elements share the same type, e.g., `[1, 2, 3]` or `readonly ["foo", "bar"]`. A typical signature looks like `List.Map<A, B>(self: readonly A[], f: (a: A) => B) => readonly B[]`.
  When you pass a heterogeneous tuple to such a function, it is treated as `readonly A[]` for some union `A`, so you lose per-position type information. This works, but type checking becomes less precise for heterogeneous tuples.
- **`Tuple`**
  Targeted at heterogeneous tuples like `readonly [1, "two", false]`, where each position can have a different type. Utilities in this module preserve positional types, so functions like `Tuple.Append` or `Tuple.Zip` are able to express more precise relationships between elements.
  `Tuple` can also provide operations that `List` cannot safely express. For example, `Tuple.Head<A>(as: readonly [A, ...unknown[]]) => A` can assume the input is non-empty at the type level, while `List.Head<A>(as: readonly A[]) => Option<A>` must return an `Option` because it cannot guarantee non-emptiness.

## License

This project is licensed under the [Mozilla Public License 2.0](https://choosealicense.com/licenses/mpl-2.0/) (MPL-2.0). Similar to the MIT License, it is a permissive weak copyleft license. You can use Tyda for any purpose, including commercial and non-commercial projects, and freely distribute projects that depend on Tyda.

However, if you modify Tyda itself and distribute the modified version, you must make the source code of your modifications available under the same MPL-2.0 license. This ensures that improvements to Tyda remain open and accessible to the community.

You are also not allowed to remove or alter any copyright or license notices in Tyda’s source code, or use Tyda’s trademarks without permission.

This is not legal advice. If you have specific legal questions about using Tyda under the MPL-2.0 license, please consult a qualified attorney.
