
"use client";

// Helper function to map skill level string to percent
function getSkillLevelPercent(level: string): number {
    switch (level) {
        case 'Beginner': return 20;
        case 'Intermediate': return 40;
        case 'Advanced': return 70;
        case 'Expert': return 100;
        default: return 0;
    }
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, GraduationCap, Github, Award, BadgeCheck, Trophy, Sparkles, Code2, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { useContent } from "@/context/ContentContext";

type Tab = "education" | "skills" | "projects" | "certificates";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// Real Icon Mapping using Simple Icons
const getIconUrl = (name: string) => {
    const slugMap: Record<string, string> = {
        "HTML": "html5",
        "CSS": "css3",
        "JavaScript": "javascript",
        "React": "react",
        "Next.js": "nextdotjs",
        "Tailwind": "tailwindcss",
        "Bootstrap": "bootstrap",
        "PHP": "php",
        "MySQL": "mysql",
        "SQLite": "sqlite",
        "Java": "openjdk",
        "Python": "python",
        "C": "c",
        "Git": "git",
        "GitHub": "github",
        "Postman": "postman",
        "VS Code": "visualstudiocode",
        "XAMPP": "xampp",
        "Node.js": "nodedotjs",
        "TypeScript": "typescript",
        "Flask": "flask",
        "Spark": "apachespark",
        "Scala": "scala"
    };

    const slug = slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://cdn.simpleicons.org/${slug}`;
};

export function FeatureTabs() {
    const { projects, education, skills, certificates } = useContent();
    const [activeTab, setActiveTab] = useState<Tab>("education");

    const openCertificate = (url: string) => {
        if (!url) return;

        if (url.startsWith('data:')) {
            const newTab = window.open();
            if (newTab) {
                newTab.document.write(`
                    <html>
                        <head>
                            <title>Certificate</title>
                            <style>
                                body { margin: 0; display: flex; align-items: center; justify-content: center; background: #111; min-height: 100vh; }
                                img { max-width: 100%; max-height: 100vh; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.5); }
                            </style>
                        </head>
                        <body>
                            <img src="${url}" alt="Certificate" />
                        </body>
                    </html>
                `);
                newTab.document.close();
            }
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div id="journey" className="w-full max-w-5xl mx-auto mt-20 scroll-mt-24">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-16 gap-3">
                {[
                    { id: "education", label: "Education", icon: GraduationCap },
                    { id: "skills", label: "Skills", icon: Code2 },
                    { id: "projects", label: "Projects", icon: Folder },
                    { id: "certificates", label: "Certificates", icon: Award },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={cn(
                            "flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border-2",
                            activeTab === tab.id
                                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] scale-105"
                                : "bg-card/50 backdrop-blur-sm text-muted-foreground border-border/50 hover:border-primary/50"
                        )}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">

                    {/* EDUCATION: TIMELINE UI */}
                    {activeTab === "education" && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="relative border-l-2 border-border/30 ml-3 md:ml-6 space-y-12 pl-8 md:pl-16 py-4"
                        >
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: idx * 0.15, duration: 0.7, type: "spring", bounce: 0.3 }}
                                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(127,90,240,0.10)' }}
                                    className="relative"
                                >
                                    <motion.span
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.18, duration: 0.5, type: 'spring', bounce: 0.5 }}
                                        className="absolute -left-[45px] md:-left-[63px] top-2 h-7 w-7 rounded-full border-4 border-background bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] z-10 animate-pulse"
                                    />

                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.03, boxShadow: '0 8px 32px rgba(127,90,240,0.13)' }}
                                        className="group bg-card/40 backdrop-blur-md p-8 rounded-[2rem] border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-primary/5"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-black tracking-tight underline-offset-8 decoration-primary/20">{edu.degree}</h3>
                                                <p className="text-primary font-bold tracking-widest uppercase text-xs">{edu.institution}</p>
                                            </div>
                                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black tracking-tighter border border-primary/20">
                                                {edu.year}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                                            {edu.description}
                                        </p>

                                        {(edu.fileUrl || edu.certificateUrl) && (
                                            <button
                                                onClick={() => {
                                                    const url = edu.fileUrl || edu.certificateUrl;
                                                    if (!url) return;
                                                    if (url.startsWith('data:image')) {
                                                        const win = window.open();
                                                        if (win) {
                                                            win.document.write(`
                                                                <html>
                                                                    <head><title>Certificate</title></head>
                                                                    <body style='margin:0;display:flex;align-items:center;justify-content:center;background:#111;'>
                                                                        <img src='${url}' alt='Certificate' style='max-width:100vw;max-height:100vh;object-fit:contain;box-shadow:0 0 20px rgba(0,0,0,0.5);'/>
                                                                    </body>
                                                                </html>
                                                            `);
                                                            win.document.close();
                                                        }
                                                    } else if (url.startsWith('data:application/pdf')) {
                                                        window.open(url, '_blank');
                                                    } else {
                                                        window.open(url, '_blank');
                                                    }
                                                }}
                                                className="group/btn relative inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:scale-105 transition-all active:scale-95 shadow-lg overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                                                <Award size={16} /> View Certificate
                                            </button>
                                        )}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* SKILLS: INTERACTIVE 3D TECH STACK */}
                    {activeTab === "skills" && (
                        <motion.div
                            key="skills"
                            variants={container}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="space-y-20 px-2"
                        >
                            {Array.isArray(skills) && skills.map((category: any, catIdx: number) => {
                                // Default visuals if not specific ones
                                const visuals = [
                                    { icon: <Globe className="text-blue-500" />, gradient: "from-blue-500/20 to-cyan-500/5" },
                                    { icon: <Cpu className="text-purple-500" />, gradient: "from-purple-500/20 to-pink-500/5" },
                                    { icon: <Trophy className="text-orange-500" />, gradient: "from-orange-500/20 to-red-500/5" },
                                    { icon: <Sparkles className="text-amber-500" />, gradient: "from-amber-500/20 to-yellow-500/5" },
                                ];
                                const visual = visuals[catIdx % visuals.length];

                                return (
                                    <div key={category.id} className="space-y-10">
                                        <div className="flex items-center gap-6">
                                            <div className="p-4 bg-background border border-border shadow-inner rounded-2xl">
                                                {visual.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black tracking-tighter uppercase italic opacity-90">
                                                    {category.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {category.items.map((skill: any, idx: number) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.08 }}
                                                    className="group relative flex flex-col items-center justify-center"
                                                >
                                                    <div className={cn(
                                                        "relative w-20 h-20 bg-card/60 backdrop-blur-xl border border-border/40 p-2 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all duration-500",
                                                        "hover:border-primary/80 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
                                                        "group-hover:bg-gradient-to-br animate-gradient-x",
                                                        visual.gradient
                                                    )}
                                                        title={skill.name}
                                                    >
                                                        {/* Real SVG Icon */}
                                                        <div className="relative z-10 w-6 h-6 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={getIconUrl(skill.name)}
                                                                alt={skill.name}
                                                                className="w-4 h-4 object-contain filter transition-transform duration-500 group-hover:scale-100 dark:invert dark:brightness-100"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${skill.name[0]}&background=random&color=fff&bold=true`;
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="text-center z-10">
                                                            <h4 className="font-extrabold text-[8px] uppercase tracking-wide mb-0.5 group-hover:text-primary transition-colors font-mono" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
                                                                {skill.name}
                                                            </h4>
                                                            <div className="flex flex-col items-center gap-0.5">
                                                                <StarRating level={skill.level} className="scale-60 text-primary" />
                                                                <span className="text-[5px] font-bold opacity-30 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-mono" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>{skill.level}</span>
                                                            </div>
                                                            {/* Animated Progress Bar */}
                                                            <div className="w-full mt-0.5">
                                                                <div className="h-0.5 rounded-full bg-muted-foreground/10 overflow-hidden">
                                                                    <div
                                                                        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 animate-progress"
                                                                        style={{ width: `${getSkillLevelPercent(skill.level)}%`, transition: 'width 0.7s cubic-bezier(.4,2,.3,1)' }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Glow Background */}
                                                        <div
                                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700"
                                                            style={{ backgroundColor: skill.color }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* PROJECTS: ARCHITECTURAL GALLERY */}
                    {activeTab === "projects" && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -10 }}
                                        className="group relative flex flex-col bg-card/50 backdrop-blur-xl border border-white/5 dark:border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-primary/30"
                                    >
                                        {/* Project Preview Header */}
                                        <div className="h-56 w-full bg-gradient-to-br from-primary/20 to-purple-600/20 relative overflow-hidden">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                                    <Folder className="w-24 h-24 text-primary/20 group-hover:text-primary transition-all duration-700 group-hover:scale-110" />
                                                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-5 text-primary group-hover:animate-pulse" />
                                                </div>
                                            )}
                                            <div className="absolute top-8 left-8 flex gap-3 z-10">
                                                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                                                <div className="w-3 h-3 rounded-full bg-green-500/40" />
                                            </div>
                                        </div>

                                        <div className="p-10 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-6">
                                                <h3 className="text-3xl font-black font-outfit tracking-tighter group-hover:text-primary transition-colors italic">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <p className="text-muted-foreground mb-8 text-base leading-relaxed font-medium line-clamp-3">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto space-y-8">
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="text-[10px] font-black bg-secondary/50 text-secondary-foreground px-4 py-2 rounded-lg uppercase tracking-tighter"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="pt-6 border-t border-border/10 flex items-center justify-between">
                                                    <a
                                                        href={project.code}
                                                        target="_blank"
                                                        className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] hover:text-primary transition-all group/link"
                                                    >
                                                        <Github size={18} className="group-hover/link:scale-125 transition-transform" />
                                                        Explore Code
                                                    </a>
                                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    }

                    {/* CERTIFICATES: CARDS */}
                    {
                        activeTab === "certificates" && (
                            <motion.div
                                key="certificates"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {certificates.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.06, boxShadow: '0 12px 36px rgba(0,0,0,0.16)' }}
                                        className="relative bg-white/10 backdrop-blur-xl border-2 border-transparent p-6 rounded-2xl flex items-start gap-4 hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-all duration-500 group"
                                        style={{
                                            borderImage: 'linear-gradient(135deg, #7f5af0 0%, #2cb2ff 100%) 1',
                                            boxShadow: '0 4px 24px 0 rgba(127,90,240,0.08), 0 1.5px 8px 0 rgba(44,178,255,0.08)'
                                        }}
                                    >
                                        {/* Animated Glow */}
                                        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700" style={{ background: 'linear-gradient(120deg, #7f5af0 0%, #2cb2ff 100%)' }} />

                                        <div className="p-3 bg-gradient-to-br from-primary/30 to-blue-400/20 text-primary rounded-lg border border-primary/30 shadow-inner flex items-center justify-center">
                                            <Award size={26} />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-extrabold text-lg leading-tight mb-1 tracking-tight font-mono group-hover:text-primary" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>{cert.title}</h3>
                                            <p className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest font-mono" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>{cert.issuer} • {cert.date}</p>
                                            <button
                                                onClick={() => {
                                                    if (cert.fileUrl) {
                                                        openCertificate(cert.fileUrl);
                                                    } else {
                                                        openCertificate(cert.link);
                                                    }
                                                }}
                                                className="text-xs font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center gap-2 group/cred px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-blue-400/10 hover:from-primary/20 hover:to-blue-400/20 transition-colors shadow"
                                            >
                                                View Certificate
                                                <span className="group-hover/cred:translate-x-1 transition-transform">→</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    }

                </AnimatePresence >
            </div >
        </div >
    );
}
