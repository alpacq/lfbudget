import { useSession } from "next-auth/react";
import Head from "next/head";
import LoginScreen from "~/components/templates/LoginScreen/LoginScreen";
import MainDashboard from "~/components/templates/MainDashboard/MainDashboard";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>LFBudget App</title>
        <meta
          name="description"
          content="app to take control over your finances"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-900">
        {sessionData ? <MainDashboard /> : <LoginScreen />}
      </main>
    </>
  );
}
