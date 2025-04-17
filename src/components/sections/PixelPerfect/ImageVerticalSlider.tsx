import { useState, useEffect, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Info from "./Info";
import { verticalSliderImages } from "../../../../public/assets/vertical-slider";

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  orOpacity: number;
}

interface SlideItem {
  id: number;
  image: StaticImageData;
}

const slides: SlideItem[] = [
  { id: 1, image: verticalSliderImages.verticalSlider2 },
  { id: 2, image: verticalSliderImages.verticalSlider4 },
  { id: 3, image: verticalSliderImages.verticalSlider3 },
  { id: 4, image: verticalSliderImages.verticalSlider1 },
  { id: 5, image: verticalSliderImages.verticalSlider5 },
  { id: 6, image: verticalSliderImages.verticalSlider2 },
];

const VerticalVariedSlider: React.FC<Props> = ({
  currentIndex,
  setCurrentIndex,
  orOpacity,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const defaultIndex = slides.findIndex((slide) => slide.id === 3);
  const containerRef = useRef<HTMLDivElement>(null);

  const springY = useSpring(0, {
    stiffness: 100, // Increased stiffness
    damping: 25,    // Adjusted damping
    mass: 1,        // Increased mass for smoother motion
    restDelta: 0.001 // More precise rest position
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (!isTransitioning) {
      const targetY = (currentIndex - defaultIndex) * -140;
      springY.set(targetY);
    }
  }, [currentIndex, springY, defaultIndex, isTransitioning]);

  const handleSlideClick = (index: number) => {
    if (index >= defaultIndex && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);

      // Reset transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your animation duration
    }
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="flex gap-4 items-center h-fit bg-transparent overflow-hidden"
    >
      <div className="w-[50%] relative flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center"
          style={{ y: springY }}
        >
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => {
              const position = index - currentIndex;
              const absPos = Math.abs(position);

              // Base sizes
              const baseSizes = {
                active: isMobile ? 280 : 190,
                previous: isMobile ? 200 : 140,
                distant: isMobile ? 140 : 90,
                default: 80
              };

              // Calculate width and opacity
              let width = baseSizes.default;
              let opacity = 0.4;

              if (absPos === 0) {
                width = baseSizes.active;
                opacity = 1;
              } else if (absPos === 1 && index > currentIndex) {
                width = baseSizes.previous;
                opacity = 0.8;
              } else if (absPos === 2 && index > currentIndex) {
                width = baseSizes.distant;
                opacity = 0.6;
              }

              // Special cases for slides before defaultIndex
              if (currentIndex <= defaultIndex && index < defaultIndex) {
                width = index === defaultIndex - 1 ? baseSizes.previous : baseSizes.distant;
                opacity = index === defaultIndex - 1 ? 0.8 : 0.6;
              }

              const aspectRatio = slide.image.width / slide.image.height;
              const height = width / aspectRatio;

              return (
                <motion.div
                  key={slide.id}
                  className="relative"
                  layout
                >
                  {absPos === 0 && index >= defaultIndex && (
                    <motion.div
                      className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg"
                      initial={false}
                      animate={{
                        width: width + 16,
                        height: height + 16,
                        x: -8,
                        y: -8,
                        opacity: 1
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 1
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
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      mass: 1,
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                    onClick={() => handleSlideClick(index)}
                  >
                    <Image
                      src={slide.image}
                      alt={`slide-${slide.id}`}
                      width={width}
                      height={height}
                      priority={index === currentIndex}
                      className="object-cover transition-all duration-300 ease-out"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <motion.h1
            className="text-[150px] font-600"
            animate={{ opacity: orOpacity }}
            transition={{ duration: 0.5 }}
          >
            Or
          </motion.h1>
        </motion.div>
      </div>
      <motion.div
        className="w-[50%] max-lg:hidden mt-20"
        animate={{ opacity: 1 - orOpacity }}
        transition={{ duration: 0.5 }}
      >
        <Info />
      </motion.div>
    </div>
  );
};

export default VerticalVariedSlider;

