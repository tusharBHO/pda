// app/(routes)/chatBot/page.jsx
import { useEffect } from "react";
import Script from "next/script";
import { toast } from "sonner";

export default function ChatPage() {
  useEffect(() => {
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

  const handleScriptLoad = () => {
    toast.success("Chatbot loaded successfully!");
  };

  const handleScriptError = () => {
    toast.error("Failed to load chatbot. Please try again later.");
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <pre className="text-gray-500">
          Loading chatbot... Currently in development phase!
        </pre>
      </div>

      <Script
        id="chatbase-fullscreen"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      >
        {`
          (function(){
            if(!window.chatbase || window.chatbase("getState")!=="initialized"){
                window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};
                window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q} return(...args)=>target(prop,...args)}});
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
    </>
  );
}