export const metadata = {
  title: 'Приложение для автопостинга',
  description: 'Публикуйте контент одновременно в Instagram, YouTube и TikTok',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
