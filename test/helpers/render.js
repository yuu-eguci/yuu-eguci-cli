const { EventEmitter } = require("events")
const path = require("path")

const libDir = path.resolve(__dirname, "../../lib")

// eslint-disable-next-line no-control-regex
const stripAnsi = (text) => text.replace(/\x1b\[[0-9;?]*[a-zA-Z]/g, "")

const createFakeStdout = () => {
  const frames = []
  const stdout = Object.assign(new EventEmitter(), {
    columns: 120,
    rows: 40,
    isTTY: true,
    write: (data) => {
      frames.push(String(data))
      return true
    },
  })
  return { stdout, frames }
}

const createFakeStdin = () =>
  Object.assign(new EventEmitter(), {
    isTTY: true,
    setRawMode() {},
    setEncoding() {},
    resume() {},
    pause() {},
    ref() {},
    unref() {},
  })

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// `open` を記録用の関数に差し替えて lib/ui.js を読み込み、疑似ストリームに描画します。
const renderBuiltUi = async () => {
  const openPath = require.resolve("open")
  const opened = []
  const originalOpen = require.cache[openPath]
  require.cache[openPath] = {
    id: openPath,
    filename: openPath,
    loaded: true,
    exports: (target) => {
      opened.push(target)
      return Promise.resolve()
    },
  }
  const uiPath = require.resolve(path.join(libDir, "ui.js"))
  delete require.cache[uiPath]
  let ui
  try {
    ui = require(uiPath)
  } finally {
    if (originalOpen) require.cache[openPath] = originalOpen
    else delete require.cache[openPath]
  }

  const { render } = require("ink")
  const React = require("react")
  const { stdout, frames } = createFakeStdout()
  const stdin = createFakeStdin()
  const instance = render(React.createElement(ui), {
    stdout,
    stdin,
    debug: true,
    exitOnCtrlC: false,
  })
  await wait(100)

  const lastFrame = () =>
    stripAnsi(frames.filter((frame) => frame.includes("Ctrl + C")).pop() || "")
  const press = async (input) => {
    stdin.emit("data", input)
    await wait(50)
  }
  return { ui, opened, lastFrame, press, unmount: () => instance.unmount() }
}

module.exports = { libDir, renderBuiltUi }
