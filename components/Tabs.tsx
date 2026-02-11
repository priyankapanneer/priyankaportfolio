"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, GraduationCap, Trophy, Github, Award, BadgeCheck } from "lucide-react";
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

export function FeatureTabs() {
    const { projects, education, achievements, skills, certificates } = useContent();
    const [activeTab, setActiveTab] = useState<Tab>("education");

    return (
        <div id="journey" className="w-full max-w-4xl mx-auto mt-20 scroll-mt-24">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 gap-2">
                {[
                    { id: "education", label: "Education", icon: GraduationCap },
                    { id: "skills", label: "Skills", icon: BadgeCheck },
                    { id: "projects", label: "Projects", icon: Folder },
                    { id: "certificates", label: "Certificates", icon: Award },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all border",
                            activeTab === tab.id
                                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                                : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">

                    {/* EDUCATION: TIMELINE UI */}
                    {activeTab === "education" && (
                        <motion.div
                            key="education"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="relative border-l-2 border-border ml-3 md:ml-6 space-y-8 pl-8 md:pl-12 py-2"
                        >
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative">
                                    {/* Dot */}
                                    <span className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />

                                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors shadow-sm">
                                        <span className="text-sm font-mono text-primary mb-1 block">{edu.year}</span>
                                        <h3 className="text-lg font-bold">{edu.degree}</h3>
                                        <p className="text-muted-foreground font-medium mb-3">{edu.institution}</p>
                                        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{edu.description}</p>

                                        {edu.certificateUrl && (
                                            <a
                                                href={edu.certificateUrl}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 text-xs font-bold text-primary border border-primary/20 bg-primary/5 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                                            >
                                                <Award size={14} /> View Certificate
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* SKILLS: PREMIUM CARDS WITH STAR RATINGS */}
                    {activeTab === "skills" && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            {[
                                { title: "Frontend", items: skills.frontend },
                                { title: "Backend", items: skills.backend },
                                { title: "Tools", items: skills.tools },
                            ].map((category) => (
                                <div key={category.title}>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                                        {category.title}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {category.items.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="group relative bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
                                            >
                                                {/* Color Glow Effect */}
                                                <div
                                                    className="absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                                                    style={{ backgroundColor: skill.color }}
                                                ></div>

                                                <div
                                                    className="p-3 rounded-lg bg-background shadow-sm text-white flex items-center justify-center w-12 h-12"
                                                    style={{ backgroundColor: skill.color }}
                                                >
                                                    {/* Icon Placeholder */}
                                                    <span className="font-bold text-lg">{skill.name[0]}</span>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-foreground">{skill.name}</h4>
                                                    <StarRating level={skill.level} className="text-yellow-400 mt-1" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
                                    className="group relative flex flex-col bg-card/50 backdrop-blur-xl border border-white/5 dark:border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-primary/30"
                                >
                                    {/* Project Preview Header */}
                                    <div className="h-48 w-full bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-600/20 relative overflow-hidden">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
                                                <div className="absolute inset-0 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                                    <Folder className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                                                </div>
                                            </>
                                        )}
                                        <div className="absolute top-6 left-6 flex gap-2 z-10">
                                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black font-outfit tracking-tight group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                                                Project #{idx + 1}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground mb-8 text-base leading-relaxed font-light line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Technology Ecosystem */}
                                        <div className="mt-auto pt-6 border-t border-border/10">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-4 block">Engineered With</label>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <motion.span
                                                        key={t}
                                                        whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
                                                        className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 transition-all cursor-default uppercase tracking-widest hover:text-white"
                                                    >
                                                        {t}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-6 mt-8">
                                            <a
                                                href={project.code}
                                                target="_blank"
                                                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] hover:text-primary transition-all group/link"
                                            >
                                                <Github size={14} className="group-hover/link:scale-125 transition-transform" />
                                                Source Code
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* CERTIFICATES: CARDS */}
                    {activeTab === "certificates" && (
                        <motion.div
                            key="certificates"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {certificates.map((cert, idx) => (
                                <div key={idx} className="bg-card border border-border p-6 rounded-xl flex items-start gap-4 hover:border-accent transition-colors">
                                    <div className="p-3 bg-accent/10 text-accent-foreground rounded-lg">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight mb-1">{cert.title}</h3>
                                        <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                                        <a href={cert.link} className="text-xs font-semibold text-primary mt-3 inline-block hover:underline">
                                            View Credential
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
