import React from 'react';

const VideoPage: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <div className="max-w-6xl w-full landscape:w-[61.8%] space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white">
              Experience the Vision
            </h2>
          </div>
          
          {/* YouTube Video */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                src="https://www.youtube.com/embed/LGoBAdnThBM"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                title="PrometheusX – Official Concept Trailer | The Future Is Awake
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPage;