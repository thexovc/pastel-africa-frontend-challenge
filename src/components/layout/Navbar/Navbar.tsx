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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, ChevronDown, X } from "lucide-react"
import { dropdownData } from './data'
import { ListItem } from './DropdownMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const Navbar = () => {
  return (
    <div className="w-full bg-white z-50 fixed top-0">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo - visible on all screens */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/navbar/logo.svg"
                alt="Droip Logo"
                width={64}
                height={26}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-20">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link href="/" passHref>
                    <NavigationMenuLink className="text-base font-semibold text-gray-600 hover:text-gray-900 px-3 py-2">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium text-gray-600">
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
                  <NavigationMenuTrigger className="text-base font-medium text-gray-600">
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
                  <NavigationMenuTrigger className="text-base font-medium text-gray-600">
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
                  <Link href="/pricing" passHref>
                    <NavigationMenuLink className="text-base font-medium text-gray-600 hover:text-gray-900 px-3 py-2">
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-base font-medium text-gray-600">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary text-white rounded-lg text-base font-medium px-4">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full mt-[72px] bg-white border-t h-[calc(100vh-72px)]"
            >
              <div className="flex flex-col p-6 h-full overflow-y-auto">
                <div className="space-y-6">
                  <Link
                    href="/"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Home
                  </Link>

                  <Collapsible className="border-b border-gray-100 pb-4">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
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

                  <Link
                    href="/resources"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Resources
                  </Link>

                  <Link
                    href="/support"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Support
                  </Link>

                  <Link
                    href="/pricing"
                    className="block text-lg text-gray-900 border-b border-gray-100 pb-4"
                  >
                    Pricing
                  </Link>
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









