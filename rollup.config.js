import nodeResolve from "@rollup/plugin-node-resolve"
import babel from "rollup-plugin-babel"
import hashbang from "rollup-plugin-hashbang"
import { terser } from "rollup-plugin-terser"

export default [
  {
    input: "src/cli.js",
    output: {
      dir: "lib",
    },
    plugins: [nodeResolve(), hashbang(), terser()],
  },
  {
    input: "src/ui.js",
    output: {
      dir: "lib",
    },
    plugins: [babel(), nodeResolve(), terser()],
  },
]
