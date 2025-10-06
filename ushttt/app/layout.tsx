import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USHTTT - Ultimate/Super/Hyper Tic Tac Toe",
  description: "Play UTTT/STTT/HTTT in your browser with timers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div id="app-root">{children}</div>
      </body>
    </html>
  );
}
