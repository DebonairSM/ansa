import crypto from 'crypto';
import { NewsletterContent } from './types';

export function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function getBaseUrl(request?: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const origin = request?.headers.get('origin');
  if (origin) return origin.replace(/\/$/, '');
  return 'http://localhost:4545';
}

export function withTrackingUrl(
  url: string,
  baseUrl: string,
  campaignId: string,
  subscriberId: string
) {
  const tracking = new URL('/api/newsletter/click', baseUrl);
  tracking.searchParams.set('to', url);
  tracking.searchParams.set('campaign', campaignId);
  tracking.searchParams.set('sub', subscriberId);
  return tracking.toString();
}

export function applyLinkTracking(
  content: NewsletterContent,
  baseUrl: string,
  campaignId: string,
  subscriberId: string
): NewsletterContent {
  return {
    ...content,
    blocks: content.blocks.map((block) => {
      if (block.type === 'cta' && block.url) {
        return { ...block, url: withTrackingUrl(block.url, baseUrl, campaignId, subscriberId) };
      }
      if (block.type === 'social') {
        return {
          ...block,
          facebook: block.facebook
            ? withTrackingUrl(block.facebook, baseUrl, campaignId, subscriberId)
            : undefined,
          instagram: block.instagram
            ? withTrackingUrl(block.instagram, baseUrl, campaignId, subscriberId)
            : undefined,
        };
      }
      return block;
    }),
  };
}
