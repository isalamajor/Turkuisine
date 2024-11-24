import "./globals.css";

export const metadata = {
  title: "Turkuisine",
  description: "Turkish dishes you should try",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
