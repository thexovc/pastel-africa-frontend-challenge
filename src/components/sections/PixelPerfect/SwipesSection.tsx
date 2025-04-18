"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OscillatingSwiper from "./swiper/OscillatingSwiper";
import { swiperImages } from "../../../../public/assets/swiper";

export default function SwipesSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [globalPosition, setGlobalPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Create the effect element that will be positioned fixed on the screen
        const effectElement = document.createElement("div");
        effectElement.id = "jumpstart-mouse-effect";
        effectElement.style.position = "fixed";
        effectElement.style.pointerEvents = "none";
        effectElement.style.width = "800px";
        effectElement.style.height = "800px";
        effectElement.style.borderRadius = "50%";
        effectElement.style.background = `radial-gradient(circle at center,
        rgba(99, 82, 255, 0.4),
        rgba(82, 67, 255, 0.2) 40%,
        rgba(71, 56, 255, 0.1) 60%,
        transparent 80%)`;
        effectElement.style.transform = "translate(-50%, -50%)";
        effectElement.style.mixBlendMode = "screen";
        effectElement.style.opacity = "0";
        effectElement.style.transition = "opacity 0.2s ease";
        effectElement.style.zIndex = "9999";
        document.body.appendChild(effectElement);

        const handleGlobalMouseMove = (e: MouseEvent) => {
            const section = document.getElementById("jumpstart-section");
            if (!section) return;

            const rect = section.getBoundingClientRect();

            // Check if mouse is over the swiper
            const swiperColumn = document.querySelector(".swiper-column");
            if (swiperColumn) {
                const swiperRect = swiperColumn.getBoundingClientRect();
                if (
                    e.clientX >= swiperRect.left &&
                    e.clientX <= swiperRect.right &&
                    e.clientY >= swiperRect.top &&
                    e.clientY <= swiperRect.bottom
                ) {
                    return;
                }
            }

            // Calculate distance from component bounds
            const distanceFromTop = e.clientY - rect.top;
            const distanceFromBottom = rect.bottom - e.clientY;
            const distanceFromLeft = e.clientX - rect.left;
            const distanceFromRight = rect.right - e.clientX;

            // Define how far away from the component the effect should still be visible
            const effectRange = 200; // pixels

            // Check if mouse is within the component or within range
            const isWithinComponent =
                distanceFromTop > 0 &&
                distanceFromBottom > 0 &&
                distanceFromLeft > 0 &&
                distanceFromRight > 0;

            const isWithinRange =
                distanceFromTop > -effectRange &&
                distanceFromBottom > -effectRange &&
                distanceFromLeft > -effectRange &&
                distanceFromRight > -effectRange;

            // Store current visibility state
            const shouldBeVisible = isWithinComponent || isWithinRange;
            setIsVisible(shouldBeVisible);

            // Update the effect element
            const effect = document.getElementById("jumpstart-mouse-effect");
            if (effect) {
                effect.style.opacity = shouldBeVisible ? "1" : "0";
                effect.style.left = `${e.clientX}px`;
                effect.style.top = `${e.clientY}px`;
            }

            // Update relative position for component rendering
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });

            // Update global position
            setGlobalPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        // Add global mouse move listener
        document.addEventListener("mousemove", handleGlobalMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleGlobalMouseMove);
            // Clean up the effect element when component unmounts
            const effect = document.getElementById("jumpstart-mouse-effect");
            if (effect && effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        };
    }, []);


    return (
        <motion.div
            id="jumpstart-section"
            style={{
                position: "relative",
                overflow: "visible",
                backgroundColor: "#000000",
            }}
            className="w-full bg-black flex flex-col items-center sm:items-end py-10">

            <div className="container flex justify-end relative z-[1001] px-4 sm:px-20">
                <div className="flex flex-col items-start gap-10">
                    {/* "Or" */}
                    <motion.h1
                        className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[120px] font-semibold text-white leading-none"
                        transition={{ duration: 0.5 }}
                    >
                        Or
                    </motion.h1>

                    {/* Supporting text */}
                    <h1
                        className="text-white text-[2rem] 2xs:text-[2.4rem] xs:text-[2.5rem] sm:text-[2.8rem] lg:text-[3rem] xl:text-[3.2rem] font-medium leading-tight"
                        style={{
                            letterSpacing: "-0.03em",
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        Jumpstart your business with <br className="hidden sm:block" />
                        beautifully crafted <br className="hidden sm:block" />
                        themes and sections
                    </h1>
                </div>
            </div>


            {/* We'll keep this div for compatibility but we won't use it for the effect */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    opacity: 0,
                }}
            />

            <div className="w-full max-w-[1400px] pt-10 pb-4">

                <Image
                    src="/assets/swiper/rocket.svg"
                    alt="Rocket icon"
                    width={50}
                    height={50}
                    className="mt-1"
                />
            </div>

            <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-[1fr_3fr] items-start justify-start px-4 gap-y-4 md:gap-y-0">
                {/* Header */}
                <div className="max-w-sm w-full md:mx-0 md:text-left space-y-4">
                    <div className="flex flex-col items-start gap-3 mb-4">
                        <h2 className="text-lg sm:text-2xl font-medium text-white leading-tight">
                            Launch with ease using stunning, ready-to-use themes & sections designed for every need.
                        </h2>
                    </div>
                </div>

                {/* Swiper Rows */}
                <div className="relative w-full overflow-hidden">
                    {/* Left gradient overlay */}
                    <div className="absolute top-0 left-0 h-full w-12 z-10 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />

                    {/* Right gradient overlay */}
                    <div className="absolute top-0 right-0 h-full w-12 z-10 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none" />

                    {/* First Row */}
                    <div className="mb-2">
                        <OscillatingSwiper
                            images={[
                                swiperImages.swipe1_1,
                                swiperImages.swipe1_2,
                                swiperImages.swipe1_3,
                                swiperImages.swipe1_4,

                            ]}
                            oscillationDuration={5}
                            startingDelay={0}
                        />
                    </div>

                    {/* Second Row */}
                    <div className="mb-2">
                        <OscillatingSwiper
                            images={[
                                swiperImages.swipe2_1,
                                swiperImages.swipe2_2,
                                swiperImages.swipe2_3,
                                swiperImages.swipe2_4,
                                swiperImages.swipe2_5
                            ]}
                            oscillationDuration={5}
                            startingDelay={2}
                        />
                    </div>

                    {/* Third Row */}
                    <div>
                        <OscillatingSwiper
                            images={[
                                swiperImages.swipe3_1,
                                swiperImages.swipe3_2,
                                swiperImages.swipe3_3,
                                swiperImages.swipe3_4,
                                swiperImages.swipe3_5,
                                swiperImages.swipe3_6
                            ]}
                            oscillationDuration={5}
                            startingDelay={3}
                        />
                    </div>
                </div>

            </div>
        </motion.div>


    );
}