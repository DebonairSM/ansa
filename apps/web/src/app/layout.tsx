import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-white text-black flex flex-col">
        {children}
      </body>
    </html>
  );
}
