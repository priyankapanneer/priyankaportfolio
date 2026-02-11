"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Download } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export function Contact() {
    const { profile } = useContent();
    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 text-center shadow-xl overflow-hidden relative"
                >
                    {/* Decorational Circles */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>

                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Let's Connect!</h2>
                    <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl transition-all backdrop-blur-sm">
                            <Mail size={24} className="text-accent" />
                            <span className="font-semibold">{profile.email}</span>
                        </a>
                        <a href={`tel:${profile.phone}`} className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl transition-all backdrop-blur-sm">
                            <Phone size={24} className="text-accent" />
                            <span className="font-semibold">{profile.phone}</span>
                        </a>
                    </div>

                    <div className="flex justify-center gap-8 items-center">
                        <a href={profile.github} target="_blank" className="hover:text-accent transition-transform hover:scale-125">
                            <Github size={28} />
                        </a>
                        <a href={profile.linkedin} target="_blank" className="hover:text-accent transition-transform hover:scale-125">
                            <Linkedin size={28} />
                        </a>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
