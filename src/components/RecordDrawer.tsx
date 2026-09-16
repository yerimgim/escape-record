import { Check, Clock, Key, Plus, Star, X } from "lucide-react";
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
import { Field, FieldLabel } from "./ui/field";
import { useAuthStore } from "../store/useAuthStore";
import { Badge } from "./ui/badge";

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
  const [roadBadge, setRoadBadge] = useState<EscapeRecord["roadBadge"]>("꽃길");
  const [isSuccess, setIsSuccess] = useState(true);
  const [clearTime, setClearTime] = useState("");
  const [avgRating, setAvgRating] = useState(4.0);
  const [lockRatio, setLockRatio] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["테마추천"]);
  const [visitDate, setVisitDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );
  const user = useAuthStore((state) => state.user);

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, "");
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeName.trim() || !themeName.trim()) return;

    const newReview = {
      id: `rev-${Date.now}`,
      author: user?.name || "",
      content: reviewContent || "즐겁게 플레이했습니다!",
      comment: reviewComment || "",
      rating: avgRating,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const newRecord: EscapeRecord = {
      id: `rec-${Date.now()}`,
      storeName: storeName.trim(),
      themeName: themeName.trim(),
      genre,
      roadBadge,
      avgRating,
      lockRatio,
      isSuccess,
      clearTime: clearTime.trim() || (isSuccess ? "성공" : "타임아웃"),
      reviews: [newReview],
      tags,
      createdAt: new Date().toISOString(),
      date: new Date(visitDate),
    };

    console.log(newRecord);

    onSubmit(newRecord);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full max-w-107.5 h-dvh mx-auto flex  shrink-0 bg-white">
        <DrawerHeader className="border-b border-neutral-100 px-5 py-3.5 flex flex-row items-center justify-between shrink-0">
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
            <Field>
              <FieldLabel htmlFor="store-name">매장명</FieldLabel>
              <Input
                id="store-name"
                type="text"
                placeholder="예: 비트포비아 던전 강남"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="theme-name">테마</FieldLabel>
              <Input
                id="theme-name"
                type="text"
                placeholder="비밀의 화원"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="">탈출</FieldLabel>
              <div>
                <Button onClick={() => setIsSuccess(true)}>성공 🎉</Button>
                <Button onClick={() => setIsSuccess(false)}>실패</Button>
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="">
                <Clock className="w-3.5 h-3.5" />{" "}
                {isSuccess ? "남은 시간" : "진행률"}
              </FieldLabel>
              <Input
                placeholder={isSuccess ? "10분 남음" : "실패"}
                value={clearTime}
                onChange={(e) => setClearTime(e.target.value)}
              />
            </Field>
            <Field>
              {/* 평가 */}
              <FieldLabel htmlFor="road-badge">평가</FieldLabel>
              <div>
                {ROAD_BADGE_OPTIONS.map((badge) => (
                  <Button
                    id="road-badge"
                    key={badge}
                    type="button"
                    onClick={() => setRoadBadge(badge)}
                    className={`transition-all ${
                      roadBadge === badge
                        ? "scale-105  ring-neutral-900 rounded-md"
                        : "opacity-40"
                    }`}
                  >
                    <RoadBadge badge={badge} />
                  </Button>
                ))}
              </div>
            </Field>
            <Field className="">
              <div className="flex items-center justify-between">
                <FieldLabel className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-neutral-500" /> 자물쇠와 장치
                  비율
                </FieldLabel>
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
                className="py-1.5 mx-auto w-full bg-accent"
              />
              <div className="flex justify-between">
                <span>자물쇠 100%</span>
                <span>반반 (50:50)</span>
                <span>장치 100%</span>
              </div>
            </Field>

            <div>
              <Field>
                <FieldLabel htmlFor="avg-rating">총 평점</FieldLabel>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      id="avg-rating"
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
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="visit-date">방탈출 한 날(방문일)</FieldLabel>
              <Input
                id="visit-date"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="genre">장르</FieldLabel>
              <div>
                {GENRE_OPTIONS.map((genre) => (
                  <Button
                    id="genre"
                    key={genre}
                    onClick={() => setGenre(genre)}
                    className="border-none"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </Field>

            <div>
              <Field>
                <FieldLabel htmlFor="review-content">상세 후기</FieldLabel>
                <Textarea
                  id="review-content"
                  placeholder="솔직한 후기 작성하기"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </Field>
            </div>

            <div>
              <Field>
                <FieldLabel htmlFor="review-comment">한줄 요약</FieldLabel>
                <Input
                  id="review-comment"
                  placeholder="이 테마가 내 인생테마다"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </Field>
            </div>

            <div className="py-3.5">
              <Field>
                <FieldLabel htmlFor="tags">태그</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="예: 공포, 볼륨큼 (엔터 입력)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="h-9 text-xs rounded-xl"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAddTag}
                    className="h-9 px-3 text-xs font-bold rounded-xl shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 mr-0.5" /> 추가
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="gap-1 px-2.5 py-1 text-xs rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors border-0"
                    >
                      #{t}
                      <Button
                        onClick={() => handleRemoveTag(t)}
                        className="text-neutral-400 hover:text-neutral-800 transition-colors ml-0.5 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          <div>
            <Button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              <Check />
              등록하기
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
