import Image from "next/image";
import React from "react";

interface CardProps {
  title: string | React.ReactNode;
  description: string;
  icon?: string;
  titleStyle?: string;
  descriptionStyle?: string;
  iconStyle?: string;
  containerStyle?: string;
  textContainerStyle?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  titleStyle,
  descriptionStyle,
  iconStyle,
  containerStyle,
  textContainerStyle,
  className,
}) => {
  return (
    <div className={`flex items-end justify-center bg-[#FFFFFF] rounded-[18px] ${className || ''}`}>
      <div className={`flex flex-col gap-10 p-10 w-full ${containerStyle || ''}`}>
        {icon && (
          <Image
            src={icon}
            alt="Icon"
            quality={100}
            className={`w-8 h-8 ${iconStyle || ''}`}
          />
        )}

        <div className={`flex flex-col gap-4 text-xl ${textContainerStyle || ''}`}>
          {React.isValidElement(title) ? (
            title
          ) : (
            <h2 className={`font-semibold text-2xl ${titleStyle || ''}`}>
              {title}
            </h2>
          )}

          <p className={`text-black/70 ${descriptionStyle || ''}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;