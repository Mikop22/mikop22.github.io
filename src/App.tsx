import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTypewriter } from './hooks/useTypewriter';
interface Project {
  id: number;
  title: string;
  type: 'iphone' | 'wide';
  image: string;
  video?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group overflow-hidden rounded-lg aspect-[1/2]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        {isHovered ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out will-change-opacity">
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out will-change-opacity transform hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
          </div>

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-medium mb-2 text-white">{project.title}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium"
          >
            Learn More
          </motion.button>
        </div>
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

  const [viewMode, setViewMode] = useState('mobile');

  const mobileProjects: Project[] = [
    {
      id: 1,
      title: 'FlyBy AI',
      type: 'iphone',
      image: '/images/FlyBy_Pic.png',
      video: 'your-app1-demo.mp4',
    },
    {
      id: 2,
      title: 'Dlicio',
      type: 'iphone',
      image: '/images/DelicioPic.png',
      video: '/images/DelicioVid.mp4',
    },
  ];

  const webProjects: Project[] = [
    {
      id: 4,
      title: 'Web Project 1',
      type: 'wide',
      image: '/images/CarletonApp_Pic.png',
    },
    {
      id: 5,
      title: 'Web Project 2',
      type: 'wide',
      image: 'your-project2-thumbnail.jpg',
    },
  ];

  const experiences = [
    {
      company: "Tech Company A",
      role: "Software Engineer Intern",
      period: "May 2024 - Present",
      description:
        "Developed full-stack applications using React and Node.js. Implemented new features that improved user engagement by 25%.",
    },
    {
      company: "StartUp B",
      role: "Data Science Intern",
      period: "Jan 2024 - April 2024",
      description:
        "Built machine learning models for predictive analytics. Reduced processing time by 40% through optimization.",
    },
    {
      company: "University Research Lab",
      role: "Research Assistant",
      period: "Sept 2023 - Dec 2023",
      description:
        "Conducted research in artificial intelligence and published findings in academic journals.",
    },
  ];

  return (
    <div className="min-h-screen text-white relative">
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="images/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
        </div>

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-screen-xl mx-auto w-full"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Hello, I'm Mikhai</h1>
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
          <div className="flex justify-start mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')}
              className="px-6 py-2 bg-white text-black rounded-md text-sm font-medium"
            >
              {viewMode === 'mobile' ? 'Switch to Desktop' : 'Switch to Mobile'}
            </motion.button>
          </div>

          {viewMode === 'mobile' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mobileProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {webProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group overflow-hidden rounded-lg aspect-video"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl font-medium mb-2">{project.title}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white text-black rounded-md text-sm font-medium"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
