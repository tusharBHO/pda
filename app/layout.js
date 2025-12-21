// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Toaster } from "sonner";
import LoginToastListener from "./components/LoginToastListener"; // ✅ add this
import OfflineBanner from "./components/OfflineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PDA",
  description: "Your app description here",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <OfflineBanner />

          {/* Global Toast Container */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            theme="system"
            duration={3500}
          />

          {/* ✅ Login Toast (Client Component) */}
          <LoginToastListener />

          <main className="pt-0">{children}</main>

          {/* Chatbase Chatbot */}
          <Script id="chatbase-embed" strategy="afterInteractive">
            {`
              (function(){
                if(!window.chatbase || window.chatbase("getState")!=="initialized"){
                    window.chatbase=(...arguments)=>{
                        if(!window.chatbase.q){window.chatbase.q=[]}
                        window.chatbase.q.push(arguments)
                    };
                    window.chatbase=new Proxy(window.chatbase,{
                        get(target,prop){
                            if(prop==="q"){return target.q}
                            return(...args)=>target(prop,...args)
                        }
                    })
                }
                const onLoad=function(){
                    const script=document.createElement("script");
                    script.src="https://www.chatbase.co/embed.min.js";
                    script.id="KKjy5Lt7pnxwB8ep0FhFd";
                    script.domain="www.chatbase.co";
                    document.body.appendChild(script)
                };
                if(document.readyState==="complete"){onLoad()}
                else{window.addEventListener("load",onLoad)}
              })();
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}