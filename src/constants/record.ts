import type { EscapeRecord } from "../types/record";

// 평가 옵션
export const ROAD_BADGE_OPTIONS: EscapeRecord["roadBadge"][] = [
  "흙길",
  "풀길",
  "풀꽃길",
  "꽃길",
  "꽃밭길",
  "인생테마",
] as const;

// 장르
export const GENRE_OPTIONS = [
  "감성/드라마",
  "공포",
  "스릴러",
  "추리",
  "코미디",
  "SF/판타지",
  "액션",
  "그 외",
] as const;
