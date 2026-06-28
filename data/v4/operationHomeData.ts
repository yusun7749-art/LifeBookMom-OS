export type ChannelStatus = 'draft' | 'ready' | 'published' | 'pending';

export type ContentItem = {
  id: string;
  date: string;
  category: string;
  keyword: string;
  naverTitle: string;
  googleTitle: string;
  naverStatus: ChannelStatus;
  googleStatus: ChannelStatus;
  imageStatus: ChannelStatus;
  published: boolean;
};

export const todayTopics = [
  {
    keyword: '초등학생 체취 변화',
    category: '건강',
    naverTitle: '초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법',
    googleTitle: '초등학생 체취 변화 원인과 생활 속 위생 관리법',
    reason: '성장기·사춘기·위생 키워드 연결성이 높아 네이버와 Google 동시 발행에 적합합니다.',
  },
  {
    keyword: '초3 사춘기 신호',
    category: '성장',
    naverTitle: '초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화',
    googleTitle: '초등학교 3학년 사춘기 초기 신호와 부모의 대처법',
    reason: '공감형 네이버 글과 정보형 Google 글을 나누기 좋은 주제입니다.',
  },
  {
    keyword: '초등학생 여름 위생',
    category: '건강',
    naverTitle: '땀 많은 초등학생, 여름 위생 습관 어떻게 잡아줄까요?',
    googleTitle: '초등학생 여름철 위생 관리 체크리스트',
    reason: '계절성 키워드로 빠르게 발행하기 좋습니다.',
  },
  {
    keyword: '초등학생 속옷 교체',
    category: '생활',
    naverTitle: '초등학생 속옷, 언제부터 자주 갈아입혀야 할까요?',
    googleTitle: '초등학생 속옷 교체 시기와 위생 습관 가이드',
    reason: '생활형 검색 유입과 쿠팡 연결성이 높습니다.',
  },
  {
    keyword: '초등학생 성장기 몸 변화',
    category: '성장',
    naverTitle: '우리 아이 몸이 달라졌어요, 초등학생 성장기 변화 자연스럽게 알려주기',
    googleTitle: '초등학생 성장기 몸 변화와 부모가 알려줘야 할 기본 위생',
    reason: '성조숙증·여드름·체취 내부링크 확장에 좋습니다.',
  },
];

export const contents: ContentItem[] = [
  {
    id: '2026-06-28-body-odor',
    date: '2026-06-28',
    category: '건강',
    keyword: '초등학생 체취 변화',
    naverTitle: '초등학생 체취 변화, 부모가 꼭 알아야 할 원인과 관리법',
    googleTitle: '초등학생 체취 변화 원인과 생활 속 위생 관리법',
    naverStatus: 'ready',
    googleStatus: 'pending',
    imageStatus: 'pending',
    published: false,
  },
  {
    id: '2026-06-28-puberty',
    date: '2026-06-28',
    category: '성장',
    keyword: '초3 사춘기 신호',
    naverTitle: '초3 사춘기 신호, 부모가 가장 먼저 알아야 할 변화',
    googleTitle: '초등학교 3학년 사춘기 초기 신호와 부모의 대처법',
    naverStatus: 'ready',
    googleStatus: 'pending',
    imageStatus: 'ready',
    published: false,
  },
];

export const recommendedBuckets = [
  '건강',
  '생활습관',
  '학교생활',
  '디지털',
  '안전',
  '성장',
  '계절',
  '친구관계',
];
