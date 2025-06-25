import React from 'react';

const VideoPage: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black to-gray-900">
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <div className="max-w-6xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-white">
              Experience the Vision
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto font-saol-light">
              Dive into the immersive world of PrometheusX through our featured presentation
            </p>
          </div>
          
          {/* YouTube Video */}
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ" 
                title="Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
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