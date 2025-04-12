import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import { Container } from './Container';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full">
        <Container>
          <main className="pt-[72px] w-full">{children}</main>
        </Container>
      </div>
    </>
  );
};

export default Layout;

