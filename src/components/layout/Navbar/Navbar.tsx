"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white z-50 fixed top-0">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Logo - always visible */}
          <div className="flex items-center">
            <Image
              src="/assets/navbar/logo.svg"
              alt='logo'
              width={65}
              height={65}
              className="text-primary w-[65px]"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1">
            {/* Nav Links */}
            <div className="flex items-center ml-20">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">

                  <NavigationMenuItem>
                    <NavigationMenuLink href='/' className="text-base bg-none font-semibold text-gray-700 hover:text-black hover:font-semibold">
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-base font-medium text-gray-700 hover:font-semibold">
                      Product
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out border-none">
                      <div className="grid w-[600px] grid-cols-2 gap-2 p-2">
                        {dropdownData.product.items.map((item) => (
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

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-base bg-none font-medium text-gray-700 hover:font-semibold">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out border-none">
                      <div className="grid w-[600px] grid-cols-2 gap-2 p-2">
                        {dropdownData.resources.items.map((item) => (
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

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-base bg-none font-medium text-gray-700 hover:font-semibold">
                      Support
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out border-none">
                      <div className="grid w-[600px] grid-cols-2 gap-2 p-2">
                        {dropdownData.support.items.map((item) => (
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

                  <NavigationMenuItem>

                    <NavigationMenuLink href='/' className="text-base bg-none font-medium text-gray-700 hover:text-black hover:font-semibold">
                      Pricing
                    </NavigationMenuLink>

                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="text-base bg-none font-medium text-gray-700 hover:text-black hover:font-semibold">
                <Link href="/">Login</Link>
              </Button>
              <Button asChild className="bg-primary/90 hover:bg-primary hover:py-6 text-white rounded-xl text-sm font-semibold px-4 py-2">
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50 bg-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X size={55} className="text-primary" />
            ) : (
              <Menu size={55} className="text-primary" />
            )}
          </Button>
        </nav>

        {/* Mobile menu dropdown */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-white h-screen shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-40 ${isMenuOpen
            ? 'max-h-screen opacity-100 border-t border-gray-100'
            : 'max-h-0 opacity-0'
            }`}
        >
          <div className="p-6 space-y-6">
            <Link
              href="/"
              className="block text-lg text-black hover:font-semibold border-b border-gray-100 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <hr />
            </Link>

            <Collapsible className="border-b border-gray-100 pb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-lg text-black hover:font-semibold">Product</span>
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                {dropdownData.product.items.map((item) => (
                  <Link
                    key={item.title}
                    href="#"
                    className="flex items-center gap-3 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={16}
                        height={16}
                        className="text-primary"
                      />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
              <hr />
            </Collapsible>

            <Collapsible className="border-b border-gray-100 pb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-lg text-black hover:font-semibold">Resources</span>
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                {dropdownData.resources.items.map((item) => (
                  <Link
                    key={item.title}
                    href="/#"
                    className="flex items-center gap-3 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={16}
                        height={16}
                        className="text-primary"
                      />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
              <hr />
            </Collapsible>

            <Collapsible className="border-b border-gray-100 pb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-lg text-black hover:font-semibold">Support</span>
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                {dropdownData.support.items.map((item) => (
                  <Link
                    key={item.title}
                    href="/#"
                    className="flex items-center gap-3 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={16}
                        height={16}
                        className="text-primary"
                      />
                    </div>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </CollapsibleContent>
              <hr />
            </Collapsible>

            <Link
              href="/#"
              className="block text-lg text-black hover:font-semibold border-b border-gray-100 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
              <br />
              <hr />
            </Link>
            <Link
              href="/#"
              className="block text-lg text-black hover:font-semibold border-b border-gray-100 pb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
              <br />
              <hr />
            </Link>

            <div className="pt-4 flex flex-col gap-2">

              <Button asChild className="bg-primary w-fit text-white rounded-lg text-base font-medium ">
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