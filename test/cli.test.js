const assert = require("assert")
const { execFileSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const { test } = require("node:test")

const { libDir, renderBuiltUi } = require("./helpers/render")

const rootDir = path.resolve(__dirname, "..")

test("lib/cli.js is an executable node script that renders ./ui", () => {
  const cliPath = path.join(libDir, "cli.js")
  const source = fs.readFileSync(cliPath, "utf8")
  assert.ok(source.startsWith("#!/usr/bin/env node\n"))
  assert.notStrictEqual(fs.statSync(cliPath).mode & 0o111, 0)
  assert.match(source, /require\(["']\.\/ui(\.js)?["']\)/)
  assert.match(source, /require\(["']ink["']\)/)
  assert.match(source, /require\(["']react["']\)/)
})

test("lib/ui.js keeps runtime dependencies external", () => {
  const source = fs.readFileSync(path.join(libDir, "ui.js"), "utf8")
  for (const dependency of [
    "chalk",
    "ink",
    "ink-gradient",
    "ink-select-input",
    "open",
    "react",
  ]) {
    assert.match(source, new RegExp(`require\\(["']${dependency}["']\\)`))
  }
})

test("the UI renders the banner, links, profile and exit hint", async () => {
  const { ui, lastFrame, unmount } = await renderBuiltUi()
  try {
    assert.strictEqual(typeof ui, "function")
    const frame = lastFrame()
    for (const text of [
      "░░░░░░░░░░████████║░░██████║░░██████║░░░████████║░░░░░██║░██████║░█████║░██║░░░░░░░░░░",
      "～ 🐶 Dog person & Pythonista 🐍 ～",
      "❯ 📜  Portfolio Site",
      "💻  GitHub",
      "📝  Qiita",
      "📘  Facebook",
      "📷  Instagram",
      "🎁  Wish List",
      "Name     │ Yuu Eguci",
      "Language │ Ja, En, Ro",
      "Can      │ Develop Web system",
      "Can      │ Run 5 min/km",
      "Can      │ Be a friend of dogs",
      "Can      │ Live to laugh",
      "Exit Ctrl + C",
    ]) {
      assert.ok(frame.includes(text), `missing: ${text}\n${frame}`)
    }
  } finally {
    unmount()
  }
})

test("selecting a link opens its URL", async () => {
  const { opened, press, unmount } = await renderBuiltUi()
  try {
    await press("\r")
    await press("\u001B[B")
    await press("\r")
    await press("\u001B[A")
    await press("\u001B[A")
    await press("\r")
    assert.deepStrictEqual(opened, [
      "https://portfolio.hitoren.net/",
      "https://github.com/yuu-eguci",
      "https://www.amazon.co.jp/hz/wishlist/ls/KLB1QHSAETC3?ref_=wl_share",
    ])
  } finally {
    unmount()
  }
})

test("the npm package ships only the built CLI", () => {
  const output = execFileSync(
    "npm",
    ["pack", "--dry-run", "--json", "--ignore-scripts"],
    { cwd: rootDir, encoding: "utf8" }
  )
  const [pack] = JSON.parse(output)
  assert.deepStrictEqual(pack.files.map((file) => file.path).sort(), [
    "LICENSE",
    "README.md",
    "lib/cli.js",
    "lib/ui.js",
    "package.json",
  ])
  const pkg = JSON.parse(
    fs.readFileSync(path.join(rootDir, "package.json"), "utf8")
  )
  assert.deepStrictEqual(pkg.bin, { "yuu-eguci": "lib/cli.js" })
  assert.strictEqual(pkg.main, "lib/cli.js")
})
