import ReactMarkdown from "react-markdown";
import { terms } from "./terms";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <ReactMarkdown className="markdown prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        {terms}
      </ReactMarkdown>
    </div>
  );
}
