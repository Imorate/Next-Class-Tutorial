import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Next tutorial",
  description: "Next tutorial description",
};

const openSans = localFont({
  src: [
    {
      path: "../public/fonts/OpenSans-Regular.ttf",
      style: "normal",
      weight: "300",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
