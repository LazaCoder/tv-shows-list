import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Header from "./components/Header/Header";

export const metadata = {
  title: "Showmania",
  description: "Browse your favorite tv shows",
  icon: "/movieIcon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
