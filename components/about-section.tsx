import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { User, Code, Zap } from "lucide-react"

interface AboutSectionProps {
  id: string
}

export default function AboutSection({ id }: AboutSectionProps) {
  return (
    <section id={id} className="section-container border-b border-border">
      <h2 className="text-2xl font-bold tracking-tighter mb-6">About Me</h2>
      <div className="grid gap-6 md:grid-cols-2 items-center">
        <div className="flex justify-center md:order-last">
          <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-md border-2 border-primary/50">
            <Image src="/me.jpg" alt="Profile" fill className="object-cover" priority />
            <div className="absolute inset-0 border-4 border-background/20"></div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Hi there! I'm a software developer in Sweden. My favorite programming language is Rust, but I am also
            familiar with languages like C++, Java, Python, etc.
          </p>
          <p className="text-muted-foreground">
            I am curious about new technologies, so when given the time, I often tend to dabble with things. This has
            led me to build drones, RC-cars and becoming a Rust evangelist.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Card className="bg-muted">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <User className="h-5 w-5 text-primary mb-1" />
                <p className="text-xs font-medium">Software developer</p>
              </CardContent>
            </Card>
            <Card className="bg-muted">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <Code className="h-5 w-5 text-primary mb-1" />
                <p className="text-xs font-medium">Rust</p>
              </CardContent>
            </Card>
            <Card className="bg-muted">
              <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                <Zap className="h-5 w-5 text-primary mb-1" />
                <p className="text-xs font-medium">Safe & Performant code</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

