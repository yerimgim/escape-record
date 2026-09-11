import type { EscapeRecord } from "../types/record";
import { Badge } from "./ui/badge";

type RoadBadgeProps = {
  badge: EscapeRecord["roadBadge"];
  className?: string;
};

const ROAD_BADGE_STYLES: Record<EscapeRecord["roadBadge"], string> = {
  흙길: "bg-amber-950/10 text-amber-900 border-amber-900/20 dark:bg-amber-950/40 dark:text-amber-300 ", // 갈색 톤
  풀길: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 ", // 풀색 (연두/초록)
  풀꽃길:
    "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 ", // 연노랑
  꽃길: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 ", // 짙은 노랑/주황
  꽃밭길:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 ", // 주황
  인생테마:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 shadow-xs", // 빨강
};

export const RoadBadge = ({ badge, className = "" }: RoadBadgeProps) => {
  const badgeStyle = ROAD_BADGE_STYLES[badge] || "bg-neutral-100";
  return (
    <Badge variant="ghost" className={`${badgeStyle} ${className} text-[10px]`}>
      {badge}
    </Badge>
  );
};
