'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Calendar, GraduationCap, Briefcase, Code, Award, Users, Heart, BookOpen, Trophy, Headphones, FileText, BookOpenCheck, Menu, X } from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'volunteer', label: 'Volunteer Work', icon: Heart },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'podcasts', label: 'Podcasts', icon: Headphones },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'papers', label: 'Academic Papers', icon: BookOpenCheck },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActiveSection(itemId);
    setIsMobileMenuOpen(false); // Mobilde menü seçiminden sonra kapat
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-sf-large font-sf-bold text-slate-900 mb-6 drop-shadow-sm">About Me</h2>
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30">
                <div className="prose prose-slate max-w-none">
                  <p className="text-sf-body font-sf-regular text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    I'm a Platform Developer & AI Specialist passionate about privacy-preserving technologies 
                    and artificial intelligence. I focus on creating secure, scalable systems that protect user 
                    privacy while delivering powerful AI capabilities.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    My expertise spans machine learning, data engineering, and full-stack development. 
                    I enjoy working on challenging problems that sit at the intersection of AI and cybersecurity.
                  </p>
                  <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                    When I'm not coding, you'll find me contributing to open source projects, participating 
                    in hackathons, or exploring the latest developments in artificial intelligence and privacy technology.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sf-title2 font-sf-semibold text-slate-900 mb-4 drop-shadow-sm">Skills & Technologies</h3>
              <div className="bg-white/15 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-wrap gap-3">
                  {['Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/30 backdrop-blur-sm text-slate-800 rounded-full text-sf-subhead font-sf-medium border border-white/40 hover:bg-white/50 transition-all drop-shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Work Experience</h2>
            
            <div className="bg-white/15 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="space-y-8">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
                  <div className="absolute left-2 top-6 w-0.5 h-20 bg-gradient-to-b from-blue-200 to-transparent"></div>
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AI Research Intern</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-medium drop-shadow-sm">Privacy Tech Company</p>
                    <p className="text-sm text-slate-700 mt-1 drop-shadow-sm">June 2023 - Present</p>
                  </div>
                  <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                    Developing privacy-preserving machine learning algorithms and implementing secure data processing pipelines 
                    for enterprise clients.
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg"></div>
                  <div className="absolute left-2 top-6 w-0.5 h-20 bg-gradient-to-b from-emerald-200 to-transparent"></div>
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Full Stack Developer</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Tech Startup</p>
                    <p className="text-sm text-slate-700 mt-1 drop-shadow-sm">Jan 2023 - June 2023</p>
                  </div>
                  <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                    Built scalable web applications using React, Node.js, and cloud technologies. 
                    Implemented CI/CD pipelines and improved system performance by 40%.
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full shadow-lg"></div>
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Software Engineering Intern</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">Enterprise Solutions</p>
                    <p className="text-sm text-slate-700 mt-1 drop-shadow-sm">Summer 2022</p>
                  </div>
                  <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                    Developed microservices architecture and implemented automated testing frameworks. 
                    Collaborated with cross-functional teams on enterprise software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Featured Projects</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">NASA Space Apps Challenge</h3>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-800 drop-shadow-sm">2nd Place</span>
                  </div>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Developed an AI-powered solution for space debris tracking and collision prediction using machine learning algorithms.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Python</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">TensorFlow</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">NASA APIs</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">TEKNOFEST Innovation</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Created an IoT-based smart city solution with real-time data analytics and predictive modeling for urban planning.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">IoT</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">React</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">Arduino</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Privacy-First Chat App</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  End-to-end encrypted messaging application with zero-knowledge architecture and blockchain-based identity verification.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Cryptography</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Node.js</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Blockchain</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Robotic Arm Control System</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2022</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Computer vision-based robotic arm control system with machine learning for object recognition and path planning.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">OpenCV</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Python</span>
                    <span className="px-3 py-1 bg-red-400/20 backdrop-blur-sm text-red-800 rounded-lg text-sm border border-red-300/30 drop-shadow-sm">Robotics</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Education</h2>
            
            <div className="space-y-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Bachelor of Science in Computer Engineering</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium drop-shadow-sm">Bursa Uludağ University</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2020 - 2024</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">AI/ML</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Data Structures</span>
                  <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Algorithms</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">English Language Preparation</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Ankara University Language School</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2019 - 2020</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Intensive English language program focused on academic and technical communication.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">English</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Academic Writing</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">High School Diploma</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">Anatolian High School</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2015 - 2019</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Mathematics and Science focused curriculum with early introduction to programming.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Mathematics</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Physics</span>
                  <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Programming</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'volunteer':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Volunteer Work & Communities</h2>
            
            <div className="space-y-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AI Ethics Research Group</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium drop-shadow-sm">Tech Community Volunteer</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023 - Present</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Contributing to research on ethical AI development and privacy-preserving machine learning techniques.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">AI Ethics</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Research</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Open Source Contributor</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Various Projects</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2022 - Present</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Active contributor to open source machine learning and privacy tools, helping improve accessibility and security.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Open Source</span>
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Python</span>
                  <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">ML Tools</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Coding Bootcamp Mentor</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">Local Tech Community</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Mentoring junior developers in web development and AI fundamentals through hands-on workshops.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Mentoring</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Teaching</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Certifications & Achievements</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">TensorFlow Developer Certificate</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium drop-shadow-sm">Google</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Demonstrated proficiency in building and training neural networks using TensorFlow.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AWS Solutions Architect Associate</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-medium drop-shadow-sm">Amazon Web Services</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Certified in designing distributed systems and applications on AWS platform.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Machine Learning Specialization</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Stanford University (Coursera)</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2022</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Comprehensive course covering supervised learning, unsupervised learning, and best practices.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">NASA Space Apps Challenge</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">NASA</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-800 drop-shadow-sm">2nd Place</span>
                  </div>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Global hackathon achievement for innovative space technology solution.
                </p>
              </div>
            </div>
          </div>
        );

      case 'podcasts':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Podcast Appearances</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AI Ethics in Practice</h3>
                      <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Dec 2023</span>
                    </div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                      Tech Talks Turkey Podcast
                    </p>
                    <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                      Deep dive into ethical considerations in AI development, privacy-preserving technologies, 
                      and the future of responsible AI implementation in enterprise environments.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-purple-400/20 backdrop-blur-sm text-purple-800 rounded-lg text-sm border border-purple-300/30 drop-shadow-sm">AI Ethics</span>
                        <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Privacy Tech</span>
                        <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">45 min</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Building Privacy-First Systems</h3>
                      <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Oct 2023</span>
                    </div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-medium mb-3 drop-shadow-sm">
                      Developer Stories Podcast
                    </p>
                    <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                      Discussion on building secure, privacy-focused applications and the technical challenges 
                      of implementing zero-knowledge architectures in real-world systems.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Privacy</span>
                        <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Security</span>
                        <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">30 min</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Young Innovators in AI</h3>
                      <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Aug 2023</span>
                    </div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-3 drop-shadow-sm">
                      Future Tech Podcast
                    </p>
                    <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                      Sharing insights on breaking into the AI field as a young developer, discussing the NASA Space Apps 
                      experience, and advice for students interested in AI and privacy technology.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Career</span>
                        <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Innovation</span>
                        <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">25 min</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'blogs':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Blog Posts & Articles</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Privacy-Preserving Machine Learning: A Practical Guide</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Jan 2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium mb-3 drop-shadow-sm">
                  Medium • AI & Privacy Series
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  A comprehensive guide to implementing privacy-preserving machine learning techniques, including differential privacy, 
                  federated learning, and homomorphic encryption with practical Python examples.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Privacy</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">12 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>2.4K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Building Secure APIs with Zero-Knowledge Architecture</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Dec 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-3 drop-shadow-sm">
                  Dev.to • Security Best Practices
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Learn how to design and implement APIs that never see user data in plaintext, using zero-knowledge proofs 
                  and client-side encryption to maintain privacy while providing full functionality.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Security</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">API Design</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">8 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>1.8K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">My Journey to NASA Space Apps Challenge Success</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Nov 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Personal Blog • Competition Stories
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  A behind-the-scenes look at our 2nd place NASA Space Apps project, from ideation to implementation, 
                  including the technical challenges we faced and lessons learned along the way.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-400/20 backdrop-blur-sm text-purple-800 rounded-lg text-sm border border-purple-300/30 drop-shadow-sm">Hackathon</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Space Tech</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">6 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>3.1K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">The Future of AI in Turkey: Opportunities and Challenges</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Oct 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  TechCrunch Turkey • Industry Analysis
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Analyzing the current state and future prospects of artificial intelligence in Turkey, discussing government 
                  initiatives, startup ecosystem, and the role of universities in AI research and development.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">AI Industry</span>
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">Turkey</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">10 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>4.2K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'papers':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Academic Papers & Research</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Privacy-Preserving Federated Learning for Healthcare Applications
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Under Review</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium mb-3 drop-shadow-sm">
                  IEEE Transactions on Medical Imaging • Co-Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  This paper presents a novel approach to federated learning in healthcare settings, addressing privacy concerns 
                  while maintaining model accuracy. We propose differential privacy techniques specifically adapted for medical imaging data.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Federated Learning</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Healthcare</span>
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Privacy</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Efficient Space Debris Detection Using Deep Learning and Satellite Imagery
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Journal of Space Technology • First Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Based on our NASA Space Apps Challenge project, this paper details the machine learning algorithms and computer vision 
                  techniques used for real-time space debris detection and collision prediction.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-400/20 backdrop-blur-sm text-purple-800 rounded-lg text-sm border border-purple-300/30 drop-shadow-sm">Space Technology</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Deep Learning</span>
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">Computer Vision</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>DOI: 10.1000/xyz123</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Cryptographic Protocols for Secure Multi-Party Computation in IoT Networks
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-3 drop-shadow-sm">
                  ACM Conference on Security & Privacy • Co-Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  This research explores novel cryptographic approaches for enabling secure computation across distributed IoT devices 
                  without revealing sensitive data, with applications in smart city infrastructure.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Cryptography</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">IoT</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>DOI: 10.1145/abc456</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Undergraduate Thesis: AI-Powered Bionic Prosthetics with EMG Signal Processing
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Bursa Uludağ University • Thesis Project
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Comprehensive research on developing intelligent prosthetic devices that use machine learning to interpret EMG signals 
                  for natural limb control, including hardware design and signal processing algorithms.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Biomedical</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Signal Processing</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">Graduated with Honors</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Get In Touch</h2>
            
            <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30">
              <p className="text-slate-800 text-lg mb-8 leading-relaxed drop-shadow-sm">
                I'm always interested in discussing new opportunities, innovative projects, 
                and collaborations in AI and privacy technology. Feel free to reach out!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Email</p>
                    <a href="mailto:melih@example.com" className="text-slate-900 hover:text-indigo-600 font-medium transition-colors drop-shadow-sm">
                      melih@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Phone</p>
                    <span className="text-slate-900 font-medium drop-shadow-sm">+90 (555) 123-4567</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Location</p>
                    <span className="text-slate-900 font-medium drop-shadow-sm">Bursa, Turkey</span>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <a 
                    href="https://github.com/meliharik" 
                    target="_blank" 
                    className="flex items-center gap-2 bg-white/30 backdrop-blur-sm text-slate-800 px-6 py-3 rounded-xl hover:bg-white/50 transition-all font-medium border border-white/40 shadow-lg drop-shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/meliharik" 
                    target="_blank" 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-blue-600/90 hover:to-indigo-600/90 transition-all font-medium shadow-lg"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden font-sf-pro">
      {/* Animated Background Circles - Dengeli ve temiz */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[32rem] h-[32rem] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-25 blur-3xl animate-float1"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-30 blur-3xl animate-float2 animation-delay-1000"></div>
        <div className="absolute bottom-[15%] left-[25%] w-80 h-80 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-25 blur-3xl animate-float3 animation-delay-2000"></div>
        <div className="absolute bottom-[25%] right-[20%] w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-35 blur-3xl animate-float4 animation-delay-1000"></div>
        <div className="absolute top-[40%] left-[8%] w-64 h-64 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full opacity-30 blur-3xl animate-float5 animation-delay-3000"></div>
        <div className="absolute top-[65%] right-[12%] w-56 h-56 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-25 blur-3xl animate-float6 animation-delay-2000"></div>
      </div>

      {/* Mobile Header - Sadece mobilde görünür */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-sm font-sf-bold shadow-lg">
              MA
            </div>
            <div>
              <h1 className="text-sf-headline font-sf-semibold text-slate-900">Melih Arık</h1>
              <p className="text-sf-footnote font-sf-regular text-slate-700">Platform Developer & AI Specialist</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-800 hover:bg-white/50 transition-all shadow-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 right-4 w-72 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-2xl border border-white/30 p-4" onClick={(e) => e.stopPropagation()}>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-sf-medium backdrop-blur-sm ${
                          activeSection === item.id
                            ? 'bg-white/60 text-slate-900 shadow-lg'
                            : 'text-slate-800 hover:bg-white/30 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sf-callout">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              {/* Mobile Social Links */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-white/20">
                <a 
                  href="https://github.com/meliharik" 
                  target="_blank" 
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/in/meliharik" 
                  target="_blank" 
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:melih@example.com" 
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex relative z-10">
        {/* Desktop Sidebar - Sadece büyük ekranlarda görünür */}
        <div className="hidden lg:block w-80 min-h-screen sticky top-0 relative">
          {/* Glass Container - sadece blur ve hafif tint, arka planı maskelemeyen */}
          <div className="absolute inset-0 backdrop-blur-xl backdrop-saturate-200"></div>
          
          {/* Very subtle white overlay only for readability */}
          <div className="absolute inset-0 bg-white/15"></div>
          
          {/* Content with higher z-index */}
          <div className="relative z-10">
            {/* Profile Header */}
            <div className="p-8 border-b border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-sf-bold mb-4 shadow-lg">
                MA
              </div>
              <h1 className="text-sf-title1 font-sf-bold text-slate-900 mb-1 drop-shadow-sm">Melih Arık</h1>
              <p className="text-sf-headline font-sf-medium text-slate-800 mb-3 drop-shadow-sm">Platform Developer & AI Specialist</p>
              <p className="text-sf-subhead font-sf-regular text-slate-700 flex items-center gap-2 drop-shadow-sm">
                <MapPin className="w-4 h-4" />
                Bursa, Turkey
              </p>
            </div>
            
            {/* Navigation Menu */}
            <nav className="p-6">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-sf-medium backdrop-blur-sm ${
                          activeSection === item.id
                            ? 'bg-white/60 text-slate-900 shadow-lg'
                            : 'text-slate-800 hover:bg-white/30 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            {/* Social Links */}
            <div className="p-6 border-t border-white/20">
              <div className="flex gap-3 mb-6">
                <a 
                  href="https://github.com/meliharik" 
                  target="_blank" 
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/meliharik" 
                  target="_blank" 
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:melih@example.com" 
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              {/* Footer */}
              <div className="pt-4 border-t border-white/20">
                <div className="text-center space-y-2">
                  <p className="text-sf-caption1 font-sf-regular text-slate-700 drop-shadow-sm">
                    Built with Next.js & Tailwind CSS
                  </p>
                  <p className="text-sf-caption1 font-sf-regular text-slate-600 drop-shadow-sm">
                    © {new Date().getFullYear()} Melih Arık
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sf-caption1 font-sf-regular text-slate-600 drop-shadow-sm">
                    <span>Made with</span>
                    <span className="text-red-500 animate-pulse">♥</span>
                    <span>in Turkey</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto lg:mx-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
