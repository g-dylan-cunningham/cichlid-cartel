import { Poppins, Roboto_Mono, Rubik_Maze, Ubuntu } from "next/font/google";
import "./globals.css";

const poppins = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: "400",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: "500",
});

export const metadata = {
  title: "Cichlid Cartel",
  description: "The most beautiful peacocks, haps and african cichlids in AZ.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto_mono.variable}`}>
        <div className="text-gray-600">
          {children}
          </div>
      </body>
    </html>
  );
}
