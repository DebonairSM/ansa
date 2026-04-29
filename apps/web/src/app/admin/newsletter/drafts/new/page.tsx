import CampaignEditor from '@/components/admin/CampaignEditor';

const initialContent = {
  title: '',
  preview: '',
  blocks: [],
};

export default function NewDraftPage() {
  return (
    <CampaignEditor
      campaignId={null}
      initialContent={initialContent}
      backHref="/admin/newsletter/drafts"
      backLabel="Back to drafts"
      savedRedirectBase="/admin/newsletter/drafts"
      heading="Create draft"
    />
  );
}
