import React from 'react';
import FeatureCard from './FeatureCard';
import Image from 'next/image';

const CodeCard: React.FC = () => {
    return (
        <FeatureCard
            title="Clean code output"
            description="Droip generates minimal, well-structured code that is free from unnecessary bloat ensuring efficiency."
        >
            <div className="relative w-full">
                <div className="w-full aspect-[16/9] relative">
                    <Image
                        src="/assets/performance/clean-code.webp"
                        alt="Clean code example"
                        fill
                        className="rounded-lg object-contain md:object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>
        </FeatureCard>
    );
};

export default CodeCard;