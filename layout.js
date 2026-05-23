export const metadata = {
  title: 'brewzi - Discover Coffee Roasters',
  description: 'Find where your favourite specialty coffee roasters are served',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
