const assert = require("assert")
const { spawnSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const { test } = require("node:test")

const rootDir = path.resolve(__dirname, "..")
const tsc = path.join(rootDir, "node_modules", "typescript", "bin", "tsc")

const runTsc = (project) =>
  spawnSync(process.execPath, [tsc, "-p", project], {
    cwd: rootDir,
    encoding: "utf8",
  })

test("application sources are TypeScript", () => {
  const sources = fs.readdirSync(path.join(rootDir, "src"))
  assert.ok(sources.includes("cli.ts"))
  assert.ok(sources.includes("ui.tsx"))
  assert.deepStrictEqual(
    sources.filter((file) => /\.jsx?$/.test(file)),
    []
  )
})

test("src passes the type check", () => {
  const result = runTsc("tsconfig.json")
  assert.strictEqual(result.status, 0, result.stdout + result.stderr)
})

test("the type check rejects misuse of the CLI's dependencies", () => {
  const result = runTsc(path.join("test", "fixtures", "tsconfig.json"))
  const output = result.stdout + result.stderr
  assert.notStrictEqual(result.status, 0, output)
  // invalid.tsx の各行がエラーになることで、依存パッケージの型が解決され、
  // strict などの設定が有効であることを確認します。
  for (const expected of [
    /invalid\.tsx\(8,\d+\): error TS2322/, // ink の Box の props です。
    /invalid\.tsx\(9,\d+\): error TS2322/, // ink-gradient の name (src/types の型宣言) です。
    /invalid\.tsx\(10,\d+\): error TS2345/, // open() の引数です。
    /invalid\.tsx\(11,\d+\): error TS2339/, // chalk のスタイル名です。
    /invalid\.tsx\(12,\d+\): error TS7006/, // 暗黙の any です。
    /invalid\.tsx\(14,\d+\): error TS6133/, // 未使用の変数です。
  ]) {
    assert.match(output, expected)
  }
})
