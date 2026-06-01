import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import React from "react";
import { CustomPre } from "./CustomPre";

const createHeading = (Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const Heading = ({ children, id, ...props }: any) => {
    return (
      <Tag id={id} className={`group relative font-bold ${props.className || ''}`} {...props}>
        {id && (
          <a
             href={`#${id}`}
             className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 transition-opacity hover:text-accent group-hover:opacity-100 !no-underline !text-xl"
             aria-hidden="true"
             tabIndex={-1}
          >
             #
          </a>
        )}
        {children}
      </Tag>
    );
  };
  Heading.displayName = Tag;
  return Heading;
};

interface AlertProps {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

const Alert = ({ type = "info", title, children }: AlertProps) => {
  const styles = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-500/20",
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      text: "text-blue-900 dark:text-blue-200",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-500/10",
      border: "border-yellow-200 dark:border-yellow-500/20",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      text: "text-yellow-900 dark:text-yellow-200",
    },
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/20",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      text: "text-emerald-900 dark:text-emerald-200",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-500/10",
      border: "border-red-200 dark:border-red-500/20",
      icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
      text: "text-red-900 dark:text-red-200",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border p-4 ${style.bg} ${style.border}`}
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
  pre: CustomPre,
  h1: createHeading('h1'),
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
};
