"use client"

import React, { useState, useEffect } from 'react';
import CodeCard from './card/CodeCard';
import PerformanceCard from './card/PerformanceCard';

const PerformanceSection: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = e?.currentTarget?.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const section = document.getElementById('performance-section');
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            section.addEventListener('mouseenter', () => setIsHovering(true));
            section.addEventListener('mouseleave', () => setIsHovering(false));
        }

        return () => {
            if (section) {
                section.removeEventListener('mousemove', handleMouseMove);
                section.removeEventListener('mouseenter', () => setIsHovering(true));
                section.removeEventListener('mouseleave', () => setIsHovering(false));
            }
        };
    }, []);

    return (
        <section id="performance-section" className="w-full bg-black py-16 md:py-24 relative overflow-hidden">
            {/* Mouse following gradient */}
            <div
                className="absolute pointer-events-none"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px,
                       rgba(141, 131, 255, 0.3), 
                        rgba(121, 109, 247, 0.15) 40%,
                        transparent 70%)`,
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    mixBlendMode: 'screen',
                    transition: isHovering ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />

            <div className="container mx-auto px-4 max-w-[1600px] relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white w-5/6 sm:max-w-sm mx-auto">
                        Performance that sets you apart
                    </h2>
                </div>

                {/* Feature Cards */}
                <div className="sm:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CodeCard

                    />
                    <PerformanceCard />
                </div>
            </div>
        </section>
    );
};

export default PerformanceSection;



