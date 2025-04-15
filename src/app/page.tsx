import AppIntegration from '@/components/sections/AppIntegration/AppIntegration'
import Design from '@/components/sections/Design/Design'
import Features from '@/components/sections/Features/Features'
import Hero from '@/components/sections/Hero/Hero'
import { CraftfeaturesData } from '@/utils/data/craft-feature.data'
import { DesignfeaturesData } from '@/utils/data/design-feature.data'

export default function Home() {
  return (
    <main className='mx-auto max-w-[1600px]'>
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

      <AppIntegration />
      <Design />
    </main>
  )
}

