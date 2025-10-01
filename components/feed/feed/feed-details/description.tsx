import * as React from "react";

interface DescriptionProps {
  text: string | undefined;
}

export function Description({ text }: DescriptionProps) {
  const [expanded, setExpanded] = React.useState(false);

  const isLong = (text?.length ?? 0) > 100;
  const displayedText =
    !isLong || expanded ? text : text?.slice(0, 100) + " ...";

  // Replace \n with <br /> for HTML rendering
  const htmlText = (displayedText ?? "").replace(/\n/g, "<br />");

  return (
    <p>
      <p className="text-[#666]">
        <span
          className="text-[#666]"
          dangerouslySetInnerHTML={{ __html: htmlText }}
        />
        {isLong && !expanded && (
          <button
            type="button"
            className="ml-1 text-primary underline hover:opacity-80"
            onClick={() => setExpanded(true)}
          >
            Show More
          </button>
        )}
      </p>
    </p>
  );
}

export default Description;
