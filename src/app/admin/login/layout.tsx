import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Keyable Korea Admin',
  robots: 'noindex, nofollow',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
