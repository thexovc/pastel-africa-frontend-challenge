"use client"

import Link from 'next/link'
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { dropdownData } from './data'
import { ListItem } from './DropdownMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const Navbar = () => {
  return (
    <div className="w-full bg-white z-50 fixed top-0">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full">

            {/* Nav Links */}
            <div className="flex items-center space-x-20">
              <div className="flex items-center">
                {/* <Link href="/" className="flex items-center">
                <span className="text-indigo-600 text-2xl font-bold">droip</span>
              </Link> */}

                <Image
                  src="/assets/navbar/logo.svg"
                  // alt={item.title}
                  alt='logo'
                  width={65}
                  height={65}
                  className="text-primary"
                />
              </div>

              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  <NavigationMenuItem>
                    <Link href="/" passHref>
                      <NavigationMenuLink className="text-base font-semibold text-gray-700 hover:text-gray-900">
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-base font-medium text-gray-700">
                      Product
                      {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
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
                    <NavigationMenuTrigger className="text-base font-medium text-gray-700">
                      Resources
                      {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
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
                    <NavigationMenuTrigger className="text-base font-medium text-gray-700">
                      Support
                      {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
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
                    <Link href="/pricing" passHref>
                      <NavigationMenuLink className="text-base font-medium text-gray-700 hover:text-gray-900">
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild className="text-base font-medium text-gray-700 hover:text-gray-900">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium px-4 py-2">
                <Link href="/get-started">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Logo - Always visible */}
          <div className="md:hidden">
            <Image
              src="/assets/navbar/logo.svg"
              // alt={item.title}
              alt='logo'
              width={50}
              height={50}
              className="text-primary"
            />
          </div>

          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative z-50 bg-white data-[state=open]:bg-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="w-full bg-white border-t h-screen"
            >
              <div className="flex flex-col p-6 h-full overflow-y-auto">
                <div className="md:hidden flex w-full items-center justify-between mb-8">
                  <Link href="/" className="flex items-center">
                    <span className="text-indigo-600 text-2xl font-bold">droip</span>
                  </Link>
                </div>
                <div className="space-y-6">
                  <Link
                    href="/"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Home
                  </Link>

                  <Collapsible className="border-b border-gray-100 pb-4">
                    <CollapsibleTrigger className="flex items-center w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="text-lg text-gray-900">Product</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                      {dropdownData.product.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 text-gray-600"
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
                  </Collapsible>

                  <Collapsible className="border-b border-gray-100 pb-4">
                    <CollapsibleTrigger className="flex items-center w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="text-lg text-gray-900">Resources</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                      {dropdownData.resources.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 text-gray-600"
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
                  </Collapsible>

                  <Collapsible className="border-b border-gray-100 pb-4">
                    <CollapsibleTrigger className="flex items-center w-full py-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="text-lg text-gray-900">Support</span>
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 pl-4 mt-4 transition-all duration-300 ease-in-out">
                      {dropdownData.support.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 text-gray-600"
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
                  </Collapsible>

                  <Link
                    href="/pricing"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Pricing
                  </Link>

                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-base font-medium px-4">
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </div>
  )
}

export default Navbar