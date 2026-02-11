"use client";

import { motion } from "framer-motion";
import { Download, Mail, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";
import { useState, useEffect } from "react";

function TypingText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Reset if text changes
        setDisplayedText("");
        setIndex(0);
    }, [text]);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, 100); // Typing speed
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="">
            {displayedText}
            <span className="animate-pulse text-primary ml-1">|</span>
        </span>
    );
}

export function Hero() {
    const { profile } = useContent();

    const containerVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: import("framer-motion").Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4">
            <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">

                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center lg:text-left order-2 lg:order-1 relative z-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-block px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.3em] uppercase font-outfit"
                    >
                        {profile.role}
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mb-8 leading-[0.9] tracking-tighter font-outfit min-h-[140px] md:min-h-[160px] lg:min-h-[180px]"
                    >
                        <span className="text-2xl md:text-3xl font-light text-muted-foreground italic mb-4 block">Hi, I'm</span>
                        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-primary to-purple-600 background-animate inline-block px-4 -mx-4 pb-2 leading-tight">
                            <TypingText text={profile.name} />
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-muted-foreground/80 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light tracking-tight"
                    >
                        {profile.summary}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12"
                    >
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-[11px] hover:shadow-[0_0_20px_rgba(16,110,190,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            Contact Me
                        </a>

                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center lg:justify-start gap-6 text-muted-foreground"
                    >
                        {[
                            { icon: Github, href: profile.github },
                            { icon: Linkedin, href: profile.linkedin },
                            { icon: Mail, href: `mailto:${profile.email}` }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                className="p-3 bg-card border border-border rounded-full hover:text-primary hover:border-primary hover:shadow-[0_0_15px_rgba(16,110,190,0.3)] transition-all transform hover:scale-110 duration-300"
                            >
                                <social.icon size={24} />
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring" }}
                    className="relative order-1 lg:order-2 flex justify-center"
                >
                    {/* Abstract Background Shapes */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl opacity-40 animate-blob"></div>

                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-background shadow-2xl overflow-hidden ring-4 ring-cyan-500/20 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                        {/* Placeholder for Profile Image - User needs to replace /profile-placeholder.jpg */}
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                            {/* If image exists, it shows. Else fallback text */}
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = "Add profile.jpg to public/";
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
