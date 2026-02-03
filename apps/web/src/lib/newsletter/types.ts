export type NewsletterLocale = 'pt' | 'en';

export type NewsletterBlock =
  | {
      id: string;
      type: 'hero';
      headline: string;
      subheadline?: string;
      image?: string;
    }
  | {
      id: string;
      type: 'text';
      content: string;
    }
  | {
      id: string;
      type: 'cta';
      label: string;
      url: string;
    }
  | {
      id: string;
      type: 'image';
      src: string;
      alt?: string;
      caption?: string;
    }
  | {
      id: string;
      type: 'divider';
    }
  | {
      id: string;
      type: 'social';
      facebook?: string;
      instagram?: string;
    };

export type NewsletterContent = {
  title: string;
  preview?: string;
  blocks: NewsletterBlock[];
};

export type SubscriberRecord = {
  id: string;
  email: string;
  status: 'pending' | 'active' | 'unsubscribed';
  locale: NewsletterLocale;
  confirm_token: string | null;
  unsubscribe_token: string | null;
};
