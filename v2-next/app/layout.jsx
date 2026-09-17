import "./globals.css";
import CursorStar from "@/components/CursorStar";
import ThemeToggle from "@/components/ThemeToggle";

// Applique le thème avant le premier rendu (évite le flash).
const themeInit = `(function(){try{var t=localStorage.getItem('theme_pref_v1')||'sombre';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

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
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        {children}
        <ThemeToggle />
        <CursorStar />
      </body>
    </html>
  );
}
