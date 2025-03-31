import Link from "next/link"
import AboutSection from "@/components/about-section"
import EducationSection from "@/components/education-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import HobbiesSection from "@/components/hobbies-section"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar Navigation - Always visible */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content flex-1">
        {/* Hero Section - Reduced height */}
        <section className="relative flex items-center justify-center h-[70vh] bg-background">
          <div className="container px-4 md:px-6 text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Hello, I'm <span className="text-primary">Rasmus Hogslätt</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Software Developer
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                About Me
              </Link>
              <Link
                href="#experience"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Experience
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content - More compact sections */}
        <div className="container px-4 md:px-6 mx-auto">
          {/* About Section */}
          <AboutSection id="about" />

          {/* Education Section - New section for master's degree */}
          <EducationSection id="education" />

          {/* Experience Section */}
          <ExperienceSection id="experience" />

          {/* Projects Section */}
          <ProjectsSection id="projects" />

          {/* Hobbies Section */}
          <HobbiesSection id="hobbies" />
        </div>

        {/* Footer */}
        <footer className="py-4 border-t mt-8 bg-card">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/yourusername" className="text-muted-foreground hover:text-primary">
                GitHub
              </Link>
              <Link href="https://linkedin.com/in/yourusername" className="text-muted-foreground hover:text-primary">
                LinkedIn
              </Link>
              <Link href="mailto:your.email@example.com" className="text-muted-foreground hover:text-primary">
                Email
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

