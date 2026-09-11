import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { DoorOpen, User, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || pin.length !== 4) {
      setErr("이름과 비밀번호 4자리를 정확히 입력하기");
      return;
    }

    const success = login(name, pin);

    if (success) {
      navigate({ to: "/" });
    } else {
      setErr("이름, 비밀번호 확인해보기!");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 bg-white min-h-full">
      <div className="flex flex-col gap-2 items-center mb-20">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 text-white mb-4">
          <DoorOpen className="w-6 h-6" />
        </div>
        <h1 className="font-black text-neutral-800 leading-none">ㅂㅌㅊ</h1>
        <p className="text-xs text-neutral-500">방탈출_공테 유닛의 기록장</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="이름"
              className="pl-10 h-11 rounded-md text-sm focus-visible:ring-1 focus-visible:ring-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              type="password"
              maxLength={4}
              placeholder="비밀번호"
              className="pl-10 h-11 rounded-md text-sm tracking-widest focus-visible:ring-1 focus-visible:ring-neutral-900"
            />
          </div>
        </div>
        {err && <p className="text-xs text-rose-400 font-medium">{err}</p>}

        <Button
          type="submit"
          className="w-full h-11 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm mt-4"
        >
          로그인
        </Button>
      </form>

      <div className="my-4 text-xs text-neutral-500">
        <Link to="/signup" className="underline">
          프로필 만들기
        </Link>
      </div>
    </div>
  );
}
