import React from 'react';
import FeatureCard from './FeatureCard';
import Image from 'next/image';

const PerformanceCard: React.FC = () => {
    return (
        <FeatureCard
            title="Keep website lightweight"
            description="Optimized code means faster load times, improved performance, and a smoother user experience."
        >
            <div className="relative w-full">
                <div className="w-full aspect-[16/9] relative">
                    <Image
                        src="/assets/performance/lightweight.webp"
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

export default PerformanceCard;
