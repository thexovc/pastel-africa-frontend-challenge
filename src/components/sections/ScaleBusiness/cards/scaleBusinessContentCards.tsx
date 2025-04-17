import React from "react";
import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";
import { ScaleBusinessContentCardProps } from "@/utils/types";

const ScaleBusinesContentCard: React.FC<ScaleBusinessContentCardProps> = ({
    title,
    image,
    description,
}) => {
    return (
        <div className="overflow-hidden w-full h-full py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:pl-12 lg:pr-0 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20 justify-between bg-[#CDC6FB] lg:bg-[#EBE8FE] rounded-2xl lg:rounded-[28px] min-h-[300px] sm:min-h-[350px] lg:min-h-[500px] xl:min-h-[650px]">
            <div className="w-full flex flex-col justify-between mb-4 sm:mb-6 lg:mb-10 text-black">
                <h1 className="text-xl sm:text-2xl xl:text-3xl font-semibold">{title}</h1>

                <div className="flex flex-col justify-between gap-2 mt-4 sm:mt-6">
                    <p className="w-full sm:w-[85%] lg:w-full text-lg sm:text-xl lg:text-2xl font-medium">
                        {description}
                    </p>

                    <div className="mt-3 sm:mt-4 lg:mt-5 text-primary/90 cursor-pointer font-semibold flex items-center gap-2 group relative">
                        <p className="relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary/90 after:left-0 after:bottom-0 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                            View Details
                        </p>
                        <IoArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>

            <div className="relative w-full lg:w-auto">
                <Image
                    src={image}
                    alt="image"
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-full object-cover lg:rounded-tl-3xl lg:rounded-bl-3xl lg:min-h-[500px] xl:min-h-[650px] lg:min-w-[400px] xl:min-w-[750px]"
                />
            </div>
        </div>
    );
};

export default ScaleBusinesContentCard;
