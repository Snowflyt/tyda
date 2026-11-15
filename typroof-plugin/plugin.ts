import type * as ts from "typescript";
import type { Plugin } from "typroof/plugin";
import { bold } from "typroof/utils/colors";

/**
 * The Tyda plugin for Typroof.
 * @returns
 */
export default function tyda(): Plugin {
  return {
    name: "typroof-plugin-tyda",

    analyzers: {
      beOfSig(actual, expected, { not, ts, typeChecker, validationResult }) {
        const actualText = bold(actual.text);
        const expectedSignature = bold(typeChecker.typeToString(expected));

        if (!validationResult)
          if (not)
            throw `Expect TypeLambda ${actualText} not to be of signature ${expectedSignature}, but does.`;
          else
            throw `Expect TypeLambda ${actualText} to be of signature ${expectedSignature}, but does not.`;

        /**
         * Parse a function type string into a `FunctionTypeNode` using fake source code.
         * @returns The parsed function type node, or undefined if parsing fails.
         */
        const parseFunctionType = (typeString: string): ts.FunctionTypeNode | undefined => {
          const fakeSource = `type __Sig = ${typeString};`;
          const sourceFile = ts.createSourceFile(
            "_.ts",
            fakeSource,
            ts.ScriptTarget.ESNext,
            true,
            ts.ScriptKind.TS,
          );

          const alias = sourceFile.statements[0];
          if (!alias || !ts.isTypeAliasDeclaration(alias)) return undefined;
          if (!ts.isFunctionTypeNode(alias.type)) return undefined;

          return alias.type;
        };

        /**
         * Normalize type parameter names and their references inside a `FunctionTypeNode`.
         * All type parameters become T0, T1, ... in declaration order.
         * @returns The normalized function type node.
         */
        const normalizeFunctionTypeNode = (node: ts.FunctionTypeNode): ts.FunctionTypeNode => {
          const factory = ts.factory;

          const mapping = new Map<string, string>();
          const typeParameters = node.typeParameters ?? factory.createNodeArray();

          typeParameters.forEach((typeParameter, index) => {
            const oldName = typeParameter.name.text;
            const newName = `T${index}`;
            mapping.set(oldName, newName);
          });

          if (!mapping.size) return node;

          const visitor: ts.Visitor = (current) => {
            if (ts.isTypeParameterDeclaration(current)) {
              const oldName = current.name.text;
              const newName = mapping.get(oldName);
              if (!newName) return current;

              return factory.updateTypeParameterDeclaration(
                current,
                current.modifiers,
                factory.createIdentifier(newName),
                current.constraint,
                current.default,
              );
            }

            if (ts.isTypeReferenceNode(current) && ts.isIdentifier(current.typeName)) {
              const oldName = current.typeName.text;
              const newName = mapping.get(oldName);
              if (!newName) return ts.visitEachChild(current, visitor, undefined);

              return factory.updateTypeReferenceNode(
                current,
                factory.createIdentifier(newName),
                current.typeArguments &&
                  ts.visitNodes(current.typeArguments, visitor, ts.isTypeNode),
              );
            }

            return ts.visitEachChild(current, visitor, undefined);
          };

          return ts.visitNode(node, visitor) as ts.FunctionTypeNode;
        };

        /**
         * Print a type node into a string using the TypeScript printer.
         * @returns The printed type as a string.
         */
        const printTypeNode = (node: ts.TypeNode): string => {
          const printer = ts.createPrinter({ removeComments: true });
          const sourceFile = ts.createSourceFile(
            "_.ts",
            "",
            ts.ScriptTarget.ESNext,
            false,
            ts.ScriptKind.TS,
          );
          return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
        };

        /**
         * Normalize a function type for comparison: use `typeToString` for a simple
         * textual form, parse it back into a `FunctionTypeNode`, rename type parameters
         * to T0/T1/... and print the normalized node.
         * @returns The normalized signature string.
         */
        const normalizedTypeToStringForSignature = (type: ts.Type): string => {
          const typeString = typeChecker.typeToString(type);
          const functionTypeNode = parseFunctionType(typeString);
          if (!functionTypeNode) return typeString;

          const normalizedNode = normalizeFunctionTypeNode(functionTypeNode);
          return printTypeNode(normalizedNode);
        };

        const tupleTypes = typeChecker.getTypeArguments(validationResult as ts.TupleType);
        const normalizedActual = normalizedTypeToStringForSignature(tupleTypes[0]!);
        const normalizedExpected = normalizedTypeToStringForSignature(tupleTypes[1]!);

        const actualSignature = bold(typeChecker.typeToString(tupleTypes[0]!));

        if (normalizedActual !== normalizedExpected)
          if (not)
            throw `Expect TypeLambda ${actualText} not to be of signature ${expectedSignature}, but does.`;
          else
            throw `Expect TypeLambda ${actualText} to be of signature ${expectedSignature}, but got ${actualSignature}.`;
      },

      beOneOf(actual, expected, { not, typeChecker }) {
        const actualText = bold(actual.text);
        const expectedTypes = bold(typeChecker.typeToString(expected).slice(1, -1));

        throw `Expect type ${actualText} ${not ? "not " : ""}to be one of ${expectedTypes}, but is${
          not ? "" : " not"
        }.`;
      },

      exactEqual(actual, expected, { not, typeChecker }) {
        if (typeChecker.typeToString(actual.type) === typeChecker.typeToString(expected)) return;

        const actualText = bold(actual.text);
        const expectedType = bold(typeChecker.typeToString(expected));

        let message = `Expect ${actualText}`;
        if (actual.text !== typeChecker.typeToString(actual.type))
          message += ` (${bold(typeChecker.typeToString(actual.type))})`;
        if (not) message += " not";
        message += ` to exactly equal ${expectedType}, but does`;
        if (!not) message += " not";
        message += ".";

        throw message;
      },
    },
  };
}
