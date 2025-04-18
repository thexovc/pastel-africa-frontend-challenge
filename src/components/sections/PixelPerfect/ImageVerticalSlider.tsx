import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

import Image, { StaticImageData } from "next/image";
import Info from "./Info";
import { verticalSliderImages } from "../../../../public/assets/vertical-slider";

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  orOpacity: number;
  animationDuration?: number; // Duration for animations in ms
}

// Slide type
interface SlideItem {
  id: number;
  image: StaticImageData;
}

// Slides
const slides: SlideItem[] = [
  { id: 1, image: verticalSliderImages.verticalSlider2 },
  { id: 2, image: verticalSliderImages.verticalSlider4 },
  { id: 3, image: verticalSliderImages.verticalSlider3 },
  { id: 4, image: verticalSliderImages.verticalSlider1 },
  { id: 5, image: verticalSliderImages.verticalSlider5 },
  { id: 6, image: verticalSliderImages.verticalSlider2 },
];

const ImageVerticalSlider: React.FC<Props> = ({
  currentIndex,
  setCurrentIndex,
  orOpacity,
  animationDuration = 800, // Default animation duration
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const defaultIndex = slides.findIndex((slide) => slide.id === 3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate spring configuration based on animation duration
  const springStiffness = 100;
  const springDamping = animationDuration > 500 ? 26 : 22; // Increased damping for longer animations

  const springY = useSpring(0, {
    stiffness: springStiffness,
    damping: springDamping,
    mass: 0.8,
    duration: animationDuration,
  });

  useEffect(() => {
    // Handle initial check and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Smooth animation to the target position
    const targetY = (currentIndex - defaultIndex) * -140;
    springY.set(targetY);
  }, [currentIndex, springY, defaultIndex]);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 items-center h-fit bg-transparent overflow-hidden"
    >
      <div className="w-full lg:w-[50%] relative flex flex-col items-center ">
        <motion.div
          className="flex flex-col items-center"
          style={{ y: springY }}
        >
          {slides.map((slide, index) => {
            // Adjust position calculation to account for visual offset
            const position = index - currentIndex;
            const absPos = Math.abs(position);

            // Enhanced size differentiation with mobile-first responsive sizes
            let width = 80; // Default size for distant slides (mobile)
            let opacity = 0.4;

            if (currentIndex > defaultIndex) {
              // When we've moved past the defaultIndex
              if (index === currentIndex - 1) {
                width = 200; // Previous slide (larger)
                opacity = 0.8;
              } else if (index === currentIndex - 2) {
                width = 140; // Two slides back (smaller)
                opacity = 0.6;
              }
            } else if (index < defaultIndex) {
              // Original logic for slides before defaultIndex
              width = index === defaultIndex - 1 ? 200 : 140;
              opacity = index === defaultIndex - 1 ? 0.8 : 0.6;
            }

            // Active slide logic with responsive sizes
            if (absPos === 0) {
              // Active slide is largest
              width = isMobile ? 280 : 190;
              opacity = 1;
            } else if (absPos === 1 && index > currentIndex) {
              width = isMobile ? 200 : 140;
              opacity = 0.8;
            } else if (absPos === 2 && index > currentIndex) {
              width = isMobile ? 140 : 90;
              opacity = 0.6;
            }

            const aspectRatio =
              slide.image.width && slide.image.height
                ? slide.image.width / slide.image.height
                : 16 / 9;
            const height = width / aspectRatio;

            return (
              <div className="relative" key={slide.id}>
                {absPos === 0 && index >= defaultIndex && (
                  <motion.div
                    className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg"
                    initial={false}
                    animate={{
                      width: width + 16,
                      height: height + 16,
                      x: -8,
                      y: -8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: springStiffness,
                      damping: springDamping,
                      mass: 0.8,
                      duration: animationDuration * 0.8,
                    }}
                  />
                )}
                <motion.div
                  className="rounded-lg cursor-pointer overflow-hidden mb-5"
                  initial={false}
                  animate={{
                    width,
                    height,
                    opacity,
                    scale: absPos === 0 && index >= defaultIndex ? 1 : 0.95,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                    mass: 0.8,
                    duration: animationDuration * 0.8,
                    opacity: { duration: animationDuration * 0.4 },
                    scale: { duration: animationDuration * 0.4 },
                  }}
                  onClick={() => {
                    // Only allow clicking to slides after defaultIndex
                    if (index >= defaultIndex) {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={`slide-${slide.id}`}
                    width={width}
                    height={height}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      transition: `all ${animationDuration * 0.4}ms ease-out`,
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
          <motion.h1
            className={`max-lg:hidden text-[120px] font-600 ${orOpacity === 1 ? "text-white" : "text-black"
              }`}
            animate={{ opacity: orOpacity }}
            transition={{ duration: (animationDuration * 0.5) / 1000 }}
          >
            Or
          </motion.h1>
        </motion.div>
      </div>
      <motion.div
        className="w-[50%] max-lg:hidden mt-20"
        animate={{ opacity: 1 - orOpacity }} // This will fade out as orOpacity increases
        transition={{ duration: (animationDuration * 0.5) / 1000 }}
      >
        <Info />
      </motion.div>
    </div>
  );
};

export default ImageVerticalSlider;
