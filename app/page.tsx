"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AboutSection from "@/components/about-section"
import EducationSection from "@/components/education-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import HobbiesSection from "@/components/hobbies-section"
import Sidebar from "@/components/sidebar"
import { useMobile } from "@/hooks/use-mobile"
import { Menu } from "lucide-react"

export default function Home() {
  const isMobile = useMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Close sidebar when transitioning from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  // Handle clicks on nav links to close mobile sidebar
  const handleNavLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - Always visible on desktop */}
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <Sidebar isOpen={true} onClose={() => { }} />
        </div>
      )}

      {/* Mobile Sidebar - Only visible when toggled */}
      {isMobile && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavLinkClick={handleNavLinkClick}
        />
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-card rounded-lg shadow-lg border border-border"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Main Content - Adjust padding for desktop vs mobile */}
      <div className={`main-content flex-1 ${!isMobile ? 'ml-0' : ''}`}>
        {/* Hero Section - Responsive height */}
        <section className="relative flex items-center justify-center h-[50vh] md:h-[70vh] bg-background">
          <div className="container px-4 md:px-6 text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Hello, I'm <span className="text-primary">Rasmus Hogslätt</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
              Software Developer
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="#about"
                onClick={handleNavLinkClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                About Me
              </Link>
              <Link
                href="#experience"
                onClick={handleNavLinkClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Experience
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content - Adjusted padding for mobile */}
        <div className="container px-4 md:px-6 mx-auto">
          {/* About Section */}
          <AboutSection id="about" />

          {/* Education Section */}
          <EducationSection id="education" />

          {/* Experience Section */}
          <ExperienceSection id="experience" />

          {/* Projects Section */}
          <ProjectsSection id="projects" />

          {/* Hobbies Section */}
          <HobbiesSection id="hobbies" />
        </div>

        {/* Footer - Responsive layout */}
        <footer className="py-4 border-t mt-8 bg-card">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rasmus Hogslätt. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="https://github.com/RasmusHogslatt" className="text-muted-foreground hover:text-primary">
                GitHub
              </Link>
              <Link href="https://www.linkedin.com/in/rasmushogslatt/" className="text-muted-foreground hover:text-primary">
                LinkedIn
              </Link>
              <Link href="mailto:r.hogslatt@gmail.com" className="text-muted-foreground hover:text-primary">
                Email
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}