import { create } from "zustand";
import type { EscapeRecord } from "../types/record";
import { persist } from "zustand/middleware";

type RecordStore = {
  records: EscapeRecord[];
  addRecord: (record: EscapeRecord) => void;
  deleteRecord: (id: string) => void;
  // updateRecord: (id, record) => void
};

// 임시
const INITIAL_RECORDS: EscapeRecord[] = [
  {
    id: "1",
    storeName: "키이프스케이프 강남점",
    themeName: "메모리 컴퍼니",
    genre: "감성/드라마",
    roadBadge: "인생테마",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
    certImages: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500",
    ],
    avgRating: 4.8,
    lockRatio: 7, // 자물쇠 7 : 장치 3
    isSuccess: true,
    clearTime: "14:20 남음",
    reviews: [
      {
        id: "r1",
        author: "뚝딱",
        content:
          "인테리어가 미쳤음... 문제 연출이 진짜 부드럽고 스토리 몰입감 최고!",
        comment: "인생 테마 등극! 연출이 진짜 화려함.",
        rating: 5,
        createdAt: "2026-09-05",
      },
    ],
    tags: ["꽃길", "감성"],
    createdAt: "2026-09-05T10:00:00Z",
    date: new Date("2026-09-05"),
  },
];

export const useRecordStore = create<RecordStore>()(
  persist(
    (set) => ({
      records: [],
      addRecord: (newRecord: EscapeRecord) => {
        const createdItem = {
          ...newRecord,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          records: [createdItem, ...state.records],
        }));
      },
      deleteRecord: (id: string) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        }));
      },
    }),
    {
      name: "escape-records-storage",
    },
  ),
);
