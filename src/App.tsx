import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Download, Play } from 'lucide-react';
import { useTypewriter } from './hooks/useTypewriter';
import { Helmet } from 'react-helmet-async';
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string; // Add URL to interface
  video?: string;  // Optional video URL
  buttonText?: string; // Add optional button text
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [isActive, setIsActive] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
            setIsActive(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsActive(!isActive);
      if (videoRef.current) {
        if (!isActive) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsActive(true);
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsActive(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ scale: 1.02 }}
      className="rounded-lg flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative rounded-lg overflow-hidden mb-4 cursor-pointer"
        onClick={handleInteraction}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full transition-opacity duration-500 ${
            isActive && isVideoLoaded && project.video ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {project.video && (
          <>
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isActive && isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              playsInline
              preload="auto"
              onCanPlay={() => setIsVideoLoaded(true)}
            >
              <source src={project.video} type="video/mp4" />
            </video>
            {isMobile && project.video && !isActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
                <Play 
                  className="w-12 h-12 text-white opacity-75" 
                  strokeWidth={1.5}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-2">{project.description}</p>
        <motion.a
          href={project.url}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-2 bg-white text-black rounded-md text-sm font-medium w-fit"
        >
          {project.buttonText || 'Learn More'}
        </motion.a>
      </div>
    </motion.div>
  );
};

function App() {
  const typedText = useTypewriter(
    ['Software Engineer', 'Data Scientist', 'University Student'],
    50,
    25,
    1000
  );

  const mobileProjects: Project[] = [
    {
      id: '1',
      title: 'Dlicio',
      description: 'Tiktok meets Uber Eats. A social food delivery app.',
      image: 'images/DelicioPic.png',
      video: 'images/DelicioVid.mp4',  
      url: 'https://dlicio.com',
      buttonText: 'Visit App'
    },
    {
      id: '2',
      title: 'FlyBy AI',
      description: 'Upskilling from your phone. an AI-powered learning platform.',
      image: 'images/FlyBy_Pic.png',
      url: '',
      buttonText: 'Coming Soon'
    }
  ];

  const desktopProjects: Project[] = [
    {
      id: '3',
      title: 'Carleton Scheduler',
      description: 'A Study Scheduler app for Carleton University',
      image: '/images/CarletonApp_Pic.png',
      url: 'https://github.com/Mikop22/CarletonStudy',
      buttonText: 'See Code'
    },
  ];

  const experiences = [
    {
      company: "To Be Determined",
      role: "Software Engineer Intern",
      period: "May 2025 - August 2025",
      description:
        "Stay tuned...",
    },
    {
      company: "Dlicio",
      role: "Founder and CEO",
      period: "Febuary 2024 - Present",
      description:
        "Developing a new food delivery app, Delicio to help local restaurants and foodies connect.",
    },
    {
      company: "Computers For Kids Halton",
      role: "Co-founder",
      period: "June 2023 - July 2024",
      description:
        "Spearheaded charity that gave away laptops to children in need, including hardware and software repair, community outreach, and candidate interviewing.",
    },
  ];

  return (
    
    <div className="min-h-screen text-white relative font-['Kanit']"> {/* Add your preferred font here */}
      <Helmet>
        <title>Mikhai Wilson | Portfolio</title>
        <meta name="description" content="Software Engineer & Data Scientist Portfolio" />
        <meta property="og:title" content="Mikhai Wilson | Portfolio" />
        <meta property="og:description" content="Software Engineer & Data Scientist Portfolio" />
        <meta name="theme-color" content="#000000" />
      </Helmet>
      
      {/* Add header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <div className="flex gap-4">
          <motion.a
            href="https://github.com/mikop22"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-gray-300"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mikhai-wilson-7a2669249"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-gray-300"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>
        <motion.a
          href="/path-to-your-resume.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md text-sm font-medium"
        >
          <Download size={16} />
          Download Resume
        </motion.a>
      </header>

      <section className="h-screen relative overflow-hidden bg-black">
        <div className="absolute inset-0 md:inset-0">
          {/* Mobile-optimized container with top spacing */}
          <div className="relative h-full w-full md:w-full">
            <div className="absolute inset-0 md:relative h-[70vh] md:h-full mt-20 md:mt-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="images/background.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
            </div>
          </div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-screen-xl mx-auto w-full"
          >
            <div className="md:ml-0 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">Hello, I'm Mikhai</h1>
              <div className="text-xl text-gray-400 h-8 flex items-center">
                <span>{typedText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="ml-1 inline-block w-0.5 h-6 bg-white"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Recent Projects</h2>
          <div className="grid grid-cols-12 gap-8">
            {/* Mobile projects - spans 8 columns */}
            <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-8">
              {mobileProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Stack of desktop projects - spans 4 columns */}
            <div className="col-span-12 md:col-span-4 space-y-8">
              {desktopProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-black/90">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <span className="text-gray-400 font-medium">{exp.role}</span>
                  <span className="text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
