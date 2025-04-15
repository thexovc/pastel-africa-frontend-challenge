"use client"

import Image from "next/image";
import { swiperImages } from "../../../../public/assets/swiper";
import OscillatingSwiper from "./swiper/OscillatingSwiper";

export default function SwipesSection() {
    return (
        <section className="w-full bg-black flex flex-col items-center sm:items-end">
            <div className="w-full max-w-[1600px] pt-10 pb-4">

                <Image
                    src="/assets/swiper/rocket.svg"
                    alt="Rocket icon"
                    width={50}
                    height={50}
                    className="mt-1"
                />
            </div>

            <div className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-[1fr_3fr] items-start justify-start px-4 gap-y-4 md:gap-y-0">
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
                            oscillationDuration={10}
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
                            oscillationDuration={12}
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
                            oscillationDuration={14}
                            startingDelay={4}
                        />
                    </div>
                </div>

            </div>
        </section>


    );
}