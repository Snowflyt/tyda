import tyda from "@tyda/typroof-plugin";
import { defineConfig } from "typroof/config";

export default defineConfig({
  plugins: [tyda()],
  testFiles: "**/*.test.ts",
});
