"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { Target, Rocket, Zap, Sparkles, Diamond } from "lucide-react";

export function About() {
    const { profile } = useContent();

    const sections = [
        {
            title: "Professional Bio",
            icon: <Target className="w-8 h-8 text-purple-500" />,
            content: profile.vision && profile.vision.trim() ? profile.vision : (profile.summary || "Committed to building impactful digital solutions through technical excellence."),
            color: "from-purple-600/30 via-purple-500/10 to-transparent",
            accent: "text-purple-500",
            glow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]",
            index: "01"
        },
        {
            title: "Core Ethos",
            icon: <Rocket className="w-8 h-8 text-primary" />,
            content: profile.mission && profile.mission.trim() ? profile.mission : (
                profile.role ? `Specialized in ${profile.role.split('|')[0].trim()}.\nDriving innovation through clean code and modern architecture.\nSolving complex problems with elegant software designs.` : "To deliver high-performance, scalable solutions.\nEmpowering businesses through digital-first innovation.\nBuilding accessible and performant web applications."
            ),
            color: "from-primary/30 via-primary/10 to-transparent",
            accent: "text-primary",
            glow: "group-hover:shadow-[0_0_50px_rgba(16,110,190,0.2)]",
            index: "02"
        }
    ];

    return (
        <section id="about" className="py-24 relative bg-background overflow-hidden selection:bg-primary/20">
            {/* Animated Floating Shapes */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[80px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[60px] animate-blob animation-delay-4000" />
                <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-primary/20 rounded-full blur-[40px] animate-blob" />
            </div>

            <div className="container px-6 mx-auto relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Animated Header */}
                    <div className="text-center mb-20 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, type: 'spring', bounce: 0.5 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/10 bg-gradient-to-r from-primary/10 via-blue-500/10 to-transparent mb-2 shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-primary font-serif">Direction & Purpose</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
                            className="text-5xl md:text-7xl font-black tracking-tight font-serif bg-gradient-to-r from-primary via-blue-500 to-muted-foreground bg-clip-text text-transparent drop-shadow-lg"
                        >
                            My <span className="text-primary italic font-display">Vision</span> & <span className="text-muted-foreground italic font-display">Mission</span>
                        </motion.h2>
                    </div>

                    {/* Animated Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.8, type: 'spring', bounce: 0.3 }}
                                whileHover={{ scale: 1.04, boxShadow: '0 12px 48px rgba(127,90,240,0.18)' }}
                                className="group relative h-full"
                            >
                                {/* Animated Glow Underlay */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${section.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700`} />

                                <div className={`relative h-full p-8 md:p-12 bg-white/20 backdrop-blur-2xl border-2 border-transparent rounded-[2rem] flex flex-col items-start gap-8 hover:border-primary/40 transition-all duration-500 shadow-xl ${section.glow}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent shadow-md animate-bounce-slow">
                                            {section.icon}
                                        </div>
                                        <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight font-serif transition-colors ${section.accent.replace('text-', 'group-hover:text-')}`}>{section.title}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {section.content.split('\n').filter(p => (typeof p === 'string' && p.trim())).map((point, pIdx) => (
                                            <motion.li
                                                key={pIdx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (idx * 0.2) + (pIdx * 0.15), duration: 0.7, type: 'spring', bounce: 0.3 }}
                                                className="flex items-start gap-4 group/item cursor-default"
                                            >
                                                <Diamond className={`w-4 h-4 ${section.accent} fill-current/10 group-hover/item:rotate-90 group-hover/item:scale-125 transition-all duration-700 ease-out animate-spin-slow`} />
                                                <motion.span
                                                    className="text-lg md:text-xl font-normal font-serif leading-snug tracking-tight group-hover:text-white transition-colors duration-500 text-white"
                                                    style={{ fontFamily: 'Times New Roman, Times, serif' }}
                                                    initial={{ opacity: 0, x: -30 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.7, delay: (idx * 0.2) + (pIdx * 0.15) }}
                                                >
                                                    {point}
                                                </motion.span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                    {/* Bottom Accent */}
                                    <div className="pt-6 border-t border-border/10 w-full flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.5em] text-primary/40 font-display"><Zap className="w-5 h-5 text-primary animate-pulse" />{profile.aboutTags?.[idx] || "ETHOS"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
