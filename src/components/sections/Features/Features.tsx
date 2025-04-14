"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

type Feature = {
  id: number
  title: string
  description: string
  image: string
  viewDetails?: boolean
}

type FeaturesProps = {
  title: string
  subtitle?: string
  features: Feature[]
  imagePosition?: 'left' | 'right'
  className?: string
}

const Features = ({
  title = "Design pixel-perfect sites",
  subtitle = "beyond ordinary",
  features = [],
  imagePosition = 'right',
  className = ""
}: FeaturesProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0] || {
    id: 0,
    title: "",
    description: "",
    image: ""
  });
  const [previousFeature, setPreviousFeature] = useState<Feature | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Handle feature selection
  const handleFeatureSelect = (feature: Feature) => {
    if (feature.id !== selectedFeature.id) {
      // Save the current feature as previous before updating
      setPreviousFeature(selectedFeature);

      // Determine direction based on feature id
      if (feature.id > selectedFeature.id) {
        setDirection("right");
      } else {
        setDirection("left");
      }

      setSelectedFeature(feature);
    }
  };

  // Determine grid order based on image position
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';
  const imageOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';

  return (
    <section className={`w-full py-20 bg-white ${className}`}>
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-16">
          {/* Heading with text reveal animation */}
          <motion.h2
            ref={titleRef}
            initial={{ backgroundPosition: "100% 0" }}
            animate={
              isInView
                ? { backgroundPosition: "0% 0" }
                : { backgroundPosition: "100% 0" }
            }
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: 0.2,
            }}
            style={{
              letterSpacing: "-0.02em",
              lineHeight: "1.1em",
              backgroundImage:
                "linear-gradient(90deg, #000 0%, #000 50%, #aaaaaa 50.001%, #aaaaaa 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "100% 0",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-4xl sm:text-5xl md:text-8xl font-semibold"
          >
            {title}
            {subtitle && (
              <>
                <br />
                {subtitle}
              </>
            )}
          </motion.h2>

          <div className={`grid grid-cols-1 ${imagePosition == "right" ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"} gap-12 lg:gap-24`}>
            {/* Timeline Feature List - Can be positioned based on imagePosition */}
            <div className={`flex flex-col relative rounded-xl p-6 ${contentOrder}`}>
              {/* Timeline vertical line */}
              <div className="absolute left-8 top-8 bottom-8 w-[1px] bg-gray-200"></div>

              {/* Feature items */}
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="cursor-pointer mb-16 last:mb-0"
                  onClick={() => handleFeatureSelect(feature)}
                >
                  <div className="flex items-center gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${selectedFeature.id === feature.id
                          ? 'bg-indigo-400 border-indigo-100'
                          : 'bg-indigo-200 border-indigo-100'
                          }`}
                      />
                      {selectedFeature.id === feature.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                          className="absolute -top-1 -left-1 w-6 h-6 bg-indigo-300 rounded-full opacity-20"
                        />
                      )}
                    </div>

                    {/* Feature title */}
                    <h3
                      className={`text-4xl font-semibold transition-colors duration-300 ${selectedFeature.id === feature.id
                        ? 'text-black'
                        : 'text-gray-500'
                        }`}
                    >
                      {feature.title}
                    </h3>
                  </div>

                  {/* Feature description (only visible for selected item) */}
                  <AnimatePresence>
                    {selectedFeature.id === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-10 mt-2 overflow-hidden"
                      >
                        <p className="text-gray-600 text-base">
                          {feature.description}
                        </p>

                        {feature.viewDetails !== false && (
                          <a
                            href="#"
                            className="group inline-flex items-center font-semibold text-lg text-[#5B3DF5] mt-2"
                          >
                            <span className="relative">
                              <span className="z-10 relative">View Details</span>
                              <span
                                className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#5B3DF5] transition-all duration-300 group-hover:w-full"
                              ></span>
                            </span>
                            <span className="ml-1 transition-transform group-hover:translate-x-1 duration-300">
                              →
                            </span>
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Feature Image with smooth sliding */}
            <div
              ref={sliderContainerRef}
              className={`hidden lg:block relative h-[600px] rounded-2xl overflow-hidden ${imageOrder}`}
              style={{ contain: "strict" }}
            >
              {/* Base layer (previous feature) */}
              {previousFeature && (
                <div className="absolute inset-0">
                  <Image
                    src={previousFeature.image}
                    alt={previousFeature.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
                  />
                </div>
              )}

              {/* Animated layer that slides in */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={selectedFeature.id}
                  className="absolute inset-0"
                  initial={{
                    x: direction === "right" ? "100%" : "-100%",
                    zIndex: 10,
                  }}
                  animate={{
                    x: 0,
                    zIndex: 10,
                  }}
                  exit={{
                    x: direction === "right" ? "-100%" : "100%",
                    zIndex: 5,
                  }}
                  transition={{
                    x: {
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.8,
                    },
                  }}
                >
                  <Image
                    src={selectedFeature.image}
                    alt={selectedFeature.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
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