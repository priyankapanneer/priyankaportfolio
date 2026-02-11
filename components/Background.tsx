"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

import { useEffect, useRef, useState } from "react";

function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [theme, setTheme] = useState("light");

    // Observe attribute changes to react to theme toggle
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "data-theme") {
                    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
                    setTheme(currentTheme);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        // Initial check
        setTheme(document.documentElement.getAttribute("data-theme") || "light");

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; vx: number; vy: number; size: number; phase: number; speed: number }[] = [];

        const particleCount = 60;
        const connectionDistance = 140;

        // Improved color parser to handle hex and rgb/rgba formats
        const parseColor = (color: string) => {
            // Handle rgb/rgba
            if (color.startsWith('rgb')) {
                const values = color.match(/\d+/g);
                if (values && values.length >= 3) {
                    return { r: parseInt(values[0]), g: parseInt(values[1]), b: parseInt(values[2]) };
                }
            }
            // Handle hex
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color.trim());
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 128, g: 128, b: 128 }; // Gray fallback
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 2.5 + 0.5,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.02 + Math.random() * 0.04
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Get accurate color from CSS variables (Source of Truth)
            // This ensures "Light Theme = Dark Color" and vice versa automatically
            const style = getComputedStyle(document.documentElement);
            const foreground = style.getPropertyValue('--foreground') || '#000000';
            const { r, g, b } = parseColor(foreground);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.phase += p.speed;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const opacity = Math.abs(Math.sin(p.phase));

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const lineOpacity = 1 - dist / connectionDistance;
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-init when theme attribute changes

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-90" />;
}

export function Background() {
    const { visuals } = useContent();

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
            {/* Connected Sparkling Dots */}
            <ParticleNetwork />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] opacity-20"></div>
        </div>
    );
}
