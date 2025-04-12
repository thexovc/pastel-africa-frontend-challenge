import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default Layout;