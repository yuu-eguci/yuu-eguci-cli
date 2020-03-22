const ager = require("ager")
const chalk = require("chalk")
const { Box, Text } = require("ink")
const Gradient = require("ink-gradient")
const SelectInput = require("ink-select-input").default
const open = require("open")
const React = require("react")

const font = [
  "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "░░░░░░░░░░██║░░░██║░░░░░░░░░░░░░░░░░░░░░████████║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "░░░░░░░░░░██║░░░██║░░░░░░░░░░░░░░░░░░░░░██║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "░░░░░░░░░░██║░░░██║░░░░░░░░░░░░░░░░░░░░░██║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██║░░░░░░░░░░",
  "░░░░░░░░░░████████║░░██║░██║░░██║░██║░░░██████║░░░██████║░██║░██║░█████║░░░░░░░░░░░░░░",
  "░░░░░░░░░░░░░░░░██║░░██║░██║░░██║░██║░░░██║░░░░░░░██║░██║░██║░██║░██║░░░░██║░░░░░░░░░░",
  "░░░░░░░░░░░░░░░░██║░░██║░██║░░██║░██║░░░██║░░░░░░░██████║░██║░██║░██║░░░░██║░░░░░░░░░░",
  "░░░░░░░░░░████████║░░██████║░░██████║░░░████████║░░░░░██║░██████║░█████║░██║░░░░░░░░░░",
  "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
]

const popups = [
  chalk.blue`🐶 Dog person & Pythonista 🐍`,
]

const links = {
  "Portfolio Site": { icon: "📜", link: "https://portfolio.hitoren.net/" },
  "GitHub": { icon: "💻", link: "https://github.com/yuu-eguci" },
  "Qiita": { icon: "📝", link: "https://qiita.com/yuu-eguci" },
  "Facebook": { icon: "📘", link: "https://www.facebook.com/yuu.eguci" },
  "Instagram": { icon: "📷", link: "https://www.instagram.com/hitorenshuu/" },
  "Wish List": { icon: "🎁", link: "https://www.amazon.co.jp/hz/wishlist/ls/KLB1QHSAETC3?ref_=wl_share" },
}
const linkItems = Object.entries(links).map(([key, { icon, link }]) => ({
  label: [icon, " ".repeat(2), key].join(""),
  value: link,
}))
const handleSelect = ({ value }) => open(value)

const profile = [
  {
    label: "Name",
    value: "Yuu Eguci",
  },
  {
    label: "Language",
    value: "Ja, En, Ro",
  },
  {
    label: "Can",
    value: "Develop Web system",
  },
  {
    label: "Can",
    value: "Run 5 min/km",
  },
  {
    label: "Can",
    value: "Be a friend of dogs",
  },
  {
    label: "Can",
    value: "Live to laugh",
  },
]
const longestProfileLabel = profile.reduce(
  (p, c) => Math.max(p, c.label.length),
  0
)

const ui = () => (
  <Box width="100%" justifyContent="center" paddingY={2}>
    <Box
      flexDirection="column"
      alignItems="center"
      width={font.reduce((p, c) => Math.max(p, c.length), 0)}
    >
      <Box marginBottom={2}>
        <Text>
          <Gradient name="atlas">{font.join("\n")}</Gradient>
        </Text>
      </Box>
      <Box marginBottom={1}>
        <Text>～ {popups[Math.floor(Math.random() * popups.length)]} ～</Text>
      </Box>
      <Box flexDirection="row" width="100%">
        <Box flexGrow={2}>
          <SelectInput items={linkItems} onSelect={handleSelect} />
        </Box>
        <Box marginLeft={2} flexDirection="column">
          {profile.map(({ label, value }, i) => (
            <Text key={i}>
              {[
                chalk.cyan.italic(label),
                " ".repeat(longestProfileLabel - label.length),
                " │ ",
                chalk.bold(value),
              ].join("")}
            </Text>
          ))}
        </Box>
      </Box>
      <Box marginTop={1}>
        <Text>{chalk.green`Exit`} Ctrl + C</Text>
      </Box>
    </Box>
  </Box>
)

module.exports = ui
