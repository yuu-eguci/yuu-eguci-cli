// ink-gradient@1 は型定義を同梱していないため、ここで宣言します。
// props は node_modules/ink-gradient/dist.js の propTypes に合わせています。
declare module "ink-gradient" {
  import { FC, ReactNode } from "react"

  interface GradientProps {
    children: ReactNode
    name?:
      | "cristal"
      | "teen"
      | "mind"
      | "morning"
      | "vice"
      | "passion"
      | "fruit"
      | "instagram"
      | "atlas"
      | "retro"
      | "summer"
      | "pastel"
      | "rainbow"
    colors?: (string | object)[]
  }

  const Gradient: FC<GradientProps>
  export = Gradient
}
