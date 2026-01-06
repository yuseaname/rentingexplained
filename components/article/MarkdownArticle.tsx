import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownArticle({ markdown }: { markdown: string }) {
  const hasHtmlBlocks = /<h1|<h2|<h3|<p|<ul|<ol|<section/i.test(markdown);

  if (hasHtmlBlocks) {
    // Render trusted HTML content directly so headings/paragraphs are not flattened.
    return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
