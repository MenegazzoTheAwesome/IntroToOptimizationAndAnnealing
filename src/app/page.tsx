import OptimizationIntro from '@/components/OptimizationIntro'
import OptimizationDetails from '@/components/OptimizationDetails'

export default function Home() {
  return (
<main className="flex min-h-screen flex-col items-center justify-between p-8 custom-bg">
<OptimizationIntro />
      <div className="my-8"></div>
      <OptimizationDetails />
    </main>
  )
}