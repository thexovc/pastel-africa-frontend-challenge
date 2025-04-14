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
                <div className="mt-12 pt-8 border-t-4 border-gray-300">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-lg text-gray-500">
                            © 2025 Droip. All rights reserved
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <Image
                                    src="/assets/themeum-logo.svg"
                                    alt="Themeum"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                <span className="text-lg text-gray-500">A Product by</span>
                            </div>
                            <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-purple-50 rounded-full">
                                <Image
                                    src="/assets/droip-icon.svg"
                                    alt="Droip"
                                    width={16}
                                    height={16}
                                />
                                <span className="text-lg text-purple-600">Made in Droip</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer 