interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-[1600px] mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}

