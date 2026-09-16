import "./globals.css";
import CursorStar from "@/components/CursorStar";

export const metadata = {
  title: "Pour toi, un espace à nous",
  description: "Notre monde, rien qu'à nous.",
  robots: { index: false, follow: false }
};

export const viewport = {
  themeColor: "#0b0a16",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Nunito+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <CursorStar />
      </body>
    </html>
  );
}
