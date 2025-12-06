import ReactMarkdown from 'react-markdown';

interface RichTextProps {
  content: string;
  className?: string;
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null;

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Custom component overrides for better styling
          h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-6" {...props} />,
          h2: ({ ...props }) => <h2 className="text-3xl font-bold mb-5 mt-8" {...props} />,
          h3: ({ ...props }) => <h3 className="text-2xl font-semibold mb-4 mt-6" {...props} />,
          p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          a: ({ ...props }) => (
            <a 
              className="text-brand-yellow-dark hover:text-brand underline" 
              target={props.href?.startsWith('http') ? '_blank' : undefined}
              rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props} 
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-brand pl-4 italic my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
