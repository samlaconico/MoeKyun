import SettingsPanel from "@/components/SettingsPanel";
import { auth } from "@/firebase/config";
import { param } from "motion/react-client";
import { useRouter } from "next/navigation";

export default async function Settings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <SettingsPanel user={id} />
    </div>
  );
}
