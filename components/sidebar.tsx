"use client"

import { useEffect } from "react"
import Link from "next/link"
import { User, Briefcase, FolderKanban, Coffee, GraduationCap, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useMobile()
  const navItems = [
    { name: "About", href: "#about", icon: User },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderKanban },
    { name: "Hobbies", href: "#hobbies", icon: Coffee },
  ]

  useEffect(() => {
    if (!isMobile && isOpen) {
      onClose()
    }
  }, [isMobile, isOpen, onClose])

  const handleDownload = () => {
    window.open("/reports/CV.pdf", "_blank")
  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300 ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
        }`}
    >
      {/* Close Button for Mobile */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-accent rounded-sm"
        >
          <X className="h-6 w-6" />
        </button>
      )}
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Rasmus Hogslätt</h2>
        <p className="text-sm text-muted-foreground">Software developer</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t mt-auto">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download Resume
        </Button>
      </div>
    </div>
  )
}