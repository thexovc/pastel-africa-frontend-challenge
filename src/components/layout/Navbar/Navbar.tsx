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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { dropdownData } from './data'
import { ListItem } from './DropdownMenu'

const Navbar = () => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md z-50 fixed top-0">
      <div className="w-full max-w-[1600px] mx-auto px-6">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Left section with logo */}
          <div className="hidden md:flex items-center space-x-20">
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
                  <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out">
                    <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
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
                  <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out">
                    <div className="w-[300px] p-4">
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
                  <NavigationMenuContent className="animate-in slide-in-from-top-2 duration-300 ease-out">
                    <div className="w-[300px] p-4">
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

          {/* Right section with auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-base font-medium text-gray-600">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary text-white rounded-lg text-base font-medium px-4">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium">Home</Link>
                <Link href="/product" className="text-lg font-medium">Product</Link>
                <Link href="/resources" className="text-lg font-medium">Resources</Link>
                <Link href="/support" className="text-lg font-medium">Support</Link>
                <Link href="/pricing" className="text-lg font-medium">Pricing</Link>
                <Link href="/login" className="text-lg font-medium">Login</Link>
                <Button asChild className="bg-[#5641F3] hover:bg-[#4634D9] text-white">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </div>
  )
}

export default Navbar




