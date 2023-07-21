import { signOut } from "next-auth/react";
import { api } from "~/utils/api";
import LoadingScreen from "~/pages/components/templates/LoadingScreen/LoadingScreen";
import ErrorScreen from "~/pages/components/templates/ErrorScreen/ErrorScreen";

export default function MainDashboard() {
  const { data, isLoading } = api.transactions.getAll.useQuery();

  if (!data && isLoading) return <LoadingScreen />;

  if (!data) return <ErrorScreen />;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="shadow-mdshadow-md flex h-fit w-fit items-center justify-center gap-4 rounded-2xl bg-rose-900 px-4 py-1 text-left text-2xl font-black text-rose-200"
        onClick={() => void signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
