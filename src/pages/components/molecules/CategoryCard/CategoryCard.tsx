export default function CategoryCard(props: { name: string }) {
  return (
    <div className="flex h-fit w-fit cursor-pointer items-center justify-center gap-4 rounded-2xl bg-rose-300 px-4 py-1 text-left text-xl font-semibold text-indigo-900 shadow-md">
      {props.name}
    </div>
  );
}
