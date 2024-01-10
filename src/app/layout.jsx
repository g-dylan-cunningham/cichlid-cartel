
import { Poppins, Roboto_Mono, Rubik_Maze, Ubuntu } from 'next/font/google';
import Providers from '@/app/providers';

import './globals.css';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

const poppins = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: '400',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: '500',
});

export const metadata = {
  title: 'Cichlid Cartel',
  description: 'The most beautiful peacocks, haps and african cichlids in AZ.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{fontFamily: '"Gill Sans Extrabold", sans-serif' }} className={`${poppins.variable} ${roboto_mono.variable}`}>
        <Providers>
          <NavBar/>
          <div className='text-gray-600'>{children}</div>
          <Footer />
        </Providers>
        
      </body>
    </html>
  );
}
