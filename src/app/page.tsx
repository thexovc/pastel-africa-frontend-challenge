import AppIntegration from '@/components/sections/AppIntegration/AppIntegration'
import Design from '@/components/sections/Design/Design'
import Features from '@/components/sections/Features/Features'
import Hero from '@/components/sections/Hero/Hero'
import PerformanceSection from '@/components/sections/PerformanceSection/PerformanceSection'
import Create from '@/components/sections/PixelPerfect/Create'
import SwipesSection from '@/components/sections/PixelPerfect/SwipesSection'
import ScaleBusiness from '@/components/sections/ScaleBusiness/scaleBusiness'
import ThirdPartyDependencies from '@/components/sections/ThirdPartyDependencies/ThirdPartyDependencies'
import { CraftfeaturesData } from '@/constants/data/craft-feature.data'
import { DesignfeaturesData } from '@/constants/data/design-feature.data'

export default function Home() {
  return (
    <main className='w-full'>
      <div className='mx-auto max-w-[1200px] px-6 '>
        <Hero />
        <Features
          title="Design pixel-perfect sites"
          subtitle="beyond ordinary"
          features={DesignfeaturesData}
        />

        <Features
          title="Craft engaging and"
          subtitle="immersive interactions"
          features={CraftfeaturesData}
          imagePosition="left"
        />

      </div>

      <ScaleBusiness />

      <Create />
      <SwipesSection />

      <div className='mx-auto max-w-[1200px] px-6 '>

        <ThirdPartyDependencies />
      </div>

      <PerformanceSection />

      <div className='mx-auto max-w-[1200px] px-6 '>

        <AppIntegration />
        <Design />
      </div>
    </main>
  )
}


