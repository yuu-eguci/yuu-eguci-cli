#!/usr/bin/env node

const { render } = require("ink")
const React = require("react")

const ui = require("./ui")

render(React.createElement(ui))
