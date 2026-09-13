import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export const RecordDrawer = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full max-w-107.5 h-dvh mx-auto flex items-center justify-between shrink-0 bg-white">
        <DrawerHeader className="border-b border-neutral-100 px-5 py-3.5 flex items-center justify-between shrink-0">
          <DrawerTitle className="font-black text-neutral-900 flex items-center gap-1.5">
            방탈출 기록하기
          </DrawerTitle>
          <DrawerClose className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </DrawerClose>
        </DrawerHeader>

        <main className="space-y-3">
          <div>??????</div>
        </main>
      </DrawerContent>
    </Drawer>
  );
};
