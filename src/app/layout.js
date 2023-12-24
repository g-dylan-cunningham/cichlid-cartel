import { Poppins, Roboto_Mono, Rubik_Maze, Ubuntu } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

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

const NavBar = ({}) => {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
          >
            <li>
              <Link href='/'>Fish</Link>
              <ul className='p-2'>
                <li>
                  <Link href='/'>Peacocks</Link>
                </li>
                <li>
                  <Link href='/'>Haps</Link>
                </li>
                <li>
                  <Link href='/'>Other</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href='/'>Ordering</Link>
            </li>
            <li>
              <Link href='/'>About</Link>
            </li>
          </ul>
        </div>
        <Link href='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link href='/'>Item 1</Link>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className='p-2'>
                <li>
                  <Link href='/'>Submenu 1</Link>
                </li>
                <li>
                  <Link href='/'>Submenu 2</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href='/'>Item 3</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <Link href='/' className='btn'>
          Button
        </Link>
      </div>
    </div>
  );
};
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${roboto_mono.variable}`}>
        <NavBar />
        <div className='text-gray-600'>{children}</div>
      </body>
    </html>
  );
}
