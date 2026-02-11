"use client";

import { useContent } from "@/context/ContentContext";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function Blog() {
    const { blogs } = useContent();

    return (
        <section id="blog" className="py-20 bg-muted/20">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-heading font-bold mb-4">
                        Latest <span className="text-primary">Articles</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Sharing my thoughts on Cloud Computing, DevOps, and Web Development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <motion.a
                            key={idx}
                            href={blog.link}
                            target="_blank"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-card border border-border p-6 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <BookOpen size={20} />
                                </span>
                                <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {blog.date}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
