import React from "react";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function Aviso({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'error', title?: string, children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500 text-blue-900 dark:text-blue-200',
    warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-900 dark:text-yellow-200',
    success: 'bg-green-500/10 border-green-500 text-green-900 dark:text-green-200',
    error: 'bg-red-500/10 border-red-500 text-red-900 dark:text-red-200'
  };

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />
  };

  return (
    <div className={`flex gap-3 p-4 my-6 border-l-4 rounded-r-lg ${styles[type]}`}>
      <div className="shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div>
        {title && <div className="font-bold mb-1">{title}</div>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
