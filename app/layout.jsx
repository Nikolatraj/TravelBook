import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import I18nProvider from './components/I18nProvider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Travelbook",
  description: "My travelbook app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className} suppressHydrationWarning>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}