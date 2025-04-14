import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import { Container } from './Container';
import Footer from './Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-[#F5F5F7]">
        <Container>
          <main className="pt-[72px] w-full">{children}</main>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

