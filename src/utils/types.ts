import { StaticImageData } from "next/image";

export type Feature = {
  id: number;
  title: string;
  description: string;
  image: string;
  viewDetails?: Boolean;
};

type CardContentProps = {
  title: string;
  description: string;
  icon: any | null;
  titleStyle?: string;
  descriptionStyle?: string;
  iconStyle?: string;
  containerStyle?: string;
  textContainerStyle?: string;
  className?: string;
};

export interface ScaleBusinessContentCardProps {
  title: string;
  image: StaticImageData;
  description: string;
  link?: string;
}
