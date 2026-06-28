import OriginalTitleBulkBoard from "./OriginalTitleBulkBoard";

export default function PlatformBoard({ platform }: { platform: "네이버" | "Google" }) {
  return <OriginalTitleBulkBoard title={`${platform} 원본 제목 관리`} desc="전체 발행내역에서 체크 후 상단 버튼으로 실행합니다." />;
}
