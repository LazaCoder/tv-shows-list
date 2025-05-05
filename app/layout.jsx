import "./globals.css";
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
