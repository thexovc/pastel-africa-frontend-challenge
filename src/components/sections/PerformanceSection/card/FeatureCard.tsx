import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    children
}) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#151515] px-5 pt-5 sm:px-10 sm:pt-8">
            <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-gray-400">
                    {description}
                </p>
            </div>
            {children}
        </div>
    );
};

export default FeatureCard;