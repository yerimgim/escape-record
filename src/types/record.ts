export type Review = {
  id: string;
  content: string;
  author: string;
  comment: string;
  rating: number;
  createdAt: string;
};

export type EscapeRecord = {
  id: string;
  storeName: string;
  themeName: string;
  genre: string;
  roadBadge: "흙길" | "풀길" | "풀꽃길" | "꽃길" | "꽃밭길" | "인생테마";
  posterUrl?: string; // 공식 테마 포스터 이미지 URL
  certImages?: string[]; // 친구들과 찍은 보드판 / 탈출 인증샷 (여러 장)
  avgRating: number;
  lockRatio: number; // 슬라이더 사용
  isSuccess: boolean;
  reviews: Review[];
  createdAt: string;
  date: Date;
  clearTime: string;
  tags: string[];
};
