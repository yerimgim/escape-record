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
    <div className="flex flex-col p-6 bg-neutral-50">
      <div className="mb-6">
        <span className="flex items-center justify-center">
          <DoorOpen size={36} />
        </span>
        <h1 className="text-2xl font-black text-neutral-900 mt-2">
          방탈출 기록장
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          방탈출_공테 유닛의 기록장
        </p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">로그인</CardTitle>
          <CardDescription className="text-xs">
            등록한 이름과 4자리 비밀번호를 입력하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700">
                이름 (닉네임)
              </span>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-neutral-900" />
                <Input
                  placeholder="뚝딱"
                  className="pl-9 rounded-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-neutral-700 ">
                비밀번호 (4자리)
              </span>
              <div className="relative">
                <Lock className="absolute top-2.5 left-3 w-4 h-4 text-neutral-900" />
                <Input
                  type="password"
                  maxLength={4}
                  placeholder="****"
                  className="pl-9 rounded-sm tracking-widest"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>
            {err && <p className="text-xs text-rose-400 font-medium">{err}</p>}
            <Button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 font-bold"
            >
              로그인
            </Button>
          </form>

          <div className="mt-4 text-xs text-neutral-500">
            처음이라면 <br />
            <Link to="/signup" className="underline">
              프로필 만들기 (회원가입)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
