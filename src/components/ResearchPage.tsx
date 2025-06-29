import React from 'react';
import ReactMarkdown from 'react-markdown';
import { researchContent } from '../research';

const ResearchPage: React.FC = () => {
  return (
    <section 
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(/resources/Background/bg-dark.jpg)`,
      }}
    >
      {/* Academic paper container with fixed height and internal scroll */}
      <div className="w-full max-w-7xl h-full flex items-center justify-center">
        {/* Paper-style content area with scrollable content */}
        <div className="bg-black/50 shadow-2xl lg:rounded-lg w-full h-full lg:max-w-[80vw] lg:h-[90vh] flex flex-col border-2 border-gray-700">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-16 py-12 research-content-selectable">
            <div className="prose prose-lg prose-invert max-w-none">
              <ReactMarkdown 
                components={{
                  h1: ({children}) => (
                    <h1 className="text-4xl font-cinzel text-white mb-8 text-center leading-tight border-b-2 border-gray-600 pb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({children}) => (
                    <h2 className="text-2xl font-roboto text-white mt-12 mb-6 font-bold">
                      {children}
                    </h2>
                  ),
                  h3: ({children}) => (
                    <h3 className="text-xl font-roboto text-gray-200 mt-8 mb-4 font-semibold">
                      {children}
                    </h3>
                  ),
                  p: ({children}) => (
                    <div className="text-gray-300 leading-relaxed mb-6 font-roboto text-base">
                      {children}
                    </div>
                  ),
                  ul: ({children}) => (
                    <ul className="list-disc list-outside ml-8 text-gray-300 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({children}) => (
                    <ol className="list-decimal list-outside ml-8 text-gray-300 mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({children}) => (
                    <li className="text-gray-300 font-roboto text-base leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-gray-600 pl-6 italic text-gray-400 mb-6 font-roboto">
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => (
                    <code className="bg-gray-800 px-2 py-1 rounded font-mono text-sm text-gray-200">
                      {children}
                    </code>
                  ),
                  pre: ({children}) => (
                    <pre className="bg-gray-800 p-6 rounded-lg overflow-x-auto mb-6 border border-gray-700">
                      {children}
                    </pre>
                  ),
                  table: ({children}) => (
                    <div className="overflow-x-auto mb-8 mt-6">
                      <table className="min-w-full border-collapse border-2 border-gray-600">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({children}) => (
                    <th className="border border-gray-600 px-6 py-3 text-left text-white font-roboto font-bold bg-gray-800">
                      {children}
                    </th>
                  ),
                  td: ({children}) => (
                    <td className="border border-gray-600 px-6 py-3 text-gray-300 font-roboto">
                      {children}
                    </td>
                  ),
                  strong: ({children}) => (
                    <strong className="text-white font-roboto font-bold">
                      {children}
                    </strong>
                  ),
                  em: ({children}) => (
                    <em className="text-gray-300 italic font-roboto">
                      {children}
                    </em>
                  ),
                  hr: () => (
                    <hr className="border-gray-600 my-8 border-t-2" />
                  ),
                  img: ({src, alt, ...props}) => (
                    <div className="my-8 flex justify-center pointer-events-auto">
                      <img 
                        src={src} 
                        alt={alt || 'Research figure'} 
                        className="max-w-full md:max-w-[75%] h-auto rounded-lg shadow-lg border border-gray-600"
                        {...props}
                      />
                    </div>
                  ),
                }}
              >
                {researchContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchPage; 