"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

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
    <section className={`w-full py-12 sm:py-20 ${className}`}>
      <div className="flex flex-col gap-12 sm:gap-16">
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
          className="text-4xl sm:text-5xl md:text-8xl font-medium"
        >
          {title}
          {subtitle && (
            <>
              <span className="md:hidden"> {subtitle}</span>
              <span className="hidden md:inline">
                <br />
                {subtitle}
              </span>
            </>
          )}
        </motion.h2>

        <div className={`grid grid-cols-1 ${imagePosition == "right" ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"} gap-12 lg:gap-24`}>
          {/* Timeline Feature List - Can be positioned based on imagePosition */}
          <div className={`flex flex-col relative rounded-xl h-full ${contentOrder}`}>
            {/* Timeline vertical line with gradient fade effect */}
            <div className="absolute left-1.5 top-8 bottom-8 w-[2px] bg-gradient-to-b from-indigo-100 via-indigo-200 to-indigo-100"></div>

            {/* Feature items with flexbox to distribute evenly */}
            <div className="flex flex-col justify-between h-full space-y-20 lg:space-y-0">
              {features.map((feature, index) => {
                const isSelected = selectedFeature.id === feature.id;
                return (
                  <div
                    key={feature.id}
                    className={`cursor-pointer relative transition-all duration-300 ${isSelected ? 'pb-6 sm:pb-8' : 'pb-0'}`}
                    onClick={() => handleFeatureSelect(feature)}
                  >
                    <div className="flex items-center gap-6">
                      {/* Timeline dot with pulse animation */}
                      <div className="relative z-10">
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${isSelected
                            ? 'bg-indigo-500 border-indigo-200 scale-125'
                            : 'bg-indigo-200 border-indigo-100'
                            }`}
                        />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.2, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                            className="absolute -top-1 -left-1 w-6 h-6 bg-indigo-400 rounded-full"
                          />
                        )}
                      </div>

                      {/* Feature title */}
                      <h3
                        className={`transition-all duration-300 ${isSelected
                          ? 'text-black text-xl sm:text-3xl font-bold'
                          : 'text-gray-500 text-lg sm:text-2xl font-semibold'
                          }`}
                      >
                        {feature.title}
                      </h3>
                    </div>

                    {/* Feature description and mobile image (animated when selected) */}
                    <AnimatePresence mode="wait">
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="ml-10 mt-4 overflow-hidden"
                        >
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-gray-600 text-base sm:text-lg mb-4 pr-4 sm:pr-8 max-w-xl"
                          >
                            {feature.description}
                          </motion.p>

                          {feature.viewDetails && (
                            <motion.a
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                              href="#"
                              className="group inline-flex items-center font-semibold text-base sm:text-lg text-indigo-600 mt-2 mb-6"
                            >
                              <span className="relative">
                                <span className="z-10 relative">View Details</span>
                                <span
                                  className="absolute left-0 bottom-0 h-[2px] w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"
                                ></span>
                              </span>
                              <span className="ml-1 transition-transform group-hover:translate-x-1 duration-300">
                                →
                              </span>
                            </motion.a>
                          )}

                          {/* Mobile-only image with enhanced animation */}
                          <motion.div
                            className="lg:hidden relative h-[250px] sm:h-[300px] rounded-xl overflow-hidden mb-4"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50 rounded-xl"></div>
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover rounded-xl shadow-lg"
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feature Image with smooth sliding - desktop only */}
          <div
            ref={sliderContainerRef}
            className={`hidden lg:block relative h-[600px] rounded-2xl overflow-hidden ${imageOrder}`}
            style={{ contain: "strict" }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50 z-0"></div>

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
                className="absolute inset-0 z-10"
                initial={{
                  x: direction === "right" ? "100%" : "-100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: direction === "right" ? "-100%" : "100%",
                  zIndex: 5,
                }}
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 130,
                    damping: 50,
                    duration: 0.7,
                  },
                }}
              >
                <Image
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features