import React from "react";

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
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  pre: (props: any) => {
    return (
      <div className="relative my-4 rounded-lg bg-[#0d1117] overflow-x-auto text-sm p-4">
        <pre {...props} className="font-mono bg-transparent m-0 p-0" />
      </div>
    );
  }
};
