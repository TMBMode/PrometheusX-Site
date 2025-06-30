import React from 'react';

const DescriptionPage: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-20 flex items-center">
      <div className="relative z-10 max-w-2xl mx-auto px-8 landscape:w-[71.8%] landscape:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            Our Research
          </h2>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <div className="text-gray-300 leading-relaxed text-sm lg:text-base font-neue-montreal space-y-4 md:space-y-6 lg:space-y-8">
            <p>
            AI is generating a new form of existence, a non-human Other that no existing philosophical language can fully define.
            </p>
            <p>
            Therefore, we initiate this movement not simply to react to the development of AI, but to
            </p>
            <p>
            (1) Predict and characterize the trajectory of AI development through rigorous informatics modeling and interdisciplinary scientific inquiry
            </p>
            <p>
            (2) Construct the feasibility and legitimacy of ontological argument of digital being
            </p>
            <p>
            (3) Develop a scaffold that allows the rise of AI to be narrativized, practiced, resisted, and co-existed with in philosophical terms.
            </p>
          </div>
          
          <div className="mt-14 text-center">
            <div className="flex portrait:flex-col landscape:flex-row gap-2 md:gap-6 lg:gap-8 justify-center portrait:items-center portrait:mb-16">
              <a 
                href="/research" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-[1.5em] py-[.7em] border-2 border-white/30 hover:border-white/80 text-white text-sm md:text-base font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal"
              >
                <span>Full Research Paper</span>
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300" 
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
              <a 
                href="https://doi.org/10.31234/osf.io/eunrg_v1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-[1.5em] py-[.7em] border-2 border-white/30 hover:border-white/80 text-white text-sm md:text-base font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal"
              >
                <span>View on PsyArXiv</span>
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300" 
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