"use client";

import { useState } from "react";
import { useContent, VisualSettings } from "@/context/ContentContext";
import { motion } from "framer-motion";
import { Save, LogOut, LayoutDashboard, User, Code, Folder, Palette, Eraser, Plus, Trash2, Upload, GraduationCap, Award, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type AdminTab = "profile" | "skills" | "projects" | "education" | "certificates" | "visuals";

export default function AdminPage() {
    const {
        profile, skills, projects, education, certificates, visuals,
        updateContent, saveChanges, resetToDefaults
    } = useContent();

    const [activeTab, setActiveTab] = useState<AdminTab>("profile");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin") setIsAuthenticated(true);
        else alert("Incorrect password");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                alert("File too large! Please choose an image under 500KB to save storage space.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                updateContent("profile", { ...profile, avatarUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit for PDF
                alert("Resume too large! Please keep it under 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                updateContent("profile", { ...profile, resumeUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // Generic Add/Delete Handlers
    const addSkill = (categoryIndex: number) => {
        const newSkills = [...skills];
        newSkills[categoryIndex].items.push({ name: "New Skill", icon: "Circle", level: "Beginner", color: "#000000" });
        updateContent("skills", newSkills);
    };

    const deleteSkill = (categoryIndex: number, skillIndex: number) => {
        if (!confirm("Delete this skill?")) return;
        const newSkills = [...skills];
        newSkills[categoryIndex].items.splice(skillIndex, 1);
        updateContent("skills", newSkills);
    };

    const addCategory = () => {
        const newSkills = [...skills, { 
            id: `cat-${Date.now()}`, 
            title: "New Category", 
            items: [{ name: "New Skill", icon: "Circle", level: "Beginner", color: "#000000" }] 
        }];
        updateContent("skills", newSkills);
    };

    const deleteCategory = (index: number) => {
        if (!confirm("Delete this entire category and all its skills?")) return;
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        updateContent("skills", newSkills);
    };

    const addProject = () => {
        const newProjects = [...projects, {
            title: "New Project",
            description: "Project Description...",
            tech: ["React"],
            code: "#",
            image: ""
        }];
        updateContent("projects", newProjects);
    };

    const deleteProject = (index: number) => {
        if (!confirm("Delete this project?")) return;
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        updateContent("projects", newProjects);
    };

    const addEducation = () => {
        const newEdu = [...education, {
            degree: "Degree Title",
            institution: "University/School",
            year: "2024",
            description: "Description of studies...",
            fileUrl: ""
        }];
        updateContent("education", newEdu);
    };

    const deleteEducation = (index: number) => {
        if (!confirm("Delete this education entry?")) return;
        const newEdu = [...education];
        newEdu.splice(index, 1);
        updateContent("education", newEdu);
    };

    const addCertificate = () => {
        const newCert = [...certificates, {
            title: "Certificate Name",
            issuer: "Issuer Organization",
            date: "2024",
            link: "#"
        }];
        updateContent("certificates", newCert);
    };

    const deleteCertificate = (index: number) => {
        if (!confirm("Delete this certificate?")) return;
        const newCert = [...certificates];
        newCert.splice(index, 1);
        updateContent("certificates", newCert);
    };


    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] opacity-20"></div>
                <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl shadow-2xl relative z-10 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full p-3 bg-muted border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="text-primary" />
                        <h1 className="font-bold text-xl">CMS Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors">
                            <LogOut size={16} /> Back to Website
                        </Link>
                        <button onClick={resetToDefaults} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                            <Eraser size={16} /> Reset
                        </button>
                        <button onClick={saveChanges} className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
                            <Save size={18} /> Push Changes
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 space-y-2">
                    {[
                        { id: "profile", label: "Profile Details", icon: User },
                        { id: "skills", label: "Skills Management", icon: Code },
                        { id: "projects", label: "Projects Showcase", icon: Folder },
                        { id: "education", label: "Education", icon: GraduationCap },
                        { id: "certificates", label: "Certificates", icon: Award },
                        { id: "visuals", label: "Visual Aesthetics", icon: Palette },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as AdminTab)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Editor Area */}
                <div className="lg:col-span-9 bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[500px]">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                                {/* Photo Upload */}
                                <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-xl border border-border">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                                        <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold mb-2">Profile Photo</label>
                                        <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 w-fit">
                                            <Upload size={16} /> Upload New Photo
                                            <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                                        </label>
                                        <p className="text-xs text-muted-foreground mt-2">Recommended: Square JPG/PNG. Saved locally.</p>
                                    </div>
                                    <div className="flex-1 border-l border-border pl-6">
                                        <label className="block text-sm font-semibold mb-2">Professional Resume (PDF)</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 w-fit">
                                                <Upload size={16} /> Upload Resume
                                                <input type="file" onChange={handleResumeUpload} className="hidden" accept=".pdf" />
                                            </label>
                                            {profile.resumeUrl && profile.resumeUrl.startsWith('data:') && (
                                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">✅ Attached</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">Max Size: 2MB. This fixes the 404 error.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-bold text-muted-foreground">Full Name</label>
                                        <input
                                            value={profile.name}
                                            onChange={(e) => updateContent("profile", { ...profile, name: e.target.value })}
                                            className="w-full p-2 bg-muted rounded-lg border border-input"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-bold text-muted-foreground">Role Title</label>
                                        <input
                                            value={profile.role}
                                            onChange={(e) => updateContent("profile", { ...profile, role: e.target.value })}
                                            className="w-full p-2 bg-muted rounded-lg border border-input"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-bold text-muted-foreground">About Me - Primary Summary</label>
                                    <textarea
                                        value={profile.summary}
                                        onChange={(e) => updateContent("profile", { ...profile, summary: e.target.value })}
                                        className="w-full p-2 bg-muted rounded-lg border border-input h-32 resize-none"
                                        placeholder="The main bio text shown in the About section..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-bold text-muted-foreground">About Me - Tech Highlights (Comma Separated)</label>
                                    <input
                                        value={profile.aboutTags?.join(", ") || "Architecture, Innovation, Problem Solving, Scalability"}
                                        onChange={(e) => {
                                            const tags = e.target.value.split(",").map(t => t.trim());
                                            updateContent("profile", { ...profile, aboutTags: tags });
                                        }}
                                        className="w-full p-2 bg-muted rounded-lg border border-input"
                                        placeholder="Architecture, Innovation, etc..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-bold text-muted-foreground">My Vision</label>
                                    <textarea
                                        value={profile.vision}
                                        onChange={(e) => updateContent("profile", { ...profile, vision: e.target.value })}
                                        className="w-full p-2 bg-muted rounded-lg border border-input h-32"
                                        placeholder="Your professional vision statement..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs uppercase font-bold text-muted-foreground">My Mission</label>
                                    <textarea
                                        value={profile.mission}
                                        onChange={(e) => updateContent("profile", { ...profile, mission: e.target.value })}
                                        className="w-full p-2 bg-muted rounded-lg border border-input h-32"
                                        placeholder="Your professional mission statement..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-bold text-muted-foreground">Email</label>
                                        <input value={profile.email} onChange={(e) => updateContent("profile", { ...profile, email: e.target.value })} className="w-full p-2 bg-muted rounded-lg border border-input" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-bold text-muted-foreground">Phone</label>
                                        <input value={profile.phone} onChange={(e) => updateContent("profile", { ...profile, phone: e.target.value })} className="w-full p-2 bg-muted rounded-lg border border-input" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs uppercase font-bold text-muted-foreground">Github URL</label>
                                        <input value={profile.github} onChange={(e) => updateContent("profile", { ...profile, github: e.target.value })} className="w-full p-2 bg-muted rounded-lg border border-input" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "skills" && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Manage Skills</h2>
                                    <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow hover:bg-primary/90">
                                        <Plus size={16} /> Add New Category
                                    </button>
                                </div>

                                {Array.isArray(skills) && skills.map((category: any, catIdx: number) => (
                                    <div key={category.id} className="space-y-4 p-6 bg-muted/20 border border-border rounded-2xl relative group/cat">
                                        <button 
                                            onClick={() => deleteCategory(catIdx)} 
                                            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover/cat:opacity-100 transition-opacity"
                                            title="Delete Category"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="space-y-1 max-w-md">
                                            <label className="text-xs uppercase font-bold text-muted-foreground">Category Title</label>
                                            <input
                                                value={category.title}
                                                onChange={e => {
                                                    const newSkills = [...skills];
                                                    newSkills[catIdx].title = e.target.value;
                                                    updateContent("skills", newSkills);
                                                }}
                                                className="w-full p-2 bg-card rounded-lg border border-input text-lg font-bold"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Skills in this category</h3>
                                                <button onClick={() => addSkill(catIdx)} className="text-xs flex items-center gap-1 text-primary hover:underline font-bold">
                                                    <Plus size={14} /> Add Skill
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {category.items.map((skill: any, skillIdx: number) => (
                                                    <div key={skillIdx} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border group">
                                                        <div
                                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                                            style={{ backgroundColor: skill.color }}
                                                        >
                                                            {skill.name[0]}
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <input
                                                                value={skill.name}
                                                                onChange={(e) => {
                                                                    const newSkills = [...skills];
                                                                    const newItems = [...newSkills[catIdx].items];
                                                                    newItems[skillIdx] = { ...newItems[skillIdx], name: e.target.value };
                                                                    newSkills[catIdx] = { ...newSkills[catIdx], items: newItems };
                                                                    updateContent("skills", newSkills);
                                                                }}
                                                                className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 p-0"
                                                            />
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="color"
                                                                    value={skill.color}
                                                                    onChange={(e) => {
                                                                        const newSkills = [...skills];
                                                                        const newItems = [...newSkills[catIdx].items];
                                                                        newItems[skillIdx] = { ...newItems[skillIdx], color: e.target.value };
                                                                        newSkills[catIdx] = { ...newSkills[catIdx], items: newItems };
                                                                        updateContent("skills", newSkills);
                                                                    }}
                                                                    className="w-6 h-6 rounded overflow-hidden cursor-pointer border-none p-0"
                                                                />
                                                                <select
                                                                    value={skill.level}
                                                                    onChange={(e) => {
                                                                        const newSkills = [...skills];
                                                                        const newItems = [...newSkills[catIdx].items];
                                                                        newItems[skillIdx] = { ...newItems[skillIdx], level: e.target.value };
                                                                        newSkills[catIdx] = { ...newSkills[catIdx], items: newItems };
                                                                        updateContent("skills", newSkills);
                                                                    }}
                                                                    className="text-xs bg-muted rounded border-transparent"
                                                                >
                                                                    <option>Beginner</option>
                                                                    <option>Intermediate</option>
                                                                    <option>Advanced</option>
                                                                    <option>Expert</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => deleteSkill(catIdx, skillIdx)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Projects</h2>
                                    <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow hover:bg-primary/90">
                                        <Plus size={16} /> Add Project
                                    </button>
                                </div>

                                {projects.map((project, idx) => (
                                    <div key={idx} className="p-4 bg-muted/30 border border-border rounded-xl space-y-3 relative group">
                                        <button
                                            onClick={() => deleteProject(idx)}
                                            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="flex items-center gap-4 p-3 bg-muted rounded-xl border border-border">
                                            <div className="w-20 h-12 rounded bg-background border border-input overflow-hidden relative">
                                                {project.image ? (
                                                    <img src={project.image} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-[8px] font-bold text-muted-foreground uppercase py-1 px-2 text-center">No Image</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <label className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 w-fit text-[10px] font-bold uppercase tracking-wider">
                                                    <Upload size={14} /> {project.image ? "Change Image" : "Upload Image"}
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 500 * 1024) {
                                                                    alert("File too large! Max 500KB.");
                                                                    return;
                                                                }
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    const newProjects = [...projects];
                                                                    newProjects[idx].image = reader.result as string;
                                                                    updateContent("projects", newProjects);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {project.image && (
                                                <button
                                                    onClick={() => {
                                                        const newProjects = [...projects];
                                                        newProjects[idx].image = "";
                                                        updateContent("projects", newProjects);
                                                    }}
                                                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <input
                                            value={project.title}
                                            onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[idx].title = e.target.value;
                                                updateContent("projects", newProjects);
                                            }}
                                            className="w-full bg-transparent text-lg font-bold border-b border-border focus:border-primary outline-none pb-1 mr-8"
                                            placeholder="Project Title"
                                        />
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => {
                                                const newProjects = [...projects];
                                                newProjects[idx].description = e.target.value;
                                                updateContent("projects", newProjects);
                                            }}
                                            className="w-full bg-transparent text-sm text-muted-foreground border-none resize-none h-16 focus:ring-0 p-0"
                                            placeholder="Description..."
                                        />
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-muted-foreground uppercase">Tech Stack (Comma Separated)</label>
                                            <input
                                                value={project.tech.join(", ")}
                                                onChange={(e) => {
                                                    const newProjects = [...projects];
                                                    newProjects[idx].tech = e.target.value.split(",").map(t => t.trim());
                                                    updateContent("projects", newProjects);
                                                }}
                                                className="w-full p-2 bg-muted rounded-lg border border-input text-sm"
                                                placeholder="React, Next.js, Node.js"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-1">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">Source Code URL</label>
                                                <input
                                                    value={project.code}
                                                    onChange={(e) => {
                                                        const newProjects = [...projects];
                                                        newProjects[idx].code = e.target.value;
                                                        updateContent("projects", newProjects);
                                                    }}
                                                    className="w-full p-2 bg-muted rounded-lg text-xs"
                                                    placeholder="Code URL"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "education" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Education</h2>
                                    <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow hover:bg-primary/90">
                                        <Plus size={16} /> Add Education
                                    </button>
                                </div>
                                {education.map((edu, idx) => (
                                    <div key={idx} className="p-4 bg-muted/30 border border-border rounded-xl space-y-3 relative group">
                                        <button onClick={() => deleteEducation(idx)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input value={edu.degree} onChange={(e) => { const n = [...education]; n[idx].degree = e.target.value; updateContent("education", n) }} className="p-2 bg-muted rounded-lg font-bold" placeholder="Degree" />
                                            <input value={edu.year} onChange={(e) => { const n = [...education]; n[idx].year = e.target.value; updateContent("education", n) }} className="p-2 bg-muted rounded-lg text-right font-mono" placeholder="Year" />
                                        </div>
                                        <input value={edu.institution} onChange={(e) => { const n = [...education]; n[idx].institution = e.target.value; updateContent("education", n) }} className="w-full p-2 bg-muted rounded-lg text-sm" placeholder="Institution" />
                                        <textarea value={edu.description} onChange={(e) => { const n = [...education]; n[idx].description = e.target.value; updateContent("education", n) }} className="w-full p-2 bg-muted rounded-lg text-sm h-16 resize-none" placeholder="Description" />

                                        {/* Certificate Upload */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex-1">
                                                <label className="flex items-center gap-2 px-3 py-2 bg-muted border border-input rounded-lg cursor-pointer hover:bg-muted/80 w-fit text-xs font-semibold">
                                                    <Upload size={14} /> Upload Certificate Image/PDF
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 2 * 1024 * 1024) {
                                                                    alert("File too large! Please choose a file under 2MB.");
                                                                    return;
                                                                }
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    const n = [...education];
                                                                    n[idx].fileUrl = reader.result as string; // Store Base64
                                                                    updateContent("education", n);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {/* Preview if exists */}
                                            {edu.fileUrl && edu.fileUrl.startsWith('data:image') && (
                                                <div className="w-10 h-10 rounded border border-border overflow-hidden relative group-hover/cert:opacity-100">
                                                    <img src={edu.fileUrl} alt="Cert" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            {edu.fileUrl && edu.fileUrl.startsWith('data:application/pdf') && (
                                                <div className="w-10 h-10 rounded border border-border overflow-hidden relative flex items-center justify-center bg-white">
                                                    <span className="text-xs font-bold text-primary">PDF</span>
                                                </div>
                                            )}
                                            {edu.fileUrl && (
                                                <button
                                                    onClick={() => {
                                                        if (edu.fileUrl.startsWith('data:image')) {
                                                            const win = window.open();
                                                            if (win) {
                                                                win.document.write(`
                                                                        <html>
                                                                            <head><title>Certificate</title></head>
                                                                            <body style='margin:0;display:flex;align-items:center;justify-content:center;background:#111;'>
                                                                                <img src='${edu.fileUrl}' alt='Certificate' style='max-width:100vw;max-height:100vh;object-fit:contain;box-shadow:0 0 20px rgba(0,0,0,0.5);'/>
                                                                            </body>
                                                                        </html>
                                                                    `);
                                                                win.document.close();
                                                            }
                                                        } else if (edu.fileUrl.startsWith('data:application/pdf')) {
                                                            window.open(edu.fileUrl, '_blank');
                                                        }
                                                    }}
                                                    className="ml-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow hover:bg-primary/90 transition-all"
                                                >
                                                    View Certificate
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "certificates" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Certificates</h2>
                                    <button onClick={addCertificate} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow hover:bg-primary/90">
                                        <Plus size={16} /> Add Certificate
                                    </button>
                                </div>
                                {certificates.map((cert, idx) => (
                                    <div key={idx} className="p-4 bg-muted/30 border border-border rounded-xl space-y-3 relative group">
                                        <button onClick={() => deleteCertificate(idx)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input value={cert.title} onChange={(e) => { const n = [...certificates]; n[idx].title = e.target.value; updateContent("certificates", n) }} className="p-2 bg-muted rounded-lg font-bold" placeholder="Certificate Title" />
                                            <input value={cert.date} onChange={(e) => { const n = [...certificates]; n[idx].date = e.target.value; updateContent("certificates", n) }} className="p-2 bg-muted rounded-lg text-right font-mono" placeholder="Date" />
                                        </div>
                                        <input value={cert.issuer} onChange={(e) => { const n = [...certificates]; n[idx].issuer = e.target.value; updateContent("certificates", n) }} className="w-full p-2 bg-muted rounded-lg text-sm" placeholder="Issuer" />
                                        <input value={cert.link} onChange={(e) => { const n = [...certificates]; n[idx].link = e.target.value; updateContent("certificates", n) }} className="w-full p-2 bg-muted rounded-lg text-sm text-primary" placeholder="Credential URL" />
                                        {/* Certificate Image/PDF Upload */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex-1">
                                                <label className="flex items-center gap-2 px-3 py-2 bg-muted border border-input rounded-lg cursor-pointer hover:bg-muted/80 w-fit text-xs font-semibold">
                                                    <Upload size={14} /> Upload Certificate Image/PDF
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 2 * 1024 * 1024) {
                                                                    alert("File too large! Please choose a file under 2MB.");
                                                                    return;
                                                                }
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    const n = [...certificates];
                                                                    n[idx].fileUrl = reader.result as string; // Store Base64
                                                                    updateContent("certificates", n);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            {/* Preview if exists */}
                                            {cert.fileUrl && cert.fileUrl.startsWith('data:image') && (
                                                <div className="w-10 h-10 rounded border border-border overflow-hidden relative group-hover/cert:opacity-100">
                                                    <img src={cert.fileUrl} alt="Cert" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            {cert.fileUrl && cert.fileUrl.startsWith('data:application/pdf') && (
                                                <div className="w-10 h-10 rounded border border-border overflow-hidden relative flex items-center justify-center bg-white">
                                                    <span className="text-xs font-bold text-primary">PDF</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {activeTab === "visuals" && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-bold">Visual Aesthetics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <label className="font-semibold block">Blob 1 (Left)</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["bg-purple-300", "bg-blue-300", "bg-red-300", "bg-green-300"].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateContent("visuals", { ...visuals, blobColors: { ...visuals.blobColors, first: `${color} dark:opacity-20` } })}
                                                    className={`w-8 h-8 rounded-full ${color} border-2 ${visuals.blobColors.first.includes(color) ? "border-primary" : "border-transparent"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="font-semibold block">Blob 2 (Right)</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["bg-yellow-300", "bg-orange-300", "bg-pink-300", "bg-cyan-300"].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateContent("visuals", { ...visuals, blobColors: { ...visuals.blobColors, second: `${color} dark:opacity-20` } })}
                                                    className={`w-8 h-8 rounded-full ${color} border-2 ${visuals.blobColors.second.includes(color) ? "border-primary" : "border-transparent"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main >
        </div >
    );
}
