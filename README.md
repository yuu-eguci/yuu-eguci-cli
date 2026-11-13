[![npm version](https://badge.fury.io/js/%40yuu-eguci%2Fcli.png)](https://badge.fury.io/js/%40yuu-eguci%2Fcli)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

yuu-eguci
===

![readme](https://user-images.githubusercontent.com/28250432/77243494-7660a100-6c02-11ea-88d4-71ea426d5b6a.png)

## Usage

Install node.js, then:

```bash
npx @yuu-eguci/cli
```

## How to open on local

```bash
yarn install
yarn run dev
```

## 開発

ソースコードは TypeScript で書かれています。

- `src/cli.ts`: コマンドのエントリーポイントです。
- `src/ui.tsx`: Ink (React) で描画する画面コンポーネントです。
- `src/types/`: 型定義を同梱していない依存パッケージ (`ink-gradient`) の型宣言です。

開発には Node.js 18 以上と Yarn 1 を使います。主なコマンドは次のとおりです。

| コマンド | 内容 |
| --- | --- |
| `yarn run dev` | ビルドせずに `src/cli.ts` を直接起動します。 |
| `yarn run typecheck` | `tsc` で `src/` の型チェックを行います (ファイルは出力しません)。 |
| `yarn run build` | Rollup と Babel で `src/` をビルドし、`lib/cli.js` と `lib/ui.js` を出力します。 |
| `yarn test` | ビルドしたうえで、`test/` のテストを Node.js 標準のテストランナーで実行します。 |

GitHub Actions (`.github/workflows/ci.yml`) では、プルリクエストと `master` への push のたびに、Node.js 24 と Yarn 1 で `yarn install --frozen-lockfile --ignore-scripts`、`yarn typecheck`、`yarn test` を実行し、パッケージに含まれるファイルを確認します。

公開パッケージに含まれるのはビルド結果の `lib/` だけです。`npx @yuu-eguci/cli` で実行されるのは `lib/cli.js` です。

## Ambiguous width problem

![problem](https://user-images.githubusercontent.com/28250432/96327555-8bf15880-1075-11eb-8480-7af01f9397d9.png)

- Unicode東アジアA(曖昧)の文字幅をW(広)にする チェックをつけたり外したりすれば直るかもしれない。
    - ターミナル > 環境設定 > プロファイル > 詳細 > 一番下
    - 一応、外した状態で正常に表示されることを確認しています。

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://portfolio.hitoren.net/"><img src="https://avatars1.githubusercontent.com/u/28250432?v=4" width="100px;" alt=""/><br /><sub><b>Yuu Eguci</b></sub></a><br /><a href="https://github.com/yuu-eguci/yuu-eguci/commits?author=yuu-eguci" title="Code">💻</a> <a href="#maintenance-yuu-eguci" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!