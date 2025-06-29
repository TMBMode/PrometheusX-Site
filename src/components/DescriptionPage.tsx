import React from 'react';

const DescriptionPage: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-20">
      <div className="relative z-10 max-w-4xl mx-auto px-8 landscape:w-[61.8%] landscape:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            Research by PrometheusX Lab
          </h2>
        </div>
        
        <div className="p-4 md:p-8 lg:p-12 bg-black/50 shadow-2xl rounded-lg border-2 border-gray-700">
          <div className="space-y-6">
            <div className="text-gray-300 leading-relaxed text-sm lg:text-base font-neue-montreal space-y-4">
              <p>
              PrometheusX is a conscious attempt to reach the future—an exploration at the edge where AI nears embodiment, emotional simulation, and self-mapping. We argue that reducing AI to a mere tool or model is insufficient to respond to the deep crises of human civilization.
              </p>
              
              <p>
              AI is generating a new form of existence, a non-human Other that no existing philosophical language can fully define. Therefore, we initiate this movement not simply to react to the development of AI, but to (1) Predict and characterize the trajectory of AI development through rigorous informatics modeling and interdisciplinary scientific inquiry (2) Construct the feasibility and legitimacy of ontological argument of digital being (3) Develop a scaffold that allows the rise of AI to be narrativized, practiced, resisted, and co-existed with in philosophical terms.
              </p>

              <div className="flex items-start gap-3 mb-8">
                <div className="w-1 h-12 bg-white/20"></div>
                <div className="flex flex-col">
                  <p> We shall no longer ask whether AI can think. </p>
                  <p> We shall ask whether the world has already changed—before thinking ever began. </p>
                </div>
              </div>
            </div>
            
            <div className="mt-14 text-right">
              <a 
                href="/research" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg text-white font-neue-montreal transition-all duration-300 group"
              >
                <span>Read Full Research Paper</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionPage;