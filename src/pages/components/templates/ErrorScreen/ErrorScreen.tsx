import { signIn, signOut, useSession } from "next-auth/react";

export default function ErrorScreen() {
  const { data: sessionData } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-900">
      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-2xl text-white">Something went wrong</p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </main>
  );
}
