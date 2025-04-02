import {
  Bike,
  Code,
  Dumbbell,
  Guitar,
  Heart,
  Cat,
  MonitorIcon as Running,
  Puzzle,
  BookOpen,
  Coffee,
  Gauge,
} from "lucide-react"

interface HobbiesSectionProps {
  id: string
}

export default function HobbiesSection({ id }: HobbiesSectionProps) {
  // Hobbies data with icons
  const hobbies = [
    { name: "solving Rubik's cubes", icon: Puzzle },
    { name: "playing the Guitar", icon: Guitar },
    { name: "reading books", icon: BookOpen },
    { name: "reading Donald Duck comics", icon: Coffee },
    { name: "spending time with my cat", icon: Cat },
    { name: "going to the gym", icon: Dumbbell },
    { name: "bicycling", icon: Bike },
    { name: "running", icon: Gauge },
    { name: "coding personal projects", icon: Code },
    { name: "spending time with family", icon: Heart },
  ]

  return (
    <section id={id} className="section-container border-b border-border py-6">
      <h2 className="text-2xl font-bold tracking-tighter mb-4">Hobbies & Interests</h2>
      <p className="text-muted-foreground leading-relaxed">
        Things easily tend to catch my interest, so I often find myself exploring different hobbies and technologies.
        Some that I enjoy are{" "}
        {hobbies.map((hobby, index) => {
          const Icon = hobby.icon
          return (
            <span key={index}>
              <span className="inline-flex items-center">
                <Icon className="inline-block h-4 w-4 text-primary mx-1" />
                <span className="text-foreground">{hobby.name}</span>
              </span>
              {index < hobbies.length - 2 && ", "}
              {index === hobbies.length - 2 && " and "}
              {index === hobbies.length - 1 && "."}
            </span>
          )
        })}
      </p>
    </section>
  )
}

