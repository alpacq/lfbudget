import { api } from "~/utils/api";
import LoadingScreen from "~/pages/components/templates/LoadingScreen/LoadingScreen";
import ErrorScreen from "~/pages/components/templates/ErrorScreen/ErrorScreen";
import ActionBar from "~/pages/components/organisms/ActionBar/ActionBar";

export default function MainDashboard() {
  const { data, isLoading } = api.transactions.getAll.useQuery();

  if (!data && isLoading) return <LoadingScreen />;

  if (!data) return <ErrorScreen />;

  return (
    <div className="px-26 flex min-h-screen w-full flex-col items-start justify-start gap-4 py-12 md:px-52 md:py-24">
      <ActionBar />
    </div>
  );
}