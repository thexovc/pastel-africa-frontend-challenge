"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ListItemProps {
  title: string
  description: string
  icon: string
  href: string
}

export function ListItem({ title, description, icon, href }: ListItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-light-primary hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Image
            src={icon}
            alt={`${title} icon`}
            width={24}
            height={24}
            className="text-primary"
          />
        </div>
        <div>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}


