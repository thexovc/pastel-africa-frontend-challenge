import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight, PlayCircle } from 'lucide-react'

const Hero = () => {
  return (
    <section className="w-full pt-20 pb-10 md:pb-20">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-6 md:gap-10">
          {/* Tag */}
          <div>
            <span className="inline-flex bg-[#DDD9FD] text-base md:text-xl font-bold px-3 py-1 md:px-4 md:py-2 rounded-full">
              No-Code WordPress Site Builder
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr] gap-8 md:gap-12 lg:gap-24 items-start">

            {/* Left Content */}
            <div className="flex flex-col">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-black leading-[1.15] tracking-[-0.02em]">
                Break Limits.
                <br />
                Build{' '}
                <span className="text-primary">Anything</span>.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                No Code Needed.
              </h1>
            </div>

            {/* Right Content */}
            <div className="flex flex-col gap-4">
              <div className="bg-light-primary p-3 md:p-4 rounded-xl md:rounded-2xl pb-10 md:pb-16">
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Droip is a no-code, drag-and-drop WordPress builder that simplifies website creation with powerful capabilities.
                </p>
              </div>

              <div className="flex gap-2 md:gap-3 bg-light-primary rounded-xl md:rounded-2xl p-3 md:p-4 items-center justify-center">
                <Link
                  href="/watch-intro"
                  className="text-primary hover:underline flex items-center gap-1 md:gap-2 text-base md:text-lg font-semibold"
                >
                  Watch Intro
                  <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              </div>

              <div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white rounded-full text-base md:text-lg font-medium h-10 md:h-12 lg:h-[52px] w-full"
                >
                  <Link href="/get-started" className="flex items-center justify-center gap-1 md:gap-2">
                    Get started with Droip
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className='w-full p-2 md:p-4 rounded-xl md:rounded-2xl bg-light-primary mx-auto mt-4 md:mt-0'>
            <Image
              src="/assets/hero/hero1.webp"
              alt='Hero image showing Droip website builder interface'
              width={1600}
              height={900}
              layout="responsive"
              className="rounded-lg md:rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero