import { DropdownData } from "./types";

export const dropdownData: Record<string, DropdownData> = {
  product: {
    type: "product",
    items: [
      {
        icon: "📝",
        title: "Editor",
        description: "Effective Visual Builder",
        href: "/product/editor"
      },
      {
        icon: "📊",
        title: "Grids & Layouts",
        description: "Structure more easily",
        href: "/product/grids-and-layouts"
      },
      {
        icon: "Aa",
        title: "Typography",
        description: "Customize your branding",
        href: "/product/typography"
      },
      {
        icon: "📋",
        title: "Form Builder",
        description: "Design any web forms",
        href: "/product/form-builder"
      },
      {
        icon: "💫",
        title: "Pop-up Builder",
        description: "Build pop-ups visually",
        href: "/product/pop-up-builder"
      },
      {
        icon: "📁",
        title: "Content Manager",
        description: "Centralized dynamic content management",
        href: "/product/content-manager"
      },
      {
        icon: "🎯",
        title: "Interaction & Animation",
        description: "Design interactive websites",
        href: "/product/interaction-and-animation"
      },
      {
        icon: "🖼️",
        title: "Media Manager",
        description: "Manage & edit site assets",
        href: "/product/media-manager"
      },
      {
        icon: "🔍",
        title: "SEO",
        description: "Optimize your SEO workflow",
        href: "/product/seo"
      },
      {
        icon: "♿",
        title: "Accessibility",
        description: "Accessible to everyone",
        href: "/product/accessibility"
      },
      {
        icon: "🎨",
        title: "Figma to Droip",
        description: "Turn static design into live websites",
        href: "/product/figma-to-droip"
      },
    ],
  },
  resources: {
    type: "resources",
    items: [
      {
        icon: "📚",
        title: "Droip Blogs",
        description: "Explore what's happening",
        href: "/resources/droip-blogs"
      },
      {
        icon: "📄",
        title: "Documentation",
        description: "Learn from documentation",
        href: "/resources/documentation"
      },
      {
        icon: "🔄",
        title: "Release Notes",
        description: "Check what's new",
        href: "/resources/release-notes"
      },
    ],
  },
  support: {
    type: "support",
    items: [
      {
        icon: "💬",
        title: "Get Support",
        description: "Fix your issues with our experts",
        href: "/support/get-support"
      },
      {
        icon: "✨",
        title: "Feature Request",
        description: "Let us know what's missing",
        href: "/support/feature-request"
      },
      {
        icon: "📞",
        title: "Contact",
        description: "Contact for query",
        href: "/support/contact"
      },
    ],
  },
};
