import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex flex-col justify-evenly">
      <Skeleton className="h-full w-full"></Skeleton>
    </div>
  );
}
