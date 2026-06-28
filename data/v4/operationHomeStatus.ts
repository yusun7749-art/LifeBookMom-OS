import type { ChannelStatus } from './operationHomeData';

export const statusLabel: Record<ChannelStatus, string> = {
  draft: '작성중',
  ready: '작성완료',
  published: '발행완료',
  pending: '대기',
};

export const statusClass: Record<ChannelStatus, string> = {
  draft: 'bg-amber-100 text-amber-800',
  ready: 'bg-blue-100 text-blue-800',
  published: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-zinc-100 text-zinc-600',
};
