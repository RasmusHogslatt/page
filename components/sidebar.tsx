"use client"

import Link from "next/link"
import { User, Briefcase, FolderKanban, Coffee, GraduationCap, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const navItems = [
    { name: "About", href: "#about", icon: User },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderKanban },
    { name: "Hobbies", href: "#hobbies", icon: Coffee },
  ]

  const handleDownload = () => {
    window.open("/reports/CV.pdf", "_blank")
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
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