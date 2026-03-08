import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import React from "react";

interface AlertProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

const Alert = ({ type = "info", title, children }: AlertProps) => {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: <Info className="h-5 w-5 text-blue-400" />,
      text: "text-blue-200",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      text: "text-yellow-200",
    },
    success: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      text: "text-emerald-200",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      text: "text-red-200",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border p-4 backdrop-blur-sm ${style.bg} ${style.border}`}
    >
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div className={`prose-sm ${style.text}`}>
        {title && (
          <h5 className={`mb-1 font-semibold ${style.text}`}>{title}</h5>
        )}
        <div className="[&>p]:m-0">{children}</div>
      </div>
    </div>
  );
};

export const components = {
  Alert,
  // We can add more custom components here
};
