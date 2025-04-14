import Features from '@/components/sections/Features/Features'
import Hero from '@/components/sections/Hero/Hero'
import { CraftfeaturesData } from '@/utils/data/craft-feature.data'
import { DesignfeaturesData } from '@/utils/data/design-feature.data'

export default function Home() {
  return (
    <main>
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
        className="bg-gray-50" // Optional additional classes
      />
    </main>
  )
}

