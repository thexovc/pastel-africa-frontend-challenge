"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
    description: "Build complex layouts with ease using CSS Grids. Create multi-directional structures, manage spacing, and achieve perfect alignment without limitations.",
    image: "/assets/features/grids.webp"
  },
  {
    id: 3,
    title: "Adaptive design",
    description: "Ensure flawless responsiveness across all devices. Design with adaptive elements that adjust seamlessly to different screen sizes and resolutions.",
    image: "/assets/features/adaptive.webp"
  },
  {
    id: 4,
    title: "Designed for efficiency",
    description: "Streamline your workflow with intuitive tools that simplify layout structuring. Save time while maintaining complete design accuracy and flexibility.",
    image: "/assets/features/efficiency.webp"
  }
]

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0])
  const [previousFeature, setPreviousFeature] = useState<Feature>(features[0])
  const prevIndexRef = useRef(0)

  const handleFeatureSelect = (feature: Feature) => {
    if (feature.id !== selectedFeature.id) {
      setPreviousFeature(selectedFeature)
      const currentIndex = features.findIndex(f => f.id === selectedFeature.id)
      prevIndexRef.current = currentIndex
      setSelectedFeature(feature)
    }
  }

  const currentIndex = features.findIndex(f => f.id === selectedFeature.id)
  const direction = currentIndex > prevIndexRef.current ? 1 : -1

  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-16">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-semibold tracking-[-0.02em]">
            Design pixel-perfect sites
            <br />
            beyond ordinary
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
            {/* Left: Feature List */}
            <div className="flex flex-col relative">
              <div className="absolute left-1 top-4 bottom-4 w-[1px] bg-gray-200"></div>

              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="cursor-pointer group"
                  onClick={() => handleFeatureSelect(feature)}
                >
                  <div className="flex items-center gap-4 py-10">
                    <div className="relative z-10">
                      <div className={`w-2 h-2 rounded-full ${selectedFeature.id === feature.id
                        ? 'bg-[#5641F3]'
                        : 'bg-gray-300'
                        }`} />
                      {selectedFeature.id === feature.id && (
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#5641F3] rounded-full opacity-20" />
                      )}
                    </div>

                    <h3 className={`text-xl sm:text-3xl font-semibold ${selectedFeature.id === feature.id
                      ? 'text-black'
                      : 'text-gray-500'
                      }`}>
                      {feature.title}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {selectedFeature.id === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 pb-4 overflow-hidden"
                      >
                        <div className="mb-6">
                          <p className="text-gray-600 text-sm sm:text-base">
                            {feature.description}
                          </p>
                        </div>

                        <div className="block lg:hidden relative h-[300px] bg-[#FFF8E7] rounded-2xl overflow-hidden mb-8">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedFeature.id === feature.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute left-1 top-10 bottom-0 w-[1px] bg-[#5641F3] z-0"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right: Feature Image */}
            <div className="hidden lg:block relative h-[600px] bg-[#FFF8E7] rounded-2xl overflow-hidden perspective-[2000px]">
              {/* Static Base Layer */}
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <Image
                  src={previousFeature.image}
                  alt={previousFeature.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Animated Peeling Layer */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={selectedFeature.id}
                  initial={{
                    x: direction > 0 ? '100%' : '-100%',
                    rotateY: direction > 0 ? -25 : 25,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    rotateY: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: direction > 0 ? '-100%' : '100%',
                    rotateY: direction > 0 ? 25 : -25,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    mass: 0.5,
                  }}
                  className="absolute inset-0"
                  style={{
                    zIndex: 2,
                    transformStyle: 'preserve-3d',
                    transformOrigin: direction > 0 ? 'left' : 'right',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Edge Shadow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.3,
                      transition: { duration: 0.2 }
                    }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: `linear-gradient(
                        ${direction > 0 ? '90deg' : '-90deg'},
                        rgba(0,0,0,0.5) 0%,
                        transparent 15%,
                        transparent 85%,
                        rgba(0,0,0,0.5) 100%
                      )`,
                      boxShadow: direction > 0
                        ? '-8px 0 12px rgba(0,0,0,0.15)'
                        : '8px 0 12px rgba(0,0,0,0.15)'
                    }}
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

// Add this CSS to your globals.css
const styles = `
.perspective-[2000px] {
  perspective: 2000px;
}
`;

export default Features