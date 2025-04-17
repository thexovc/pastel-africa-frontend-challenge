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
  const exitThresholdReached = useRef(false);

  const defaultIndex = 2;
  const maxIndex = 5;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isComponentActive, setIsComponentActive] = useState(false);
  const isAnimating = useRef(false);

  const [contentOpacity, setContentOpacity] = useState(1);
  const [orOpacity, setOrOpacity] = useState(0);
  const [sliderOpacity, setSliderOpacity] = useState(1);

  useEffect(() => {
    if (currentIndex === maxIndex) {
      setContentOpacity(0);
      setOrOpacity(1);
    } else {
      setContentOpacity(1);
      setOrOpacity(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isComponentActive && currentIndex === maxIndex) {
      setSliderOpacity(0);
    } else {
      setSliderOpacity(1);
    }
  }, [isComponentActive, currentIndex]);

  const handleScroll = (delta: number) => {
    if (!isComponentActive || isAnimating.current) return;

    const scrollThreshold = 20;
    if (Math.abs(delta) < scrollThreshold) return;

    if (delta > 0 && currentIndex < maxIndex) {
      isAnimating.current = true;
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
      setTimeout(() => {
        isAnimating.current = false;
      }, 500);
    } else if (delta < 0 && currentIndex > defaultIndex) {
      isAnimating.current = true;
      setCurrentIndex(prev => Math.max(prev - 1, defaultIndex));
      setTimeout(() => {
        isAnimating.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsComponentActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          lastScrollPosition.current = window.scrollY;
        } else {
          setCurrentIndex(defaultIndex);
          setContentOpacity(1);
          setOrOpacity(0);
          setSliderOpacity(1);
          isAnimating.current = false;
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    exitThresholdReached.current = currentIndex === maxIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isComponentActive || isAnimating.current) return;

      const shouldIntercept =
        (currentIndex > defaultIndex || (currentIndex === defaultIndex && e.deltaY > 0)) &&
        !exitThresholdReached.current;

      if (shouldIntercept) {
        e.preventDefault();
        handleScroll(e.deltaY);
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isComponentActive || isAnimating.current) return;
      const touchDelta = touchStartY - e.touches[0].clientY;

      const shouldIntercept =
        (currentIndex > defaultIndex || (currentIndex === defaultIndex && touchDelta > 0)) &&
        !exitThresholdReached.current;

      if (shouldIntercept) {
        e.preventDefault();
        handleScroll(touchDelta);
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleScrollbar = () => {
      if (!isComponentActive || isAnimating.current) return;
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollPosition.current;

      const shouldIntercept =
        (currentIndex > defaultIndex || (currentIndex === defaultIndex && delta > 0)) &&
        !exitThresholdReached.current;

      if (shouldIntercept) {
        handleScroll(delta);
      }

      lastScrollPosition.current = currentScroll;
    };

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
    <div
      className="w-full min-h-screen bg-black flex flex-col items-center sm:items-start"
      ref={componentRef}
      style={{
        backgroundColor: orOpacity === 1 ? "black" : "transparent",
        scrollSnapAlign: "start",
      }}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row pt-8 xs:pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8">
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
