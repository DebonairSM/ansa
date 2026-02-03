import CampaignEditor from '@/components/admin/CampaignEditor';

const initialContent = {
  title: '',
  preview: '',
  blocks: [],
};

export default function NewCampaignPage() {
  return <CampaignEditor campaignId={null} initialContent={initialContent} />;
}
