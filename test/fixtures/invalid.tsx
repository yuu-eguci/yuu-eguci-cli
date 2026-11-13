// 意図的に誤ったコードです。test/typecheck.test.js で tsc がエラーにすることを確認します。
import chalk from "chalk"
import { Box } from "ink"
import Gradient from "ink-gradient"
import open from "open"
import React from "react"

export const invalidBox = <Box flexDirection="diagonal" />
export const invalidGradient = <Gradient name="no-such-gradient">text</Gradient>
export const invalidOpen = () => open(42)
export const invalidChalk = chalk.noSuchStyle("text")
export const implicitAny = (value) => value
export const unusedLocal = () => {
  const unused = 1
}
