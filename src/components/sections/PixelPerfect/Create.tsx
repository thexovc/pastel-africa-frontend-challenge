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

  // Extended animation duration to ensure smoother transitions
  const animationDuration = 800; // in milliseconds

  // Track if we're in slider control mode
  const isSliderControlActive = useRef(false);

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

  // Improved scroll handling function that completely controls scrolling
  const handleScroll = (delta: number) => {
    if (!isComponentActive || isAnimating.current) return;

    // Set animation lock
    isAnimating.current = true;

    // Enable slider control mode to block all scrolling
    isSliderControlActive.current = true;

    // Scrolling down - move to maxIndex (id 6)
    if (delta > 0 && currentIndex < maxIndex) {
      setCurrentIndex(maxIndex);
    }
    // Scrolling up - move to defaultIndex (id 3)
    else if (delta < 0 && currentIndex > defaultIndex) {
      setCurrentIndex(defaultIndex);
    } else {
      // If no action needed, release locks immediately
      isAnimating.current = false;
      isSliderControlActive.current = false;
      return;
    }

    // Release the animation lock after animation completes
    setTimeout(() => {
      isAnimating.current = false;

      // Keep slider control active for a bit longer to prevent immediate scrolling
      setTimeout(() => {
        isSliderControlActive.current = false;
      }, 300); // Additional cooldown period
    }, animationDuration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsComponentActive(isIntersecting);

        if (isIntersecting) {
          lastScrollPosition.current = window.scrollY;

          // Reset the animation states when entering view
          isAnimating.current = false;
          isSliderControlActive.current = false;
        }
      },
      { threshold: 0.5 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Position threshold to determine if we should intercept scrolling
    let lastWheelTimestamp = 0;
    const wheelCooldown = 50; // ms between wheel events

    // Mouse wheel handler with complete prevention
    const handleWheel = (e: WheelEvent) => {
      // Always check if component is in view first
      if (!isComponentActive) return;

      // If slider control is active or we're animating, prevent all scrolling
      if (isSliderControlActive.current || isAnimating.current) {
        e.preventDefault();
        return;
      }

      // Apply cooldown between wheel events
      const now = Date.now();
      if (now - lastWheelTimestamp < wheelCooldown) {
        e.preventDefault();
        return;
      }
      lastWheelTimestamp = now;

      // Handle scroll direction logic
      if (
        (currentIndex > defaultIndex && e.deltaY < 0) || // Scrolling up while expanded
        (currentIndex === defaultIndex && e.deltaY > 0) // Scrolling down while contracted
      ) {
        e.preventDefault();
        handleScroll(e.deltaY);
      }
    };

    // Touch handlers with improved control
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isComponentActive) return;

      // Block all touch movement while animating
      if (isSliderControlActive.current || isAnimating.current) {
        e.preventDefault();
        return;
      }

      const touchDelta = touchStartY - e.touches[0].clientY;
      const touchDuration = Date.now() - touchStartTime;

      // Only respond if touch has moved enough and isn't too fast
      if (Math.abs(touchDelta) > 10 && touchDuration > 50) {
        if (
          (currentIndex > defaultIndex && touchDelta < 0) || // Swiping up (moving finger down)
          (currentIndex === defaultIndex && touchDelta > 0) // Swiping down (moving finger up)
        ) {
          e.preventDefault();
          handleScroll(touchDelta);
          // Reset after handling to prevent multiple triggers
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      }
    };

    // General scroll handler with improved prevention
    let lastScrollTime = 0;
    const scrollCooldown = 300; // ms between scroll events

    const handleScrollbar = () => {
      if (!isComponentActive) return;

      // Block all scrolling while animating
      if (isSliderControlActive.current || isAnimating.current) {
        // Try to restore position to prevent movement
        window.scrollTo(0, lastScrollPosition.current);
        return;
      }

      // Apply cooldown between scroll events
      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) {
        window.scrollTo(0, lastScrollPosition.current);
        return;
      }

      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollPosition.current;

      // Only handle significant scroll changes
      if (Math.abs(delta) > 5) {
        if (
          (currentIndex > defaultIndex && delta < 0) || // Scrolling up
          (currentIndex === defaultIndex && delta > 0) // Scrolling down
        ) {
          // Store the time we processed this scroll
          lastScrollTime = now;

          // Handle the scroll action
          handleScroll(delta);

          // Force scroll position to stay the same
          window.scrollTo(0, lastScrollPosition.current);
        } else {
          // Update scroll position for non-controlled scrolling
          lastScrollPosition.current = currentScroll;
        }
      }
    };

    // Add event listeners with appropriate options
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
      className="w-full "
      ref={componentRef}
      style={{ backgroundColor: orOpacity === 1 ? "black" : "transparent" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row pt-16 xs:pt-20 lg:pt-32">
        <motion.div
          className="w-full md:w-[50%] relative"
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
          className="lg:hidden w-full 2xs:w-[90%] xs:w-[80%] sm:w-[70%] md:w-[60%] my-10 md:my-12"
          animate={{ opacity: contentOpacity }}
          transition={{ duration: 0.8 }}
        >
          <Info />
        </motion.div>

        <motion.div
          className="w-full lg:w-[50%] relative flex max-lg:justify-center"
          animate={{ opacity: sliderOpacity }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full flex flex-col">
            <ImageVerticalSlider
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              orOpacity={orOpacity}
              animationDuration={animationDuration}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
