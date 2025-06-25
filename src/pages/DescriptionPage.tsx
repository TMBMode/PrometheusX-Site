import React from 'react';

const DescriptionPage: React.FC = () => {
  const descriptions = [
    {
      title: "Lorem Ipsum Dolor Sit Amet 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Consectetur Adipiscing Elit 2",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Sed Do Eiusmod Tempor 3",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Excepteur Sint Occaecat 4",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "Sunt In Culpa Qui Officia 5",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    }
  ];

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-black to-gray-900 py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white mb-6">
            Lorem Ipsum Headline
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-saol-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {descriptions.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-gray-900/20 backdrop-blur-sm rounded-lg p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:bg-gray-900/30"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-white/20 group-hover:bg-white/40 transition-colors duration-300"></div>
                  <h3 className="text-base sm:text-lg md:text-xl font-neue-montreal text-white/90 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-saol-light group-hover:text-gray-300 transition-colors duration-300">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DescriptionPage;