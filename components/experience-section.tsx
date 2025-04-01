import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceSectionProps {
  id: string
}

export default function ExperienceSection({ id }: ExperienceSectionProps) {
  // Experience data with actual company logos
  const experiences = [
    {
      title: "Rust Backend Developer",
      company: "ThirdAct",
      logo: "/images/logos/thirdact.png",
      period: "2024 November - Present",
      description:
        "Developed backend code in Rust to speed up interactions with Azure Cosmos databases.\
         This involved handling large amounts of data interfacing with various APIs.\
         I also created a library for handling scheduling and availability for stores etc..",
      skills: ["Rust", "Azure", "Javascript", "APIs", "Git"],
    },
    {
      title: "Software Engineer",
      company: "Saab",
      logo: "/images/logos/saab.png",
      period: "2024 June - 2024 November",
      description: "Maintained and developed software used in some of Saab's underwater products.",
      skills: ["Git", "Linux", "Ada", "Pascal", "CI/CD"],
    },
    {
      title: "Research Assistant Developer",
      company: "Linköping University",
      logo: "/images/logos/liu.png",
      period: "2022 - 2023",
      description:
        "Worked through summer and part time during coming semesters on the open source project Inviwo. It is an open source scientific visualization software developed mainly in C++ and OpenGL.",
      skills: ["C++", "Python", "OpenGL", "3D-Rendering"],
    },
    {
      title: "Software developer & Electronics Assembly",
      company: "Easy Laser",
      logo: "/images/logos/easylaser.jpeg",
      period: "2018 - 2022",
      description:
        "Worked full time before university, assembling laser based measuring devices. Here I saw how all steps of the supply chain worked, given that everything everything was done in house.Throughout studies, I worked part time during summer as software developer.",
      skills: ["C#", "Python", "Electronics", "Soldering"],
    },
    {
      title: "Math Assistant Teacher",
      company: "Linköping University",
      logo: "/images/logos/liu.png",
      period: "2020 - 2021",
      description:
        "I assisted in teaching fundamental math, and single- and multivariable calculus for first year university students. This entailed having my own classes where I held presentations and students were able to ask me questions. I also assisted in coding courses, such as object oriented programming and immersive visualization.",
      skills: ["Math", "Teaching"],
    },
  ]

  return (
    <section id={id} className="section-container border-b border-border">
      <h2 className="text-2xl font-bold tracking-tighter mb-6">Professional Experience</h2>
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Card key={index} className="bg-card hover:bg-card/80 transition-colors">
            <CardHeader className="p-4 pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <CardTitle className="text-base flex items-center">
                    <div className="w-8 h-8 rounded-md overflow-hidden mr-3 flex-shrink-0 bg-background border border-border">
                      <Image
                        src={experience.logo || "/placeholder.svg"}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    {experience.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {experience.company} | {experience.period}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-1">
                  {experience.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{experience.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

