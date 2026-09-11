import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { DoorOpen, User, Lock } from "lucide-react";
import { Input } from "../components/ui/input";
import { useAuthStore } from "../store/useAuthStore";

export const Route = createFileRoute("/signup")({
  component: SignupComponent,
});

function SignupComponent() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr("이름을 입력해주세요 ☺️");
      return;
    }
    if (pin.length < 4) {
      setErr("비밀번호 숫자 4자리를 입력해주세요.");
      return;
    }
    const success = signup(name, pin);

    if (success) {
      navigate({ to: "/" });
    } else {
      setErr("이미 존재하는 이름입니다. 다른 이름을 입력해주세요 🥲");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 bg-white min-h-full">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="font-black text-neutral-800 leading-none font-aggro">
          프로필 생성
        </h1>
        <p className="text-xs text-neutral-500">
          이름 (닉네임) 및 비밀번호 4자리
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-1.5">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="이름 (닉네임)"
              className="pl-10 h-11 rounded-md text-sm focus-visible:ring-1 focus-visible:ring-neutral-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="password"
              maxLength={4}
              placeholder="비밀번호 4자리"
              className="pl-10 h-11 rounded-md text-sm tracking-widest focus-visible:ring-1 focus-visible:ring-neutral-900"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>
        {err && <p className="text-xs text-rose-400 font-medium">{err}</p>}

        <Button
          type="submit"
          className="w-full h-11 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm mt-4"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
