export type AssetGrade = "A-대표글" | "B-시즌글" | "C-수익보조글" | "D-리뉴얼필요";

export function suggestAssetGrade(title: string): AssetGrade {
  if (title.includes("총정리") || title.includes("기준")) return "A-대표글";
  if (title.includes("장마") || title.includes("여름") || title.includes("방학")) return "B-시즌글";
  if (title.includes("준비물") || title.includes("추천")) return "C-수익보조글";
  return "D-리뉴얼필요";
}
