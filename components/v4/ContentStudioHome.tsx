import { recommended } from "../../data/v4/usableERP";
import { Box, Shell, WriteButton } from "./UsableLayout";

export default function ContentStudioHome() {
  return (
    <Shell title="글쓰기" desc="다른 화면에서 넘어온 주제를 바로 작성하는 곳입니다.">
      <Box title="바로 작성 후보">
        <div className="space-y-2">
          {recommended.map((r) => (
            <div key={r.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EFF8F2] p-3">
              <div>
                <p className="font-black">{r.title}</p>
                <p className="text-xs text-[#2F6B4F]">네이버 / Google / 이미지로 이어질 주제</p>
              </div>
              <div className="flex gap-2">
                <WriteButton title={r.title} mode="naver" />
                <WriteButton title={r.title} mode="google" />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Shell>
  );
}
