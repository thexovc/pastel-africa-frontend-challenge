"use client";

import React, { ReactNode, useEffect, useRef } from "react";

interface AnimateHeaderProps {
    title: string | ReactNode;
    content: string | ReactNode;
    isShort?: boolean;
}

const AnimateHeader: React.FC<AnimateHeaderProps> = ({
    title,
    content,
    isShort = false,
}) => {
    const horizontalLineRef = useRef<HTMLDivElement>(null);
    const verticalLineRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate horizontal line
                        setTimeout(() => {
                            if (horizontalLineRef.current) {
                                horizontalLineRef.current.style.width = "100%";
                            }
                        }, 100);

                        // Animate vertical line
                        setTimeout(() => {
                            if (verticalLineRef.current) {
                                verticalLineRef.current.style.height = isShort ? "50px" : "70px";
                            }
                        }, 1100);

                        // Animate dot
                        setTimeout(() => {
                            if (dotRef.current) {
                                dotRef.current.style.transform = "scale(1)";
                            }
                        }, 1800);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (horizontalLineRef.current) {
            observer.observe(horizontalLineRef.current);
        }

        return () => observer.disconnect();
    }, [isShort]);

    return (
        <div className="flex flex-col justify-between items-start gap-2">
            {/* Left side - Title */}
            {React.isValidElement(title) ? (
                title
            ) : (
                <h2 className="text-black text-5xl xl:text-6xl 2xl:text-8xl leading-[1.1em] 2xl:tracking-[-5px] font-medium">
                    {title}
                </h2>
            )}

            {/* The animated line */}
            <div className="mt-5 w-full flex items-start gap-6 md:gap-8">
                <div className="relative h-[100px] w-[40%] md:w-[50%] lg:w-[60%] 2xl:w-[70%]">
                    {/* Horizontal line */}
                    <div
                        ref={horizontalLineRef}
                        className="absolute w-0 h-[1px] bg-primary transition-[width] duration-1000 ease-in-out"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(99,102,241,0) 0%, rgba(99,102,241,1) 100%)",
                        }}
                    />
                    {/* Vertical line */}
                    <div
                        ref={verticalLineRef}
                        className="absolute right-0 w-[1px] h-0 bg-primary transition-[height] duration-700 ease-out"
                    />
                    {/* Animated dot */}
                    <div
                        ref={dotRef}
                        className={`absolute right-[-6px] w-3 h-3 rounded-full bg-primary transition-transform duration-500 ease-linear ${isShort ? 'bottom-[40px]' : 'bottom-[20px]'
                            }`}
                        style={{ transform: "scale(0)" }}
                    />
                </div>

                {/* Right side - Content */}
                <div className="relative w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] flex justify-end">
                    {/* Description */}
                    {React.isValidElement(content) ? (
                        content
                    ) : (
                        <p className="text-xl md:text-2xl font-medium">{content}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimateHeader;