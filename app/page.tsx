'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Download, Mail, 
  Shield, Code, Terminal, ExternalLink, 
  Lock, MessageSquare, CheckCircle2, Menu, X
} from 'lucide-react';

// Composant d'animation au défilement (Scroll Reveal)
function RevealOnScroll({ children, delay = '0ms' }: { children: React.ReactNode, delay?: string }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: delay }}
      className={`transform transition-all duration-1000 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Coordonnées pour l'effet de suivi de la souris
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  const themeBg = darkMode ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900';
  const themeCard = darkMode ? 'bg-[#111827]/80 border-slate-800 text-slate-100 backdrop-blur-sm' : 'bg-white/80 border-slate-200 text-slate-900 backdrop-blur-sm';
  const themeNav = isScrolled 
    ? (darkMode ? 'bg-[#030712]/90 border-slate-800/80 h-14 shadow-lg shadow-black/30' : 'bg-white/90 border-slate-200/80 h-14 shadow-md shadow-slate-200/40')
    : (darkMode ? 'bg-[#030712]/0 border-transparent h-16' : 'bg-slate-50/0 border-transparent h-16');
  const themeInput = darkMode ? 'bg-[#1f2937]/50 border-slate-700 text-slate-100 focus:bg-[#1f2937]' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white';

  return (
    <main className={`min-h-screen ${themeBg} font-sans transition-colors duration-500 overflow-x-hidden pb-12 relative`}>
      
      {/* EFFET MATRIX : Grille cyber discrète en tâche de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* LIGHT SPOTLIGHT : Halo lumineux qui suit le curseur de ta souris */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 opacity-20 dark:opacity-40 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${darkMode ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.04)'}, transparent 80%)`
        }}
      />

      {/* --- BARRE DE NAVIGATION ANIMÉE --- */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${themeNav} transition-all duration-300 flex items-center z-50`}>
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight transition-all duration-300 hover:scale-105 cursor-pointer">
            Giovanni <span className="text-blue-600 dark:text-cyan-400">NGOMBA</span>
          </span>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-80">
              {['À Propos', 'Compétences', 'Projets', 'Contact'].map((item, idx) => (
                <a key={idx} href={`#${['about', 'skills', 'projects', 'contact'][idx]}`} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-200 relative group py-1">
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 dark:bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* Bouton Jour/Nuit */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:scale-110 hover:ring-2 ring-blue-500 transition-all duration-300 active:scale-95 z-50"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
            </button>

            {/* Hamburger Mobile Menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl bg-slate-500/10 border border-slate-500/20 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE EXPANSION DROPDOWN */}
      <div className={`fixed inset-x-0 top-16 p-6 transition-all duration-300 transform origin-top md:hidden z-40 ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'} ${darkMode ? 'bg-[#030712]/95 border-b border-slate-800' : 'bg-white/95 border-b border-slate-200'} backdrop-blur-lg`}>
        <div className="flex flex-col gap-4 text-center font-medium">
          {['À Propos', 'Compétences', 'Projets', 'Contact'].map((item, idx) => (
            <a key={idx} onClick={() => setMobileMenuOpen(false)} href={`#${['about', 'skills', 'projects', 'contact'][idx]}`} className="py-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-all">
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* --- ACCUEIL / HERO SECTION --- */}
      <section id="about" className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center animate-[fadeIn_1s_ease-out] relative z-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2">
          Giovanni <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">NGOMBA</span>
        </h1>
        <p className="text-lg md:text-xl opacity-80 font-medium mb-8">
          Développeur Informatique | Passionné de Cyber & Tech
        </p>

        {/* Photo de profil */}
        <div className="relative mb-8 group animate-[fadeInUp_1s_ease-out_0.2s_both]">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative w-36 h-36 bg-slate-200 rounded-full overflow-hidden border-4 border-white dark:border-slate-950 shadow-2xl transition-all duration-500 group-hover:scale-105">
            <img 
              src="/profil.jpg" 
              alt="Giovanni NGOMBA" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => { 
                e.currentTarget.src = "https://ui-avatars.com/api/?name=Giovanni+Ngomba&background=2563eb&background=06b6d4&color=fff";
              }}
            />
          </div>
          <div className="absolute bottom-0 right-2 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
        </div>

        {/* Boutons d'actions */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 animate-[fadeInUp_1s_ease-out_0.4s_both]">
          <a 
            href="/cv.pdf" 
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white dark:text-slate-950 font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-sm active:scale-95"
          >
            <Download size={16} /> Télécharger CV
          </a>
          <a 
            href="#contact" 
            className={`inline-flex items-center gap-2 px-6 py-3 ${themeCard} border font-semibold rounded-xl hover:border-blue-500/50 hover:-translate-y-0.5 text-sm shadow-sm transition-all duration-300`}
          >
            <Mail size={16} /> Contact
          </a>
        </div>

        {/* Badges de technologies */}
        <div className="flex flex-wrap gap-2 justify-center max-w-lg animate-[fadeInUp_1s_ease-out_0.6s_both]">
          {['Next.js', 'Tailwind CSS', 'Python','Kali Linux'].map((tag, i) => (
            <span key={i} className={`px-3 py-1 ${themeCard} border rounded-lg text-xs font-mono hover:border-blue-500/40 hover:text-blue-500 dark:hover:text-cyan-400 hover:scale-105 transition-all duration-200 cursor-default`}>
              🛡️ {tag}
            </span>
          ))}
        </div>
      </section>

      {/* --- COMPÉTENCES --- */}
      <section id="skills" className="py-20 px-6 max-w-5xl mx-auto relative z-20">
        <RevealOnScroll>
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Compétences</h2>
          <p className="text-sm opacity-60 font-mono mb-10">// Domaines d'études et technologies</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Sécurité & Pentesting', icon: <Shield size={20} />, items: ["Tests d'intrusion", "Analyse de vulnérabilités", "Kali Linux"], glow: 'hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.25)]', hoverBorder: 'hover:border-emerald-500/50', delay: '0ms' },
            { title: 'Systèmes & Réseaux', icon: <Lock size={20} />, items: ["Admin Linux"], glow: 'hover:shadow-[0_0_25px_-3px_rgba(34,211,238,0.25)]', hoverBorder: 'hover:border-cyan-500/50', delay: '100ms' },
            { title: 'Développement Web', icon: <Code size={20} />, items: ["Python (Django/Flask)", "Next.js & Tailwind", "Bases de données"], glow: 'hover:shadow-[0_0_25px_-3px_rgba(59,130,246,0.25)]', hoverBorder: 'hover:border-blue-500/50', delay: '200ms' }
          ].map((skill, index) => (
            <RevealOnScroll key={index} delay={skill.delay}>
              <div className={`${themeCard} border p-6 rounded-2xl shadow-sm hover:-translate-y-2 ${skill.glow} ${skill.hoverBorder} transition-all duration-500 ease-out group`}>
                <div className="text-blue-600 dark:text-cyan-400 mb-4 transition-transform duration-500 ease-out group-hover:rotate-[12deg] group-hover:scale-110">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm opacity-80 transition-transform duration-300 group-hover:translate-x-1.5">
                      <CheckCircle2 size={14} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* --- PROJETS --- */}
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto relative z-20">
        <RevealOnScroll>
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Projets</h2>
          <p className="text-sm opacity-60 font-mono mb-10">// Applications opérationnelles et conceptions</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'RecruitSmart', status: 'Déployé', desc: 'Plateforme RH de gestion de recrutement intelligent.', tags: ['Django', 'Python', 'Render'], delay: '0ms' },
            { name: 'MarineNavApp', status: 'Opérationnel', desc: "Outil d'ETA maritime et croisements dans chenaux.", tags: ['Flask', 'Python', 'Excel Data'], delay: '150ms' }
          ].map((project, i) => (
            <RevealOnScroll key={i} delay={project.delay}>
              <div className={`${themeCard} border rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-slate-400/40 transition-all duration-500 ease-out group`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400">{project.name}</h3>
                    <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-blue-600/10 text-blue-500 dark:text-cyan-400 border border-blue-500/20">
                      {project.status}
                    </span>
                  </div>
                  <p className="opacity-70 text-sm mb-4 leading-relaxed">{project.desc}</p>
                  <div className="flex gap-2 flex-wrap mb-6">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className={`px-2 py-0.5 ${themeBg} opacity-80 border border-slate-700/20 dark:border-slate-800 rounded text-xs font-mono transition-all duration-300 group-hover:border-slate-400/40`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-500 dark:text-cyan-400 text-sm font-medium rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 hover:scale-[1.02] transition-all duration-300 w-full sm:w-fit active:scale-95">
                  Voir sur GitHub <ExternalLink size={14} />
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-700/20 relative z-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="flex-1 text-center md:text-left">
            <RevealOnScroll>
              <h2 className="text-4xl font-black tracking-tight mb-4">Contact</h2>
              <p className="opacity-70 mb-6 leading-relaxed">
                Opportunité de stage, collaboration technique ou question sur mes projets ? Envoyez un message directement.
              </p>
              <div className="space-y-3 font-mono text-xs opacity-60">
                <p className="hover:translate-x-1.5 transition-transform duration-200 cursor-default">📍 Douala, Cameroun</p>
                <p className="hover:translate-x-1.5 transition-transform duration-200 cursor-default">📧 giovanni.ngomba@email.com</p>
              </div>
            </RevealOnScroll>
          </div>

          <div className="w-full md:w-[450px]">
            <RevealOnScroll delay="150ms">
              <div className={`${themeCard} border p-8 rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-blue-600 dark:text-cyan-400" /> Écrire un message
                </h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Nom complet" 
                      className={`w-full px-4 py-2.5 rounded-xl ${themeInput} border text-sm focus:outline-none focus:ring-2 ring-blue-500 dark:ring-cyan-400 transition-all duration-300 hover:border-blue-500/40`}
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Adresse e-mail" 
                      className={`w-full px-4 py-2.5 rounded-xl ${themeInput} border text-sm focus:outline-none focus:ring-2 ring-blue-500 dark:ring-cyan-400 transition-all duration-300 hover:border-blue-500/40`}
                    />
                  </div>
                  <div>
                    <textarea 
                      rows={4} 
                      placeholder="Votre message..." 
                      className={`w-full px-4 py-2.5 rounded-xl ${themeInput} border text-sm focus:outline-none focus:ring-2 ring-blue-500 dark:ring-cyan-400 transition-all resize-none duration-300 hover:border-blue-500/40`}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white dark:text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-md active:scale-95 hover:-translate-y-0.5"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-xs font-mono opacity-50 border-t border-slate-700/10 relative z-20">
        © {new Date().getFullYear()} Giovanni NGOMBA. Tous droits réservés.
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

    </main>
  );
}