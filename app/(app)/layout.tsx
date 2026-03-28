import TopBar from '@/src/components/ui/TopBar'
import BottomNav from '@/src/components/ui/BottomNav'

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-ds-bg flex flex-col">
      <TopBar />
      <main className="flex-1 max-w-120 w-full mx-auto px-6 pt-6 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
