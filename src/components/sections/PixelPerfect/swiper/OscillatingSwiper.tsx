"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

// Props
interface OscillatingSwiperProps {
    images: (string | StaticImageData)[];
    oscillationDuration?: number;
    scrollSpeed?: number;
    startingDelay?: number;
}

export default function OscillatingSwiper({
    images,
    oscillationDuration = 8,
    scrollSpeed = 0.08,
    startingDelay = 0
}: OscillatingSwiperProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!containerRef.current || images.length === 0) return;

        const scrollContainer = containerRef.current;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        let direction = 1;
        let animationId: number;
        let lastTimestamp: number | null = null;
        let elapsedTime = -startingDelay;
        let currentPosition = 0;

        const animate = (timestamp: number) => {
            if (lastTimestamp === null) {
                lastTimestamp = timestamp;
                animationId = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = (timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            elapsedTime += deltaTime;

            if (elapsedTime < 0) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            if (elapsedTime >= oscillationDuration) {
                direction *= -1;
                elapsedTime = 0;
            }

            const progress = elapsedTime / oscillationDuration;
            const targetPosition = direction === 1
                ? maxScroll * progress
                : maxScroll * (1 - progress);

            const scrollDelta = (targetPosition - currentPosition) * scrollSpeed;
            currentPosition += scrollDelta;

            scrollContainer.scrollLeft = currentPosition;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [images, oscillationDuration, scrollSpeed, startingDelay]);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-hidden py-0"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
                        style={{ width: "calc(80vw - 32px)", maxWidth: "360px" }}
                    >
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <Image
                                src={src}
                                alt={`Design ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 90vw, 400px"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
