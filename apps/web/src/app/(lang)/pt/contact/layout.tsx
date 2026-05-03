import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - ANSA Brasil',
  description: 'Entre em contato com a ANSA Brasil. Fale com nossa equipe em Fairfax, Virginia por telefone, email ou redes sociais, ou envie uma mensagem diretamente.',
};

export default function ContactPtLayout({ children }: { children: React.ReactNode }) {
  return children;
}
