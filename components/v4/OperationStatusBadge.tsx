import { statusClass, statusLabel } from '../../data/v4/operationHomeStatus';
import type { ChannelStatus } from '../../data/v4/operationHomeData';

export function StatusBadge({ status }: { status: ChannelStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[status]}`}>{statusLabel[status]}</span>;
}
