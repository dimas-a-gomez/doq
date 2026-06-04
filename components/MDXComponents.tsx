import React from "react";
import { CopyButton } from "./CopyButton";

import { Aviso } from "./mdx/Aviso";
import { Boton } from "./mdx/Boton";
import { EnlacePagina } from "./mdx/EnlacePagina";
import { Columnas, Col } from "./mdx/Columnas";
import { Badge } from "./mdx/Badge";

const createHeading = (Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
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

export const components = {
  Badge,
  Aviso,
  Boton,
  EnlacePagina,
  Columnas,
  Col,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  table: (props: any) => <div className="overflow-x-auto my-8 rounded-xl border border-black/10 dark:border-white/10"><table className="w-full border-collapse text-left text-sm" {...props} /></div>,
  thead: (props: any) => <thead className="bg-[#F0F0F0] dark:bg-[#262626]" {...props} />,
  th: (props: any) => <th className="p-4 font-bold border-b border-black/10 dark:border-white/10" {...props} />,
  tr: (props: any) => <tr className="border-b border-black/5 dark:border-white/5 last:border-b-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" {...props} />,
  td: (props: any) => <td className="p-4" {...props} />,
  pre: (props: any) => {
    return (
      <div className="relative my-4 rounded-lg bg-[#F0F0F0] dark:bg-[#262626] code-block-wrapper text-sm group">
        <CopyButton />
        <div className="overflow-x-auto p-4">
          <pre {...props} className="font-mono bg-transparent m-0 p-0 !bg-transparent" />
        </div>
      </div>
    );
  }
};
