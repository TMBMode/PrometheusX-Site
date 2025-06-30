import React from 'react';

const ProjectPage: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full py-20 flex items-center">
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-8 landscape:w-[71.8%] landscape:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            The PrometheusX Project
          </h2>
        </div>
        
        <div className="space-y-8 md:space-y-12 mb-4 portrait:mb-16">
          <div className="text-gray-300 leading-relaxed text-sm lg:text-base font-neue-montreal space-y-4 md:space-y-6 lg:space-y-8">
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
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;