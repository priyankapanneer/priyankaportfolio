import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeatureTabs } from "@/components/Tabs";
import { Contact } from "@/components/Contact";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <About />

      <section className="container px-4 py-20">
        <h2 className="text-3xl font-heading font-bold text-center mb-4">
          My <span className="text-primary">Journey</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          A timeline of my professional growth, technical expertise, and featured work.
        </p>
        <FeatureTabs />
      </section>

      <Contact />

      <footer className="bg-card border-t border-border py-8">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground font-medium">
            &copy; 2026 Priyanka Panneerselvam. All rights reserved.
          </p>
          <Link href="/admin" className="text-xs text-muted-foreground/50 hover:text-primary mt-4 inline-block">
            Admin Access
          </Link>
        </div>
      </footer>
    </main>
  );
}
