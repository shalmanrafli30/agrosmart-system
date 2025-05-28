import EditPlantFormClient from "./editPlantForm";

export default async function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const plantId = resolvedParams.id;

  return <EditPlantFormClient plantId={plantId} />;
}

