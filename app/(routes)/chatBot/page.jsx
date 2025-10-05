"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ChatPage() {
    useEffect(() => {
        // Optional: remove floating styles if Chatbase adds any
        const style = document.createElement("style");
        style.innerHTML = `
      iframe#chatbase-iframe {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 9999 !important;
        border: none !important;
      }
    `;
        document.head.appendChild(style);
    }, []);

    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center">
                <pre className="text-gray-500">Loading chatbot...
                    Currently in development phase!
                </pre>
            </div>

            <Script id="chatbase-fullscreen" strategy="afterInteractive">
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
                script.id="KKjy5Lt7pnxwB8ep0FhFd"; // your teammate’s bot ID
                script.domain="www.chatbase.co";
                document.body.appendChild(script)
            };
            if(document.readyState==="complete"){onLoad()}
            else{window.addEventListener("load",onLoad)}
          })();
        `}
            </Script>
        </>
    );
}
