import { Clock, Key, Star, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { useState } from "react";
import type { EscapeRecord } from "../types/record";
import { Button } from "./ui/button";
import { RoadBadge } from "./RoadBadge";
import { GENRE_OPTIONS, ROAD_BADGE_OPTIONS } from "../constants/record";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { Field, FieldDescription, FieldLabel } from "./ui/field";

type RecordDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: EscapeRecord) => void;
};

export const RecordDrawer = ({
  isOpen,
  onClose,
  onSubmit,
}: RecordDrawerProps) => {
  const [storeName, setStoreName] = useState(""); // 매장
  const [themeName, setThemeName] = useState(""); // 테마명
  const [genre, setGenre] = useState("감성/드라마");
  const [roadBadge, setRoadBadge] = useState("꽃길");
  const [isSuccess, setIsSuccess] = useState(true);
  const [clearTime, setClearTime] = useState("");
  const [avgRating, setAvgRating] = useState(4.0);
  const [lockRatio, setLockRatio] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["테마추천"]);
  const [visitDate, setVisitDate] = useState();

  const handleSubmit = () => {
    // onSubmit(newRecord);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full max-w-107.5 h-dvh mx-auto flex  shrink-0 bg-white">
        <DrawerHeader className="border-b border-neutral-100 px-5 py-3.5 flex items-center justify-between shrink-0">
          <DrawerTitle className="font-black text-neutral-900 flex items-center gap-1.5">
            방탈출 기록하기
          </DrawerTitle>
          <DrawerClose className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </DrawerClose>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-4 "
        >
          <div className="space-y-3">
            <div>
              <label htmlFor="">매장명</label>
              <Input
                type="text"
                placeholder="예: 비트포비아 던전 강남"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="">테마</label>
              <Input
                type="text"
                placeholder="비밀의 화원"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">탈출</label>
              <div>
                <Button onClick={() => setIsSuccess(true)}>성공 🎉</Button>
                <Button onClick={() => setIsSuccess(false)}>실패</Button>
              </div>
            </div>
            <div>
              <label htmlFor="">
                <Clock className="w-3.5 h-3.5" />{" "}
                {isSuccess ? "남은 시간" : "진행률"}
              </label>
              <Input
                placeholder={isSuccess ? "10분 남음" : "실패"}
                value={clearTime}
                onChange={(e) => setClearTime(e.target.value)}
              />
            </div>
            <div>
              {/* 평가 */}
              <label htmlFor="">평가</label>
              <div>
                {ROAD_BADGE_OPTIONS.map((badge) => (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => setRoadBadge(badge)}
                    className={`transition-all ${
                      roadBadge === badge
                        ? "scale-105 ring-2 ring-neutral-900 rounded-md"
                        : "opacity-60"
                    }`}
                  >
                    <RoadBadge badge={badge} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div>
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-neutral-500" /> 자물쇠 대
                  장치 비율
                </label>
                <span className="text-xs font-black text-neutral-900 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                  자물쇠 {lockRatio} : 장치 {10 - lockRatio}
                </span>
              </div>
              <Slider
                value={[lockRatio]}
                min={0}
                max={10}
                step={1}
                onValueChange={(lockRatio) => setLockRatio(lockRatio)}
                className="py-1.5"
              />
              <div className="flex justify-between">
                <span>자물쇠 100%</span>
                <span>반반 (5:5)</span>
                <span>장치 100%</span>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="">총 평점</label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      onClick={() => setAvgRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= avgRating
                            ? "fill-amber-400"
                            : "text-neutral-200"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="">방탈출 한 날(방문일)</label>
              <Input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">장르</label>
              <div>
                {GENRE_OPTIONS.map((genre) => (
                  <Button key={genre} onClick={() => setGenre(genre)}>
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Field>
                <FieldLabel htmlFor="textarea-message">상세 후기</FieldLabel>
                <Textarea
                  id="textarea-message"
                  placeholder="솔직한 후기 작성하기"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel htmlFor="tags">태그</FieldLabel>
                <div>{/* 태그 고민해보기 */}</div>
              </Field>
            </div>
          </div>

          <div>
            <Button type="button" onClick={() => handleSubmit()}>
              등록하기
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
