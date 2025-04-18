"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { dropdownData } from './data'
import { ListItem } from './DropdownMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false) // scrolling down
      } else {
        setShowNavbar(true) // scrolling up
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`w-full bg-white z-50 fixed top-0 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/navbar/logo.svg"
              alt='logo'
              width={65}
              height={65}
              className="text-primary w-[65px]"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex items-center ml-20">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {['Home', 'Pricing'].map((item) => (
                    <NavigationMenuItem key={item}>
                      <NavigationMenuLink href='/' className="text-base font-semibold text-gray-700 hover:text-black">
                        {item}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                  {['Product', 'Resources', 'Support'].map((menu) => (
                    <NavigationMenuItem key={menu}>
                      <NavigationMenuTrigger className="text-base font-medium text-gray-700 hover:font-semibold">
                        {menu}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out border-none">
                        <div className="grid w-[600px] grid-cols-2 gap-2 p-2">
                          {dropdownData[menu.toLowerCase()].items.map((item) => (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              description={item.description}
                              icon={item.icon}
                              href={item.href}
                            />
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="text-base font-medium text-gray-700 hover:text-black">
                <Link href="/">Login</Link>
              </Button>
              <Button asChild className="bg-primary/90 hover:bg-primary text-white rounded-xl text-sm font-semibold px-4 py-2">
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden relative z-50 bg-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X size={25} className="text-primary" />
            ) : (
              <Menu size={25} className="text-primary" />
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-white h-screen shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-40 ${isMenuOpen ? 'transform scale-y-100 opacity-100' : 'transform scale-y-0 opacity-0'}`}
          style={{
            transformOrigin: 'top',
          }}
        >
          <div className="p-6 space-y-6 pt-10">

            {/* Top links like Home */}
            <Link
              href="/"
              className="block text-lg font-semibold text-black border-b border-gray-300 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Dropdown sections */}
            {['product', 'resources', 'support'].map((section) => (
              <Collapsible key={section} className="border-b border-gray-300 pb-4">
                <CollapsibleTrigger className="flex items-center gap-2 w-full py-2">
                  <span className="text-base text-gray-700 capitalize">{section}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pl-4 mt-4">
                  {dropdownData[section].items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={16}
                          height={16}
                        />
                      </div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}

            {/* Bottom links like Pricing and Login */}
            {['Pricing', 'Login'].map((label) => (
              <Link
                key={label}
                href="/"
                className="block text-base text-gray-700 border-b border-gray-200 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* CTA button */}
            <div className="pt-4">
              <Button asChild className="bg-primary w-fit text-white rounded-lg text-base font-medium">
                <Link href="/#" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Navbar
