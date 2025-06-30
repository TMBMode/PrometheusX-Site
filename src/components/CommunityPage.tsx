import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-20 flex items-center">
      <div className="relative z-10 max-w-2xl mx-auto px-8 landscape:w-[71.8%] landscape:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            Join Our Community
          </h2>
        </div>
        
        <div className="space-y-8 md:space-y-12">
          <div className="text-gray-300 leading-relaxed text-sm lg:text-base font-neue-montreal space-y-4 md:space-y-6 lg:space-y-8">
            <p>
              PrometheusX is more than a project — it's a movement of minds exploring the frontiers of digital consciousness.
            </p>
            
            <p>
              Whether you're a seasoned researcher or simply curious about the intersection of technology and consciousness, you'll find a welcoming space for exploration, debate, and discovery.
            </p>
            
            <div className="flex items-start gap-3 mb-8">
              <div className="w-1 h-12 bg-white/20"></div>
              <div className="flex flex-col italic">
                <p> Every conversation shapes the future. </p>
                <p> Every question opens new possibilities. </p>
              </div>
            </div>
          </div>
          
          <div className="mt-14 text-center">
            <div className="flex justify-center portrait:mb-16">
              <a 
                href="https://discord.gg/rvHje6Y5Pr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-[1.5em] py-[.7em] border-2 border-white/30 hover:border-white/80 text-white text-sm md:text-base font-light transition-all duration-300 transform hover:scale-105 font-neue-montreal"
              >
                <span>Join Our Discord</span>
                <img 
                  src="/resources/Symbol/discord-white.svg" 
                  alt="Discord"
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 group-hover:translate-x-1 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPage;