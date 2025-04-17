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
      const targetY = (currentIndex - defaultIndex) * (windowWidth < 640 ? -100 : -140); // Adjust spacing for mobile
      springY.set(targetY);
    }
  }, [currentIndex, springY, defaultIndex, isTransitioning, windowWidth]);

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

  // Update base sizes for better mobile responsiveness
  const baseSizes = {
    active: {
      mobile: 180,    // Reduced from 220
      tablet: 250,    // Medium for tablet
      desktop: 190    // Original desktop size
    },
    previous: {
      mobile: 130,    // Reduced from 160
      tablet: 180,
      desktop: 140
    },
    distant: {
      mobile: 80,     // Reduced from 100
      tablet: 120,
      desktop: 90
    },
    default: {
      mobile: 50,     // Reduced from 60
      tablet: 70,
      desktop: 80
    }
  };

  // Update size calculation based on screen size
  const getSize = (type: keyof typeof baseSizes) => {
    if (windowWidth < 640) return baseSizes[type].mobile;
    if (windowWidth < 1024) return baseSizes[type].tablet;
    return baseSizes[type].desktop;
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row gap-4 items-center h-fit bg-transparent overflow-hidden w-full"
      style={{ minHeight: windowWidth < 640 ? '60vh' : 'auto' }} // Add minimum height for mobile
    >
      <div className="w-full lg:w-[50%] relative flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center w-full"
          style={{ y: springY }}
        >
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => {
              const position = index - currentIndex;
              const absPos = Math.abs(position);

              // Calculate width and opacity
              let width = getSize('default');
              let opacity = 0.4;

              if (absPos === 0) {
                width = getSize('active');
                opacity = 1;
              } else if (absPos === 1 && index > currentIndex) {
                width = getSize('previous');
                opacity = 0.8;
              } else if (absPos === 2 && index > currentIndex) {
                width = getSize('distant');
                opacity = 0.6;
              }

              // Special cases for slides before defaultIndex
              if (currentIndex <= defaultIndex && index < defaultIndex) {
                width = index === defaultIndex - 1 ? getSize('previous') : getSize('distant');
                opacity = index === defaultIndex - 1 ? 0.8 : 0.6;
              }

              const aspectRatio = slide.image.width / slide.image.height;
              const height = width / aspectRatio;

              return (
                <motion.div
                  key={slide.id}
                  className="relative w-full flex justify-center"
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
            className="text-[80px] sm:text-[100px] lg:text-[150px] font-600"
            animate={{ opacity: orOpacity }}
            transition={{ duration: 0.5 }}
          >
            Or
          </motion.h1>
        </motion.div>
      </div>
      <motion.div
        className="w-full lg:w-[50%] max-lg:hidden mt-20"
        animate={{ opacity: 1 - orOpacity }}
        transition={{ duration: 0.5 }}
      >
        <Info />
      </motion.div>
    </div>
  );
};

export default VerticalVariedSlider;





