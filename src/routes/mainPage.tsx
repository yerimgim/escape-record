import { useState } from "react";
import {
  DoorOpen,
  Plus,
  LogOut,
  Trophy,
  Clock,
  Sparkles,
  Key,
  ChevronRight,
  Star,
  Tag,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import type { EscapeRecord } from "../types/record";
import { RoadBadge } from "../components/RoadBadge";
import { RecordDrawer } from "../components/RecordDrawer";

const MOCK_RECORDS: EscapeRecord[] = [
  {
    id: "1",
    storeName: "비트포비아 던전 강남",
    themeName: "비밀의 화원 : 시그니처",
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
    tags: ["꽃길", "감성", "볼륨큼"],
    createdAt: "2026-09-05T10:00:00Z",
    date: new Date("2026-09-05"),
  },
  {
    id: "2",
    storeName: "제로월드 강남점",
    themeName: "링 : 테이프의 비밀",
    genre: "공포",
    roadBadge: "꽃길",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
    certImages: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500",
    ],
    avgRating: 4.2,
    lockRatio: 5, // 자물쇠 5 : 장치 5
    isSuccess: false,
    clearTime: "85% 진행",
    reviews: [
      {
        id: "r2",
        author: "뚝딱",
        content:
          "탱 없으면 절대 못깸 😭 연출 나올 때마다 굳어서 시간 다 흘러감...",
        comment: "쫄보끼리가면 죽음뿐",
        rating: 4,
        createdAt: "2026-08-28",
      },
    ],
    tags: ["공포", "극탱필수", "스릴er"],
    createdAt: "2026-08-28T14:30:00Z",
    date: new Date("2026-08-28"),
  },
];

export function MainPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const userName = user?.name || "방탈출러";

  const [records, setRecords] = useState(MOCK_RECORDS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const totalCount = records.length;
  const successCount = records.filter((r) => r.isSuccess).length;
  const successRate =
    totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

  const handleAddRecord = () => {};

  return (
    <div className="flex-1 flex flex-col bg-neutral-50 min-h-full pb-24">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 flex items-center justify-center">
            <DoorOpen className="w-4 h-4" />
          </div>
          <span className="font-aggro font-black text-base text-neutral-900 tracking-tight">
            방탈출 기록부
          </span>
        </div>
        <button
          onClick={logout}
          className="text-neutral-400 hover:text-neutral-700 transition-colors p-1"
          title="로그아웃"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 px-5 pt-6 space-y-6">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight leading-tight">
              {userName}님,
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              지금까지 탈출해온 기록들이에요.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-neutral-400 font-medium">
                  총 방탈출
                </p>
                <p className="text-base font-black text-neutral-900">
                  {totalCount}회
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-neutral-400 font-medium">
                  탈출 성공률
                </p>
                <p className="text-base font-black text-neutral-900">
                  {successRate}%
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">
              최근 기록 목록
            </h3>
            <span className="text-xs text-neutral-400 font-medium">
              총 {records.length}개
            </span>
          </div>

          <div className="space-y-3.5">
            {records.map((item) => {
              const primaryReview = item.reviews[0];
              const lockVal = item.lockRatio;
              const deviceVal = 10 - item.lockRatio;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold text-neutral-400">
                          {item.storeName}
                        </span>

                        <RoadBadge badge={item.roadBadge} />
                      </div>
                      <h4 className="text-base font-black text-neutral-900 tracking-tight leading-snug">
                        {item.themeName}
                      </h4>
                    </div>

                    {item.isSuccess ? (
                      <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.clearTime}
                      </span>
                    ) : (
                      <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                        실패 ({item.clearTime})
                      </span>
                    )}
                  </div>

                  {/* 테마 메타 정보 (평점, 장르, 자물쇠 비율) */}
                  <div className="flex items-center gap-2.5 text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.avgRating.toFixed(1)}</span>
                    </div>
                    <span className="text-neutral-200">|</span>
                    <span className="font-medium text-neutral-700">
                      {item.genre}
                    </span>
                    <span className="text-neutral-200">|</span>
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Key className="w-3.5 h-3.5 text-neutral-400" />
                      <span>
                        자물쇠 {lockVal} : 장치 {deviceVal}
                      </span>
                    </div>
                  </div>

                  {primaryReview && (
                    <div className="space-y-0.5">
                      <p className="text-xs text-neutral-700 font-medium line-clamp-2 leading-relaxed">
                        "{primaryReview.content}"
                      </p>
                      {primaryReview.comment && (
                        <p className="text-[11px] text-neutral-400 italic">
                          - {primaryReview.comment}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1.5 flex-wrap items-center">
                      <Tag className="w-3 h-3 text-neutral-300" />
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 left-0 right-0 max-w-107.5 mx-auto px-5 flex justify-end pointer-events-none">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="pointer-events-auto bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg shadow-neutral-900/20 active:scale-95 transition-all flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>기록하기</span>
        </button>
      </div>

      <RecordDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleAddRecord}
      />
    </div>
  );
}
