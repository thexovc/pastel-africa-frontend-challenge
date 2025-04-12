import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Hero = () => {
  return (
    <section className="w-full pt-20 pb-20 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col gap-6">
          {/* Tag */}
          <div>
            <span className="inline-flex bg-[#F4F1FF] text-sm font-medium px-4 py-2 rounded-full">
              No-Code WordPress Site Builder
            </span>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-24 items-start">

            {/* Left Content */}
            <div className="flex flex-col">
              <h1 className="text-[72px] font-semibold text-black leading-[1.15] tracking-[-0.02em]">
                Break Limits.
                <br />
                Build{' '}
                <span className="text-[#5641F3]">Anything</span>.
                <br />
                No Code Needed.
              </h1>
            </div>

            {/* Right Content */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#F4F1FF] p-6 rounded-2xl">
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Droip is a no-code, drag-and-drop WordPress builder that simplifies website creation with powerful capabilities.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/watch-intro"
                  className="text-[#5641F3] font-medium hover:underline flex items-center gap-2 text-[15px]"
                >
                  Watch Intro
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 10H16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.25 5L16.25 10L11.25 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Button
                  asChild
                  className="bg-[#5641F3] hover:bg-[#5641F3]/90 text-white rounded-full text-[15px] font-medium h-[52px] w-full"
                >
                  <Link href="/get-started" className="flex items-center justify-center gap-2">
                    Get started with Droip
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 10H16.25M11.25 5L16.25 10L11.25 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

