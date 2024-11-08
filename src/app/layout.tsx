import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SidebarNav,{ MobileSidebar } from '@/components/sidebar-navigation'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Portal',
  description: 'Your comprehensive job search platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <div className="hidden md:block">
            <SidebarNav />
          </div>
          <main className="flex-1 p-8 transition-all duration-300 ease-in-out" style={{ marginLeft: 'var(--sidebar-width, 60px)' }}>
            <div className="md:hidden">
              <MobileSidebar />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
