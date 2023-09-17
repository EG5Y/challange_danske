import './global.css';

export const metadata = {
  title: 'Danske TODO',
  description: 'Manage TODO list.',
};

export default function RootLayout({
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
