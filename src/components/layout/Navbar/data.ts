import { DropdownData } from "./types";

export const dropdownData: Record<string, DropdownData> = {
  product: {
    type: "product",
    items: [
      {
        icon: "📝",
        title: "Editor",
        description: "Effective Visual Builder",
      },
      {
        icon: "📊",
        title: "Grids & Layouts",
        description: "Structure more easily",
      },
      {
        icon: "Aa",
        title: "Typography",
        description: "Customize your branding",
      },
      {
        icon: "📋",
        title: "Form Builder",
        description: "Design any web forms",
      },
      {
        icon: "💫",
        title: "Pop-up Builder",
        description: "Build pop-ups visually",
      },
      {
        icon: "📁",
        title: "Content Manager",
        description: "Centralized dynamic content management",
      },
      {
        icon: "🎯",
        title: "Interaction & Animation",
        description: "Design interactive websites",
      },
      {
        icon: "🖼️",
        title: "Media Manager",
        description: "Manage & edit site assets",
      },
      {
        icon: "🔍",
        title: "SEO",
        description: "Optimize your SEO workflow",
      },
      {
        icon: "♿",
        title: "Accessibility",
        description: "Accessible to everyone",
      },
      {
        icon: "🎨",
        title: "Figma to Droip",
        description: "Turn static design into live websites",
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
      },
      {
        icon: "📄",
        title: "Documentation",
        description: "Learn from documentation",
      },
      {
        icon: "🔄",
        title: "Release Notes",
        description: "Check what's new",
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
      },
      {
        icon: "✨",
        title: "Feature Request",
        description: "Let us know what's missing",
      },
      {
        icon: "📞",
        title: "Contact",
        description: "Contact for query",
      },
    ],
  },
};
