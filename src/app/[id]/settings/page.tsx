import { ReviewEdit } from "@/components/Review";
import SettingsPanel from "@/components/SettingsPanel";

export default async function Settings({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <SettingsPanel user={id} />
      <ReviewEdit />
    </div>
  );
}
