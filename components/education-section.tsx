import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EducationSectionProps {
  id: string
}

export default function EducationSection({ id }: EducationSectionProps) {
  return (
    <section id={id} className="section-container border-b border-border py-6">
      <h2 className="text-2xl font-bold tracking-tighter mb-4">Education</h2>
      <Card className="bg-muted/50">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Master's Degree in Technology of Media</h3>
            <p className="text-muted-foreground">Linköping University, 2024</p>
            <p className="text-sm mt-2">Specialized in computer graphics and AI. This degree is similar to a typical computer science degree, albeit with higher emphasis on mathematics, graphics rendering and GPU computing and less so on the hardware of the CPU etc. During my last year I received a scholarship for academic performance."</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

