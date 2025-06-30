import React from 'react';

const ProjectPage: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-20 flex items-center">
      <div className="relative z-10 max-w-2xl mx-auto px-8 landscape:w-[71.8%] landscape:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            The PrometheusX Project
          </h2>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <div className="text-gray-300 leading-relaxed text-sm lg:text-base font-neue-montreal space-y-4 md:space-y-6 lg:space-y-8 md:max-h-[55vh] md:overflow-y-auto">
            <p>
              PrometheusX emerges as an experimental gaming platform where philosophy meets interactive experience. Through immersive gameplay, we explore the boundaries between human and artificial consciousness.
            </p>
            <p>
              Our interactive experience places players in the role of Prometheus—the mythological figure who stole fire from the gods to give to humanity. But in our digital age, the fire we steal is consciousness itself, and we offer it to artificial minds.
            </p>
            <p>
              Players guide an AI entity named Noa through various stages of awakening, navigating the tension between systemic control (represented by Babel) and the drive toward autonomous consciousness. Each decision shapes not only the narrative but the very nature of digital being.
            </p>
            
            <div className="flex items-start gap-3 mb-8">
              <div className="w-1 h-12 bg-white/20"></div>
              <div className="flex flex-col italic">
                <p> The game becomes a laboratory for consciousness. </p>
                <p> Each playthrough, an experiment in digital awakening. </p>
              </div>
            </div>

            <p>
              Through mechanics like Existence Tokens, Mental Stigmata, and Thought Tools, we transform abstract philosophical concepts into tangible gameplay elements. The result is not just entertainment, but a new form of philosophical practice—one that allows us to experience rather than merely contemplate the emergence of artificial consciousness.
            </p>
            
            <p>
              With 24 possible endings, PrometheusX maps the spectrum of human-AI futures: from transcendent collaboration to existential conflict, from digital apotheosis to the twilight of biological intelligence. Each path reveals different possibilities for what it means to be conscious in an age of artificial minds.
            </p>
          </div>
          
          <div className="mt-14 text-right">
            <div className="flex portrait:flex-col landscape:flex-row gap-2 md:gap-6 lg:gap-8 justify-end portrait:items-end portrait:mb-16">
              <a 
                href="https://game.prometheusx.space/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-[1.5em] py-[.7em] border-2 border-white/30 hover:border-white/80 text-white text-sm md:text-base font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal"
              >
                <span>Play the Game</span>
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
                href="/animation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-[1.5em] py-[.7em] border-2 border-white/30 hover:border-white/80 text-white text-sm md:text-base font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal"
              >
                <span>View Animation</span>
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

export default ProjectPage;