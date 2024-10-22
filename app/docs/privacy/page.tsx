import ReactMarkdown from "react-markdown";
import { privacy } from "./privacy";

export default function Privacy() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <ReactMarkdown className="markdown prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        {privacy}
      </ReactMarkdown>
    </div>
  );
}
