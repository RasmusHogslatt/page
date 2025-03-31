"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function CareerTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isMobile = useMobile()

  // Sample timeline data - replace with your own career milestones
  const timelineEvents = [
    {
      year: "2015",
      title: "Career Start",
      description: "Started as Junior Developer at StartUp Ventures",
    },
    {
      year: "2017",
      title: "New Role",
      description: "Joined Digital Innovations as Full Stack Developer",
    },
    {
      year: "2020",
      title: "Promotion",
      description: "Promoted to Senior Web Developer at Tech Solutions Inc.",
    },
    {
      year: "2022",
      title: "Project Lead",
      description: "Led major client project with team of 5 developers",
    },
    {
      year: "2023",
      title: "Award",
      description: "Received industry recognition for innovative solution",
    },
  ]

  // Handle horizontal scrolling for the timeline
  const handleScroll = () => {
    if (timelineRef.current) {
      const scrollPosition = timelineRef.current.scrollLeft
      const itemWidth = timelineRef.current.scrollWidth / timelineEvents.length
      const newActiveIndex = Math.round(scrollPosition / itemWidth)
      setActiveIndex(newActiveIndex)
    }
  }

  useEffect(() => {
    const timeline = timelineRef.current
    if (timeline) {
      timeline.addEventListener("scroll", handleScroll)
      return () => timeline.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Mobile Timeline (Vertical) */}
      {isMobile && (
        <div className="md:hidden space-y-3">
          {timelineEvents.map((event, index) => (
            <Card
              key={index}
              className={cn(
                "border-l-4 transition-colors",
                index === activeIndex ? "border-l-primary" : "border-l-muted",
              )}
            >
              <CardContent className="p-3">
                <Badge variant="outline" className="mb-1">
                  {event.year}
                </Badge>
                <h3 className="font-bold text-sm">{event.title}</h3>
                <p className="text-xs text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Desktop Timeline (Horizontal) */}
      <div ref={timelineRef} className="hidden md:block overflow-x-auto pb-4 scrollbar-hide">
        <div className="relative min-w-max">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>

          {/* Timeline Events */}
          <div className="flex">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex flex-col items-center px-6 relative">
                {/* Year Marker */}
                <div
                  className={cn(
                    "w-3 h-3 rounded-full border-2 z-10 mb-2",
                    index === activeIndex ? "bg-primary border-primary" : "bg-background border-muted-foreground",
                  )}
                ></div>

                {/* Year Label */}
                <span className="text-xs mb-2">{event.year}</span>

                {/* Event Card */}
                <Card
                  className={cn(
                    "w-40 transition-all duration-300",
                    index === activeIndex ? "border-primary shadow-sm" : "opacity-70",
                  )}
                >
                  <CardContent className="p-3">
                    <h3 className="font-bold text-xs">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="flex justify-center gap-1">
        {timelineEvents.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex ? "bg-primary w-3" : "bg-muted-foreground",
            )}
            onClick={() => {
              setActiveIndex(index)
              if (timelineRef.current) {
                const itemWidth = timelineRef.current.scrollWidth / timelineEvents.length
                timelineRef.current.scrollTo({
                  left: itemWidth * index,
                  behavior: "smooth",
                })
              }
            }}
            aria-label={`View ${timelineEvents[index].year} timeline event`}
          />
        ))}
      </div>
    </div>
  )
}

