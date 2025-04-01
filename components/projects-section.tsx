"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight, FileText, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectsSectionProps {
  id: string
}

interface Project {
  title: string
  description: string
  image?: string
  tags: string[]
  github?: string
  demo?: string
  report?: string
}

export default function ProjectsSection({ id }: ProjectsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isGridView, setIsGridView] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Project data with actual images and reports
  const projects: Project[] = [
    {
      title: "Visualizing RC car in Mixed Reality",
      description: "Visualization and control of an RC car in Mixed Reality. Implemented in Rust, involving contributions to the open source Bevy Engine. This was part of my master's thesis.",
      image: "/projects/thesis.png",
      tags: ["Rust", "C", "MR", "3D-graphics", "Android"],
      demo: "https://www.youtube.com/watch?v=vJKHNgr7sD4",
      report: "/reports/MasterThesis.pdf",
    },
    {
      title: "Guitar Tablature App",
      description: "Many people that play the Guitar find Guitar tablature very useful, as traditional musical notation can unncessarily hard to learn if you only care about playing the Guitar. This program parses MusicXML files, a widely used musical notation format for any instrument, into Guitar tablature and lets you play back what the song is meant to sound like.",
      image: "/projects/tabapp.png",
      tags: ["Rust", "Audio"],
      github: "https://github.com/RasmusHogslatt/cdefgab",
      demo: "https://rasmushogslatt.github.io/cdefgab/",
    },
    {
      title: "Monte Carlo Path Tracer",
      description: "A Monte Carlo pathtracer that renders realisitc reflections, refractions and direct and indirect illumination of diffuse objects.",
      image: "/projects/mcpt.png",
      tags: ["C++", "3D-Rendering", "Mathematics"],
      github: "https://github.com/RasmusHogslatt/raytracer/tree/master",
      report: "/reports/MCPT.pdf",
    },
    {
      title: "Water Simulation",
      description: "Real-time water simulation with adjustable parameters.",
      image: "/projects/pw.png",
      tags: ["C++", "OpenGL", "Shader", "GLSL", "Rendering", "Mathematics"],
      github: "https://github.com/RasmusHogslatt/Procedural-waves",
      demo: "https://www.youtube.com/watch?v=N_k3nFntPOg&t=2s",
      report: "/reports/pw.pdf",
    },
    {
      title: "Flappy Bird Clone",
      description: "Implemented my own genetic training algorithm and neural networks from scratch in Rust and used these to train birds in my own Bevy based implementation of the Flappy Bird game.",
      image: "/projects/flappybird.png",
      tags: ["Rust", "AI", "ML"],
      demo: "https://www.youtube.com/watch?v=uUAlo93hbfk",
      report: "/reports/flappybird-report.pdf",
    },
    {
      title: "DnCNN Image Denoising",
      description: "Implemented my own deep learning convolutional neural network, DnCNN, for denoising images.",
      image: "/projects/dncnn.png",
      tags: ["Python", "Deep Learning", "ML", "CNN"],
    },
    {
      title: "Legonization of Images",
      description: "A program that converts an uploaded image into a lego mosaic and calculates pieces required to reproduce with actual bricks. Support multiple brick types. Color matching was done using CIELAB.",
      image: "/projects/legonization.png",
      tags: ["Matlab", "Image Processing", "TypeScript"],
      report: "/reports/Legonization.pdf",
    },
    {
      title: "Multithreaded MD5-based password cracker",
      description: "Explored multithreading in Rust by implementing a MD5 based password cracker.",
      tags: ["Rust", "Threading"],
      github: "https://github.com/RasmusHogslatt/Password-Cracker",
    },
    {
      title: "Game of Life",
      description: "For my first project in Rust, I implemented Conway's Game of Life. The user clicks on the tiles that should be active and then starts the simulation. It is fascinating how simple rules can produce very complex patterns.",
      image: "/projects/gameoflife.png",
      tags: ["Rust"],
      github: "https://github.com/RasmusHogslatt/GameOfLife",
    },
  ]

  // Extract all unique tags
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort()

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects

  const checkScrollability = () => {
    const el = scrollContainerRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10) // 10px buffer
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Auto-switch to grid view on mobile/smaller screens
      setIsGridView(window.innerWidth < 768)
      checkScrollability()
    }

    handleResize() // Initial check

    window.addEventListener("resize", handleResize)

    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener("scroll", checkScrollability)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (el) {
        el.removeEventListener("scroll", checkScrollability)
      }
    }
  }, [])

  // Re-check scrollability when filtered projects change
  useEffect(() => {
    checkScrollability()
  }, [filteredProjects, isGridView])

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current
    if (el) {
      const scrollAmount = el.clientWidth * 0.8 // Scroll 80% of the visible width
      const newPosition = direction === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount

      el.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id={id} className="section-container border-b border-border px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold tracking-tighter">Personal Projects</h2>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Filter dropdown for mobile */}
          <div className="dropdown dropdown-end relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center h-8"
              onClick={() => document.getElementById('tag-dropdown')?.classList.toggle('hidden')}
            >
              <Filter className="h-3.5 w-3.5 mr-1" />
              {selectedTag || "Filter by tag"}
            </Button>
            <div
              id="tag-dropdown"
              className="hidden absolute right-0 mt-1 z-10 bg-card shadow-lg rounded-md border border-border p-2 max-h-48 overflow-y-auto w-36"
            >
              <div
                className="cursor-pointer hover:bg-muted p-1 rounded text-xs"
                onClick={() => {
                  setSelectedTag(null)
                  document.getElementById('tag-dropdown')?.classList.add('hidden')
                }}
              >
                All projects
              </div>
              {allTags.map(tag => (
                <div
                  key={tag}
                  className="cursor-pointer hover:bg-muted p-1 rounded text-xs"
                  onClick={() => {
                    setSelectedTag(tag)
                    document.getElementById('tag-dropdown')?.classList.add('hidden')
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded-md bg-muted p-0.5 text-muted-foreground">
            <Button
              variant={isGridView ? "ghost" : "default"}
              size="sm"
              className="h-7 rounded-sm text-xs px-2"
              onClick={() => setIsGridView(false)}
            >
              List
            </Button>
            <Button
              variant={!isGridView ? "ghost" : "default"}
              size="sm"
              className="h-7 rounded-sm text-xs px-2"
              onClick={() => setIsGridView(true)}
            >
              Grid
            </Button>
          </div>

          {/* Scroll buttons (only shown for list view) */}
          {!isGridView && (
            <div className="flex gap-1 ml-auto sm:ml-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn("h-8 w-8", !canScrollLeft && "opacity-50 cursor-not-allowed")}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn("h-8 w-8", !canScrollRight && "opacity-50 cursor-not-allowed")}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Selected tag indicator */}
      {selectedTag && (
        <div className="mb-3 flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Showing projects with tag:</span>
          <Badge variant="secondary" className="text-xs">
            {selectedTag}
            <button
              className="ml-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedTag(null)}
            >
              ×
            </button>
          </Badge>
        </div>
      )}

      {isGridView ? (
        // Grid view for mobile
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden border-muted bg-card hover:bg-card/80 transition-colors flex flex-col h-full"
            >
              {project.image && (
                <div className="relative w-full h-36 bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
              )}
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm">{project.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-2 pb-0 flex-grow">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 cursor-pointer"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-2 flex flex-wrap gap-1.5 justify-start">
                {project.github && (
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-2" asChild>
                    <Link href={project.github}>
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </Link>
                  </Button>
                )}
                {project.report && (
                  <Button variant="secondary" size="sm" className="h-7 text-[10px] px-2" asChild>
                    <Link href={project.report}>
                      <FileText className="mr-1 h-3 w-3" />
                      PDF
                    </Link>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" className="h-7 text-[10px] px-2" asChild>
                    <Link href={project.demo}>
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Horizontal scrolling for larger screens
        <>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-muted bg-card hover:bg-card/80 transition-colors min-w-[240px] max-w-[240px] flex-shrink-0 flex flex-col"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative w-full h-32 bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm">{project.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-2 pb-0 flex-grow">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 cursor-pointer"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-2 flex gap-1 justify-between">
                  <div className="flex gap-1">
                    {project.github && (
                      <Button variant="outline" size="sm" className="h-7 text-[10px] px-2" asChild>
                        <Link href={project.github}>
                          <Github className="mr-1 h-3 w-3" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.report && (
                      <Button variant="secondary" size="sm" className="h-7 text-[10px] px-2" asChild>
                        <Link href={project.report}>
                          <FileText className="mr-1 h-3 w-3" />
                          PDF
                        </Link>
                      </Button>
                    )}
                  </div>
                  {project.demo && (
                    <Button size="sm" className="h-7 text-[10px] px-2 ml-auto" asChild>
                      <Link href={project.demo}>
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Scroll indicator (only for list view) */}
          {!isGridView && filteredProjects.length > 0 && (
            <div className="flex justify-center gap-1 mt-2">
              <div className="text-xs text-muted-foreground flex items-center">
                <ChevronLeft className="h-3 w-3 mr-1" />
                <span>Scroll to see more projects</span>
                <ChevronRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty state if no projects match filter */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No projects match the selected filter.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setSelectedTag(null)}
          >
            Show all projects
          </Button>
        </div>
      )}
    </section>
  )
}