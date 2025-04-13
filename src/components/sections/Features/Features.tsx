"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

type Feature = {
  id: number
  title: string
  description: string
  image: string
}

const features: Feature[] = [
  {
    id: 1,
    title: "Advanced typography",
    description: "Take full control over your text with precision typography tools. Adjust fonts, spacing, and styles to add more character to your design.",
    image: "/assets/features/typography.webp"
  },
  {
    id: 2,
    title: "CSS grids and layouts",
    description: "Create complex layouts with ease using our intuitive grid system. Build responsive designs that look great on any device.",
    image: "/assets/features/grids.webp"
  },
  {
    id: 3,
    title: "Adaptive design",
    description: "Design once, deploy everywhere. Our adaptive design system ensures your site looks perfect across all screen sizes.",
    image: "/assets/features/adaptive.webp"
  }
]

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0])
  const [prevFeatureId, setPrevFeatureId] = useState<number>(features[0].id)

  const handleFeatureSelect = (feature: Feature) => {
    setPrevFeatureId(selectedFeature.id)
    setSelectedFeature(feature)
  }

  // Determine animation direction based on selection
  const getAnimationVariants = (featureId: number) => {
    // First time loading or same feature
    if (prevFeatureId === featureId) {
      return {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 }
      }
    }

    // For all other navigation between features, use bottom-to-top animation
    return {
      initial: { y: 300, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -300, opacity: 0 }
    }
  }

  const animationVariants = getAnimationVariants(selectedFeature.id)

  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-16">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em]">
            Design pixel-perfect sites
            <br />
            beyond ordinary
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-24">
            {/* Left: Feature List */}
            <div className="flex flex-col gap-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="cursor-pointer group"
                  onClick={() => handleFeatureSelect(feature)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedFeature.id === feature.id ? 'bg-[#5641F3]' : 'bg-gray-300'}`}></div>
                    <h3 className="text-xl sm:text-2xl font-medium">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Only show description and link when selected */}
                  <AnimatePresence>
                    {selectedFeature.id === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 overflow-hidden"
                      >
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                          {feature.description}
                        </p>
                        <Link
                          href="#"
                          className="text-[#5641F3] font-medium hover:underline flex items-center gap-2 text-sm sm:text-base group-hover:gap-3 transition-all"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: Feature Image */}
            <div className="relative h-[600px] bg-[#FFF8E7] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature.id}
                  initial={animationVariants.initial}
                  animate={animationVariants.animate}
                  exit={animationVariants.exit}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 13,
                    duration: 0.7
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features