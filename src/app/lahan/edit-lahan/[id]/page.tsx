import EditSiteFormClient from "./editSiteForm";

export default async function EditSitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const siteId = resolvedParams.id;

  return <EditSiteFormClient siteId={siteId} />;
}

