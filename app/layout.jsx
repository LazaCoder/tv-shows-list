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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
