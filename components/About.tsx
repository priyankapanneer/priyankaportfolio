"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { Target, Rocket, Zap, Sparkles, Diamond } from "lucide-react";

export function About() {
    const { profile } = useContent();

    const sections = [
        {
            title: "My Vision",
            icon: <Target className="w-8 h-8 text-purple-500" />,
            content: profile.vision || "To pioneer the next generation of digital ecosystems.\nMerging technical excellence with visionary design.\nRedefining human-centric digital experiences.",
            color: "from-purple-600/30 via-purple-500/10 to-transparent",
            accent: "text-purple-500",
            glow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]",
            index: "01"
        },
        {
            title: "My Mission",
            icon: <Rocket className="w-8 h-8 text-primary" />,
            content: profile.mission || "To deliver high-performance, scalable solutions.\nEmpowering businesses through digital-first innovation.\nBuilding accessible and performant web applications.",
            color: "from-primary/30 via-primary/10 to-transparent",
            accent: "text-primary",
            glow: "group-hover:shadow-[0_0_50px_rgba(16,110,190,0.2)]",
            index: "02"
        }
    ];

    return (
        <section id="about" className="py-32 relative bg-background overflow-hidden selection:bg-primary/20">
            {/* Soft Ambient Background Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="container px-8 mx-auto relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* Simplified Professional Header */}
                    <div className="text-center mb-24 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/10 bg-primary/5 mb-2"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary font-outfit">Direction & Purpose</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter font-outfit"
                        >
                            My <span className="text-primary italic">Vision</span> & <span className="text-muted-foreground italic">Mission</span>
                        </motion.h2>
                    </div>

                    {/* High-End Mission & Vision Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.8, ease: "easeOut" }}
                                whileHover={{ y: -8 }}
                                className="group relative h-full"
                            >
                                {/* Shadow & Glow Underlay */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${section.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700`} />

                                <div className={`relative h-full p-10 md:p-14 bg-card/40 backdrop-blur-2xl border border-white/5 dark:border-white/10 rounded-[2.5rem] flex flex-col items-start gap-10 hover:border-white/20 transition-all duration-500 ${section.glow}`}>

                                    <div className="flex justify-between items-start w-full">
                                        <div className="p-5 rounded-3xl bg-background border border-border group-hover:bg-background transition-colors duration-500 shadow-xl group-hover:scale-110 transition-transform">
                                            {section.icon}
                                        </div>
                                        <span className={`text-5xl font-black text-foreground/5 font-mono select-none group-hover:opacity-20 transition-opacity ${section.accent}`}>
                                            {section.index}
                                        </span>
                                    </div>

                                    <div className="space-y-6 w-full">
                                        <h3 className={`text-3xl md:text-4xl font-black tracking-tight transition-colors font-outfit ${section.accent.replace('text-', 'group-hover:text-')}`}>
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-4">
                                            {section.content.split('\n').filter(p => (typeof p === 'string' && p.trim())).map((point, pIdx) => (
                                                <motion.li
                                                    key={pIdx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (idx * 0.2) + (pIdx * 0.1) }}
                                                    className="flex items-start gap-5 group/item cursor-default"
                                                >
                                                    <div className="mt-2 relative shrink-0">
                                                        <Diamond className={`w-3 h-3 ${section.accent} fill-current/10 group-hover/item:rotate-90 group-hover/item:scale-125 transition-all duration-700 ease-out`} />
                                                        <div className={`absolute inset-0 ${section.accent.replace('text-', 'bg-')}/40 blur-[6px] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-700`} />
                                                    </div>
                                                    <span className="text-lg md:text-xl font-light text-muted-foreground leading-snug tracking-tight group-hover:text-foreground/90 transition-colors duration-500">
                                                        {point}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="mt-auto pt-10 border-t border-border/10 w-full flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Zap className="w-5 h-5 text-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/40 font-outfit">{profile.aboutTags?.[idx] || "ETHOS"}</span>
                                        </div>
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
