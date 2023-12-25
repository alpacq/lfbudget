import { signIn } from "next-auth/react";

export default function LoginScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-48">
      <p className="text-left text-4xl font-black text-rose-200">
        Lam&apos;s Family Budget App
      </p>
      <button
        className="flex h-fit w-fit items-center justify-center gap-4 rounded-2xl bg-rose-900 px-4 py-1 text-left text-2xl font-black text-rose-200 shadow-md"
        onClick={() => void signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
