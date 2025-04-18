import { scaleBusinessImages } from "../../../public/assets/scaleBusiness";
import { ScaleBusinessContentCardProps } from "../../utils/types";

export const scaleBusinessContentCards: (ScaleBusinessContentCardProps & {
  id: number;
})[] = [
  {
    id: 1,
    title: "Content Manager",
    description:
      "Handle dynamic data with the built-in content manager. Link data dynamically to any part of your website.",
    image: scaleBusinessImages.scale_image_1,
  },
  {
    id: 2,
    title: "Media Manager",
    description:
      "Organize and edit all media assets, including SVGs, Lottie, and icons, with the built-in image and shape editor.",
    image: scaleBusinessImages.scale_image_2,
  },
  {
    id: 3,
    title: "SEO",
    description:
      "Dynamically update SEO content across pages to optimize your website's search performance.",
    image: scaleBusinessImages.scale_image_3,
  },
];
