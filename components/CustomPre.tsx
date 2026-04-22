"use client";

import React, { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

export const CustomPre = ({ children, ...props }: any) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (preRef.current) {
      const text = preRef.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleCopy} title="Click to copy">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 dark:bg-white/10 p-2 rounded-md flex items-center justify-center">
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
      </div>
    </div>
  );
};
