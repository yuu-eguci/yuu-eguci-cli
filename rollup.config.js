import babel from "rollup-plugin-babel"
import hashbang from "rollup-plugin-hashbang"
import { terser } from "rollup-plugin-terser"

import pkg from "./package.json"

// 依存パッケージは実行時に node_modules から読み込み、lib/cli.js は lib/ui.js を読み込みます。
const external = [...Object.keys(pkg.dependencies), "./ui"]
const extensions = [".ts", ".tsx"]

export default [
  {
    input: "src/cli.ts",
    external,
    output: {
      dir: "lib",
      format: "cjs",
    },
    plugins: [hashbang(), babel({ extensions }), terser()],
  },
  {
    input: "src/ui.tsx",
    external,
    output: {
      dir: "lib",
      format: "cjs",
    },
    plugins: [babel({ extensions }), terser()],
  },
]
