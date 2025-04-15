"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const footerData = {
    social: {
        title: "Social",
        links: [
            {
                icon: <Facebook className="w-4 h-4" />,
                href: "#",
                label: "Facebook"
            },
            {
                icon: <Twitter className="w-4 h-4" />,
                href: "#",
                label: "Twitter"
            },
            {
                icon: <Linkedin className="w-4 h-4" />,
                href: "#",
                label: "LinkedIn"
            },
            {
                icon: <Youtube className="w-4 h-4" />,
                href: "#",
                label: "YouTube"
            },
        ]
    },
    product: {
        title: "Product",
        links: [
            { label: "Grid & Layouts", href: "#" },
            { label: "Typography", href: "#" },
            { label: "Media Manager", href: "#" },
            { label: "Form Builder", href: "#" },
            { label: "Pop-Up Builder", href: "#" },
            { label: "Interaction & Animations", href: "#" },
            { label: "Accessibility", href: "#" },
        ]
    },
    company: {
        title: "Company",
        links: [
            { label: "Affiliates", href: "#" },
            { label: "Terms & Privacy", href: "#" },
            { label: "Cookie", href: "#" },
        ]
    },
    resources: {
        title: "Resources",
        links: [
            { label: "Blog", href: "#" },
            { label: "Documentation", href: "#" },
            { label: "Release Notes", href: "#" },
        ]
    },
    support: {
        title: "Support",
        links: [
            { label: "Pricing", href: "#" },
            { label: "Contact Us", href: "#" },
        ]
    }
}

const Footer = () => {
    return (
        <footer className="w-full border-gray-200 bg-[#F5F5F7]">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Social Column - Hidden on mobile, shown first on desktop */}
                    <div className="hidden md:block md:w-[200px]">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {footerData.social.title}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {footerData.social.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    aria-label={link.label}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white text-gray-600 transition-colors"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Main Links Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {/* Product Column */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {footerData.product.title}
                                </h3>
                                <ul className="space-y-3">
                                    {footerData.product.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 hover:text-gray-900 text-base transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company Column */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {footerData.company.title}
                                </h3>
                                <ul className="space-y-3">
                                    {footerData.company.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 hover:text-gray-900 text-base transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources Column */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {footerData.resources.title}
                                </h3>
                                <ul className="space-y-3">
                                    {footerData.resources.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 hover:text-gray-900 text-base transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support Column */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {footerData.support.title}
                                </h3>
                                <ul className="space-y-3">
                                    {footerData.support.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-500 hover:text-gray-900 text-base transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Section - Shown only on mobile */}
                <div className="mt-12 md:hidden">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {footerData.social.title}
                    </h3>
                    <div className="flex gap-6">
                        {footerData.social.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                aria-label={link.label}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t-4 border-gray-300 py-4 mt-10">
                    <div className="container mx-auto px-4">
                        {/* Desktop layout - row */}
                        <div className="hidden md:flex flex-row justify-between items-center">
                            <p className="text-sm text-gray-500">
                                © 2025 Droip. All rights reserved
                            </p>

                            <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-2">A Product by</span>
                                <Image
                                    src="/assets/footer/themeum.svg"
                                    alt="Themeum"
                                    width={80}
                                    height={80}
                                    className="mr-1"
                                />
                            </div>

                            <div className="flex items-center">
                                <div className="flex items-center ml-4 bg-[#9353FF] rounded gap-1 pl-1 p-0.5">
                                    <Image
                                        src="/assets/footer/droip.svg"
                                        alt="Droip"
                                        width={10}
                                        height={10}
                                    />
                                    <span className="text-xs p-1 rounded text-[#551A8B] font-medium bg-white">Made in Droip</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile layout - column */}
                        <div className="flex md:hidden flex-col items-start md:items-center space-y-4">
                            {/* Themeum logo group */}
                            <div className="flex items-center">
                                <Image
                                    src="/assets/footer/themeum.svg"
                                    alt="Themeum"
                                    width={80}
                                    height={80}
                                    className="mr-1"
                                />
                                <span className="text-sm text-gray-500 ml-2">A Product by</span>
                            </div>

                            {/* Made in Droip badge */}
                            <div className="bg-[#9353FF] rounded gap-1 pl-1 p-0.5 flex items-center">
                                <Image
                                    src="/assets/footer/droip.svg"
                                    alt="Droip"
                                    width={10}
                                    height={10}
                                />
                                <span className="text-xs p-1 rounded text-[#551A8B] font-medium bg-white">Made in Droip</span>
                            </div>

                            {/* Copyright text */}
                            <p className="text-sm text-gray-500">
                                © 2025 Droip. All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer 