"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as defaultData from "@/lib/data";

// Type definitions based on data.ts structure
type Profile = typeof defaultData.profile & { aboutTags: string[] };
type Skills = typeof defaultData.skills;
type Project = typeof defaultData.projects[0] & { image?: string };
type Education = typeof defaultData.education[0] & { certificateUrl?: string };
type Certificate = typeof defaultData.certificates[0];
type Achievement = typeof defaultData.achievements[0];
type Blog = typeof defaultData.blogs[0];

// Visual Settings Type
export type VisualSettings = {
    blobColors: {
        first: string;
        second: string;
        third: string;
    };
};

type ContentContextType = {
    profile: Profile;
    skills: Skills;
    projects: Project[];
    education: Education[];
    certificates: Certificate[];
    achievements: Achievement[];
    blogs: Blog[];
    visuals: VisualSettings;
    updateContent: (key: string, value: any) => void;
    saveChanges: () => void;
    resetToDefaults: () => void;
};

const defaultVisuals: VisualSettings = {
    blobColors: {
        first: "bg-purple-300 dark:bg-purple-900",
        second: "bg-yellow-300 dark:bg-yellow-900",
        third: "bg-pink-300 dark:bg-pink-900",
    }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
    // Initialize state with default data
    const [content, setContent] = useState({
        profile: defaultData.profile,
        skills: defaultData.skills,
        projects: defaultData.projects,
        education: defaultData.education,
        certificates: defaultData.certificates,
        achievements: defaultData.achievements,
        blogs: defaultData.blogs,
        visuals: defaultVisuals
    });

    const [isLoaded, setIsLoaded] = useState(false);

    // Load from Server on mount
    useEffect(() => {
        const loadContent = async () => {
            try {
                const response = await fetch('/api/content');
                if (response.ok) {
                    const savedData = await response.json();
                    if (savedData) {
                        setContent(prev => ({ ...prev, ...savedData }));
                    }
                }
            } catch (e) {
                console.error("Failed to load content from server", e);
            } finally {
                setIsLoaded(true);
            }
        };
        loadContent();
    }, []);

    const updateContent = (key: string, value: any) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Server error");
            }

            alert("Changes Saved to Server! \n\nUpdates are now live for ALL visitors.");
        } catch (e: any) {
            if (e.message?.includes("Payload Too Large")) {
                alert("⚠️ Save Failed: Data too large for server (Check your images).");
            } else {
                console.error("Failed to save", e);
                alert("Failed to save changes: " + e.message);
            }
        }
    };

    const resetToDefaults = async () => {
        if (confirm("Are you sure? This will wipe the SERVER database and revert to code defaults.")) {
            try {
                const defaultState = {
                    profile: defaultData.profile,
                    skills: defaultData.skills,
                    projects: defaultData.projects,
                    education: defaultData.education,
                    certificates: defaultData.certificates,
                    achievements: defaultData.achievements,
                    blogs: defaultData.blogs,
                    visuals: defaultVisuals
                };

                const response = await fetch('/api/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(defaultState)
                });

                if (response.ok) {
                    window.location.reload();
                }
            } catch (e) {
                alert("Failed to reset");
            }
        }
    };

    if (!isLoaded) return null; // or a loading spinner

    return (
        <ContentContext.Provider value={{
            ...content,
            updateContent,
            saveChanges,
            resetToDefaults
        }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
}
