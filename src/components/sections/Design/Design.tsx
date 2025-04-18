"use client"

import React, { useRef, useState } from "react";
import Image from "next/image";
import AnimateHeader from "../../shared/AnimatedHeader";
import { ArrowRight, ChevronRight } from 'lucide-react';

type Feature = {
    title: string;
    description: string;
    image: string;
}

type CardContentProps = {
    title: string | React.ReactNode;
    description: string;
    icon?: any;
    titleStyle?: string;
    descriptionStyle?: string;
    iconStyle?: string;
    containerStyle?: string;
    textContainerStyle?: string;
    className?: string;
}


const features: Feature[] = [
    {
        title: "Seamless migration",
        description: "Migrate your existing design seamlessly into Droip with just a click of a button!",
        image: "/assets/design/design1.webp"
    },
    {
        title: "Form builder",
        description: "Build forms for any purpose and effortlessly manage form data natively.",
        image: "/assets/design/design2.webp"
    },
    {
        title: "CSS preview",
        description: "See real-time CSS changes and fine-tune styles as you need.",
        image: "/assets/design/design3.webp"
    },
    {
        title: "Unlimited breakpoints",
        description: "Achieve pixel-perfect responsiveness across all devices with unlimited breakpoints.",
        image: "/assets/design/design4.webp"
    },
    {
        title: "Figma to droip",
        description: "Seamlessly import Figma designs into Droip and bring your vision to life in no time.",
        image: "/assets/design/design5.webp"
    },
    {
        title: "Code element",
        description: "Add custom HTML, CSS, and JavaScript to an element for extended functionality.",
        image: "/assets/design/design6.webp"
    },
    {
        title: "Pop-up builder",
        description: "Design engaging pop-ups that captivate visitors and boost conversions.",
        image: "/assets/design/design7.webp"
    },
    {
        title: "Autosave",
        description: "Never lose progress—your work is automatically saved as you build.",
        image: "/assets/design/design8.webp"
    },
    {
        title: "Global style manager",
        description: "Maintain consistent branding with centralized style controls.",
        image: "/assets/design/design9.webp"
    },
    {
        title: "Droip AI",
        description: "Harness AI to accelerate your workflow and creative process.",
        image: "/assets/design/design10.webp"
    }
];

const Design: React.FC = () => {
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // const [isHovering, setIsHovering] = useState(false);

    const ctaRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ctaRef.current) return;

        const rect = ctaRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
        setLastMousePosition({ x, y }); // Save the last position
    };

    return (
        <section className="w-full">
            <div className="w-full max-w-[1200px] mx-auto pt-32 pb-20">

                <AnimateHeader
                    title={
                        <h2 className="text-black text-5xl xl:text-6xl 2xl:text-8xl leading-[1.1em] 2xl:tracking-[-5px] font-medium">
                            Design and
                            <br />
                            build everything
                        </h2>
                    }
                    content="more efficiently with the most advanced granular controls"
                    isShort={true}
                />


                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-1 sm:mt-10">
                    {/* First Row - Single Card */}
                    <div className="w-full bg-white rounded-xl p-4 sm:p-8">
                        <div className="flex gap-8 flex-col md:flex-row">
                            <div className="flex flex-col justify-end">
                                <h3 className="text-2xl sm:text-4xl font-semibold mb-3">{features[0].title}</h3>
                                <p className="text-gray-600 font-semibold text-md">{features[0].description}</p>
                            </div>
                            <div className="w-full h-[150px] md:h-[380px] relative flex justify-start">
                                <Image
                                    src={features[0].image}
                                    alt={features[0].title}
                                    fill
                                    className="object-contain object-right"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Second Row - Two Cards */}
                    <div className="grid md:grid-cols-2 gap-1">
                        {features.slice(1, 3).map((feature, index) => (
                            <div key={feature.title} className="bg-white rounded-xl p-4 md:p-12">
                                <div className="flex flex-col h-full">
                                    <div className="h-[150px] md:h-[200px] relative mb-8">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-md leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Third Row - Four Cards */}
                    <div className="grid md:grid-cols-4 gap-1">
                        {features.slice(3, 7).map((feature) => (
                            <div key={feature.title} className="bg-white rounded-xl p-4 md:p-12">
                                <div className="flex flex-col h-full">
                                    <div className="h-[100px] md:h-[150px] relative mb-8">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-md leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fourth Row - Three Cards */}
                    <div className="grid md:grid-cols-[1fr_1fr_2fr] gap-1">
                        {features.slice(7).map((feature) => (
                            <div key={feature.title} className="bg-white rounded-xl p-4 md:p-12">
                                <div className="flex flex-col h-full">
                                    <div className="h-[100px] md:h-[150px] relative mb-8">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-md leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div
                    ref={ctaRef}
                    className="mt-32 rounded-2xl overflow-hidden relative cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#331e7c] to-black"></div>
                    {/* Mouse following gradient - always present using the last mouse position */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                        rgba(81, 69, 247, 0.8),
                        rgba(51, 39, 147, 0.4) 40%,
                        transparent 70%)`,
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            mixBlendMode: 'screen',
                            transition: isHovering ? 'none' : 'background 0.1s ease-out',
                        }}
                    />

                    <div className="grid sm:grid-cols-[1fr_1fr]  xl:grid-cols-[2fr_1fr] relative z-10">
                        {/* Left side */}
                        <div className="p-8 md:px-20 md:py-5 flex items-center">
                            <h2 className="text-3xl sm:text-5xl xl:text-6xl text-white font-medium leading-[1.1]">
                                Get Started
                                <br />
                                For Free
                            </h2>
                        </div>

                        {/* Right side */}
                        <div className="px-8 pb-8 sm:p-8 xl:p-16 flex flex-col justify-between">
                            <p className="text-white text-sm sm:text-lg md:text-base leading-relaxed mb-8">
                                Experience the power of Droip no-code website builder, risk-free. Create stunning, responsive sites with pure creative freedom.
                            </p>

                            <button className="group/btn bg-[#5641F3] flex items-center justify-center text-lg xl:text-xl text-white px-4 sm:px-8 py-2 xl:py-4 rounded-2xl sm:rounded-3xl hover:bg-[#4634E6] transition-all duration-300 gap-2 font-medium transform hover:scale-105">
                                Try for Free
                                <span className="relative w-6 h-6 flex items-center justify-center">

                                    <ChevronRight
                                        size={24}
                                        className="absolute transition-all duration-300 transform group-hover/btn:opacity-0 group-hover/btn:translate-y-1"
                                    />


                                    <ArrowRight
                                        size={24}
                                        className="absolute transition-all duration-300 opacity-0 transform -translate-y-1 group-hover/btn:opacity-100 group-hover/btn:translate-y-0"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Design