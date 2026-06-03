"use client";

import { Check, Copy } from "lucide-react";
import { useState, useRef } from "react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onCopy = () => {
    const preElement = buttonRef.current?.closest(".code-block-wrapper")?.querySelector("pre");
    if (preElement) {
      navigator.clipboard.writeText(preElement.textContent || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-black/20 dark:bg-white/10 hover:bg-black/30 dark:hover:bg-white/20 text-gray-400 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
