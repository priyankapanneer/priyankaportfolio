"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" }, // Tabs section
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container px-4 flex justify-between items-center">
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xl font-black text-primary font-outfit tracking-tighter flex items-center gap-1 group"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-500 to-primary background-animate">
                        PRIYANKA
                    </span>
                    <motion.span
                        animate={{
                            opacity: [1, 0.5, 1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-foreground/40 group-hover:text-primary transition-colors"
                    >
                        P
                    </motion.span>
                </motion.a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors relative group font-outfit"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <div className="pl-4 border-l border-border/50">
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium hover:text-primary transition-colors block py-2"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
