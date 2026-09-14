import { X } from "lucide-react";
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

type RecordDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: EscapeRecord) => void;
};

// 임시

export const RecordDrawer = ({
  isOpen,
  onClose,
  onSubmit,
}: RecordDrawerProps) => {
  const [storeName, setStoreName] = useState("");
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full max-w-107.5 h-dvh mx-auto flex items-center shrink-0 bg-white">
        <DrawerHeader className="border-b border-neutral-100 px-5 py-3.5 flex items-center justify-between shrink-0">
          <DrawerTitle className="font-black text-neutral-900 flex items-center gap-1.5">
            방탈출 기록하기
          </DrawerTitle>
          <DrawerClose className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </DrawerClose>
        </DrawerHeader>

        <form>
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
            {/* 
           input
           테마명
           성공여부 (버튼), /시간 
            평가 (길 ) - badge 로 ROAD_BADGE_OPTIONS
            자물쇠 : 장치  
           
           
           */}
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
