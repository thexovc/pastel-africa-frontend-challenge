"use client";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ImageVerticalSlider from "./ImageVerticalSlider";
import Info from "./Info";

const Create: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.3 });
  const lastScrollPosition = useRef(0);

  const defaultIndex = 2;
  const maxIndex = 5;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isComponentActive, setIsComponentActive] = useState(false);
  const isAnimating = useRef(false);

  // Add opacity controls
  const [contentOpacity, setContentOpacity] = useState(1);
  const [orOpacity, setOrOpacity] = useState(0);
  const [sliderOpacity, setSliderOpacity] = useState(1);

  // Handle opacity transitions based on currentIndex and component visibility
  useEffect(() => {
    if (currentIndex === maxIndex) {
      // Fade out content (h1 and info) and fade in "Or"
      setContentOpacity(0);
      setOrOpacity(1);
    } else {
      // Reset opacities when not at maxIndex
      setContentOpacity(1);
      setOrOpacity(0);
    }
  }, [currentIndex]);

  // Handle slider visibility based on component being in view
  useEffect(() => {
    if (!isComponentActive && currentIndex === maxIndex) {
      setSliderOpacity(0);
    } else {
      setSliderOpacity(1);
    }
  }, [isComponentActive, currentIndex]);

  // Handle both wheel and touch/scrollbar scrolling
  const handleScroll = (delta: number) => {
    if (!isComponentActive || isAnimating.current) return;

    // Scrolling down
    if (delta > 0 && currentIndex < maxIndex) {
      isAnimating.current = true;

      const animate = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            clearInterval(animate);
            isAnimating.current = false;
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }
    // Scrolling up
    else if (delta < 0 && currentIndex > defaultIndex) {
      isAnimating.current = true;

      const animate = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev <= defaultIndex) {
            clearInterval(animate);
            isAnimating.current = false;
            return prev;
          }
          return prev - 1;
        });
      }, 100);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsComponentActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          lastScrollPosition.current = window.scrollY;
        }
      },
      { threshold: 0.5 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      if (!isComponentActive || isAnimating.current) return;
      if (
        currentIndex > defaultIndex ||
        (currentIndex === defaultIndex && e.deltaY > 0)
      ) {
        e.preventDefault();
        handleScroll(e.deltaY);
      }
    };

    // Touch handlers
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isComponentActive || isAnimating.current) return;
      const touchDelta = touchStartY - e.touches[0].clientY;

      if (
        currentIndex > defaultIndex ||
        (currentIndex === defaultIndex && touchDelta > 0)
      ) {
        e.preventDefault();
        handleScroll(touchDelta);
        touchStartY = e.touches[0].clientY;
      }
    };

    // Scrollbar/general scroll handler
    const handleScrollbar = () => {
      if (!isComponentActive || isAnimating.current) return;
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollPosition.current;

      if (
        currentIndex > defaultIndex ||
        (currentIndex === defaultIndex && delta > 0)
      ) {
        handleScroll(delta);
      }
      lastScrollPosition.current = currentScroll;
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScrollbar, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScrollbar);
    };
  }, [isComponentActive, currentIndex]);

  return (
    <div className="w-full bg-black flex flex-col items-center sm:items-start"
      ref={componentRef}
      style={{ backgroundColor: orOpacity === 1 ? "black" : "transparent" }}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row pt-8 xs:pt-12 sm:pt-20">
        <motion.div
          className="w-full relative"
          animate={{ opacity: contentOpacity }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            ref={headingRef}
            initial={{ backgroundPosition: "100% 0" }}
            animate={
              isInView
                ? { backgroundPosition: "0% 0" }
                : { backgroundPosition: "100% 0" }
            }
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            style={{
              letterSpacing: "-5px",
              lineHeight: "1.1em",
              backgroundImage:
                "linear-gradient(90deg, #000 0%, #000 50%, #aaaaaa 50.001%, #aaaaaa 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "100% 0",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className={classNames(
              "text-5xl sm:text-6xl lg:text-7xl xl:text-[clamp(80px,8vw,96px)] font-500 text-black "
            )}
          >
            Create <br /> pixel-perfect <br /> accuracy in the atomic level{" "}
          </motion.h1>
        </motion.div>

        <motion.div
          className="lg:hidden my-10 md:my-12"
          animate={{ opacity: contentOpacity }}
          transition={{ duration: 0.8 }}
        >
          <Info />
        </motion.div>

        <motion.div
          className="w-full lg:w-[60%] relative flex max-lg:justify-center"
          animate={{ opacity: sliderOpacity }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full flex flex-col">
            <ImageVerticalSlider
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              orOpacity={orOpacity}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
